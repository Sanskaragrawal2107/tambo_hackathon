"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff, Volume2, AlertTriangle, CheckCircle, Loader2, Headphones } from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTamboThreadInput } from "@tambo-ai/react";

/**
 * Schema for AudioDiagnostic props - used by Tambo for generative UI
 */
export const audioDiagnosticSchema = z.object({
  isListening: z.boolean().optional().default(false).describe("Whether the component is currently listening to audio"),
  detectedIssue: z.string().optional().describe("Description of the detected issue from audio analysis"),
  suggestedGuide: z.string().optional().describe("Suggested repair guide based on audio analysis"),
  confidence: z.number().optional().describe("Confidence level of the detection (0-100)"),
  issueType: z.string().optional().describe("Type of sound issue detected"),
});

export type AudioDiagnosticProps = z.infer<typeof audioDiagnosticSchema>;

// Analysis result type from Gemini API
interface AnalysisResult {
  detected: boolean;
  issueType: "grinding" | "squeaking" | "rattling" | "clicking" | "humming" | "none";
  issue: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  suggestedGuide: string;
  details: string;
  urgency: string;
}

/**
 * Waveform Animation Component with real audio visualization
 */
function WaveformAnimation({ 
  isActive, 
  color = "blue",
  analyzerNode 
}: { 
  isActive: boolean; 
  color?: string;
  analyzerNode?: AnalyserNode | null;
}) {
  const bars = 24;
  const [barHeights, setBarHeights] = useState<number[]>(Array(bars).fill(8));
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isActive && analyzerNode) {
      const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
      
      const updateBars = () => {
        analyzerNode.getByteFrequencyData(dataArray);
        
        // Sample frequencies across the spectrum for visualization
        const newHeights = Array(bars).fill(0).map((_, i) => {
          const index = Math.floor((i / bars) * dataArray.length);
          const value = dataArray[index];
          // Scale to height range 8-96px
          return Math.max(8, (value / 255) * 88 + 8);
        });
        
        setBarHeights(newHeights);
        animationRef.current = requestAnimationFrame(updateBars);
      };
      
      updateBars();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else if (!isActive) {
      setBarHeights(Array(bars).fill(8));
    }
  }, [isActive, analyzerNode, bars]);
  
  return (
    <div className="flex items-center justify-center gap-0.5 h-24">
      {barHeights.map((height, i) => (
        <motion.div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-75",
            color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-blue-500"
          )}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

/**
 * Button component that auto-fills the chat with a repair guide request
 */
function ViewRepairGuideButton({ 
  suggestedGuide, 
  issueDescription 
}: { 
  suggestedGuide: string; 
  issueDescription?: string;
}) {
  const { setValue, submit } = useTamboThreadInput();
  
  const handleClick = useCallback(() => {
    // Create a message that will trigger the getRepairGuide tool
    const message = issueDescription 
      ? `Show me the repair guide for: ${suggestedGuide}. The issue is: ${issueDescription}`
      : `Show me the repair guide for: ${suggestedGuide}`;
    
    // Set the value in the chat input and submit
    setValue(message);
    // Small delay to ensure value is set before submitting
    setTimeout(() => {
      submit();
    }, 100);
  }, [suggestedGuide, issueDescription, setValue, submit]);

  return (
    <button 
      onClick={handleClick}
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
    >
      View Repair Guide
    </button>
  );
}

/**
 * AudioDiagnostic Component
 * 
 * REAL audio analysis component using Gemini AI.
 * Records actual audio from the user's microphone and sends it to Gemini for analysis.
 */
export function AudioDiagnostic({
  isListening: initialListening = false,
  detectedIssue,
  suggestedGuide,
  confidence,
  issueType,
}: AudioDiagnosticProps) {
  useEffect(() => {
    console.log("[AudioDiagnostic] Component mounted with props:", { initialListening, detectedIssue, suggestedGuide, confidence, issueType });
  }, [initialListening, detectedIssue, suggestedGuide, confidence, issueType]);

  const [isListening, setIsListening] = useState(initialListening);
  const [analyzing, setAnalyzing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [localDetectedIssue, setLocalDetectedIssue] = useState(detectedIssue);
  const [localConfidence, setLocalConfidence] = useState(confidence);
  const [localIssueType, setLocalIssueType] = useState(issueType);
  const [localSuggestedGuide, setLocalSuggestedGuide] = useState(suggestedGuide);
  const [analysisDetails, setAnalysisDetails] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"low" | "medium" | "high" | null>(null);
  
  // Audio recording refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Analyze audio with Gemini API
  const analyzeAudio = useCallback(async (audioBlob: Blob) => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      
      const response = await fetch("/api/analyze-audio", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze audio");
      }
      
      const result: AnalysisResult = await response.json();
      
      // Update state with results
      setLocalDetectedIssue(result.issue);
      setLocalConfidence(result.confidence);
      setLocalIssueType(result.issueType);
      setLocalSuggestedGuide(result.suggestedGuide);
      setAnalysisDetails(result.details);
      setSeverity(result.severity);
      
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze audio");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  // Start recording
  const startListening = async () => {
    try {
      setError(null);
      setLocalDetectedIssue(undefined);
      setLocalConfidence(undefined);
      setLocalIssueType(undefined);
      setLocalSuggestedGuide(undefined);
      setAnalysisDetails(null);
      setSeverity(null);
      setRecordingDuration(0);
      audioChunksRef.current = [];
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false, // Keep original sound for analysis
          autoGainControl: false,
        } 
      });
      streamRef.current = stream;
      
      // Set up audio context for visualization
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      source.connect(analyzerRef.current);
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        
        // Only analyze if we have sufficient audio (at least 1 second)
        if (audioBlob.size > 1000) {
          await analyzeAudio(audioBlob);
        } else {
          setError("Recording too short. Please record for at least 3 seconds.");
        }
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100); // Collect data every 100ms
      setIsListening(true);
      
      // Update recording duration
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(d => d + 1);
      }, 1000);
      
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError("Could not access microphone. Please allow microphone access.");
    }
  };

  // Stop recording
  const stopListening = () => {
    setIsListening(false);
    
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyzerRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync with props
  useEffect(() => {
    setLocalDetectedIssue(detectedIssue);
    setLocalConfidence(confidence);
    setLocalIssueType(issueType);
    setLocalSuggestedGuide(suggestedGuide);
  }, [detectedIssue, confidence, issueType, suggestedGuide]);

  const issueColors = {
    grinding: "text-red-400",
    squeaking: "text-orange-400",
    rattling: "text-yellow-400",
    clicking: "text-blue-400",
    humming: "text-purple-400",
    none: "text-green-400",
  };

  const severityColors = {
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const issueIcons = {
    grinding: AlertTriangle,
    squeaking: Volume2,
    rattling: Volume2,
    clicking: Volume2,
    humming: Volume2,
    none: CheckCircle,
  } as const;

  type IssueType = keyof typeof issueIcons;
  const isValidIssueType = (type: string | undefined): type is IssueType => 
    type !== undefined && type in issueIcons;
  
  const IssueIcon = isValidIssueType(localIssueType) ? issueIcons[localIssueType] : Volume2;
  const issueColorClass = isValidIssueType(localIssueType) ? issueColors[localIssueType] : "text-zinc-400";

  // Format recording duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              isListening ? "bg-red-500/20 animate-pulse" : analyzing ? "bg-yellow-500/20" : "bg-zinc-700"
            )}>
              <Headphones className={cn(
                "w-6 h-6", 
                isListening ? "text-red-400" : analyzing ? "text-yellow-400" : "text-zinc-400"
              )} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Audio Diagnostic
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-normal">
                  Gemini AI
                </span>
              </h2>
              <p className="text-sm text-zinc-400">
                {isListening 
                  ? `Recording... ${formatDuration(recordingDuration)}` 
                  : analyzing 
                    ? "Analyzing with Gemini AI..." 
                    : "Hold your phone near the noise source"
                }
              </p>
            </div>
          </div>
          
          {localConfidence !== undefined && localConfidence > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{localConfidence}%</p>
              <p className="text-xs text-zinc-500">Confidence</p>
            </div>
          )}
        </div>
      </div>

      {/* Waveform Display */}
      <div className="p-6 bg-zinc-900/50">
        <div className={cn(
          "rounded-xl p-6 border transition-all duration-500",
          isListening 
            ? "border-red-500/30 bg-red-500/5" 
            : localDetectedIssue 
              ? localIssueType === "none" 
                ? "border-green-500/30 bg-green-500/5"
                : "border-yellow-500/30 bg-yellow-500/5"
              : "border-zinc-700 bg-zinc-800/50"
        )}>
          <WaveformAnimation 
            isActive={isListening} 
            color={isListening ? "blue" : localDetectedIssue ? (localIssueType === "none" ? "green" : "yellow") : "blue"}
            analyzerNode={analyzerRef.current}
          />
          
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-400 text-sm">Recording - Stop when ready</p>
              </div>
              <p className="text-zinc-500 text-xs mt-1">
                Record for 3-10 seconds for best results
              </p>
            </motion.div>
          )}
          
          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <Loader2 className="w-6 h-6 text-yellow-400 animate-spin mx-auto" />
              <p className="text-yellow-400 text-sm mt-2">Gemini AI analyzing audio patterns...</p>
              <p className="text-zinc-500 text-xs mt-1">
                Identifying mechanical sounds and potential issues
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-6">
          <div className="rounded-xl p-4 border border-red-500/30 bg-red-500/10">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Detection Result */}
      <AnimatePresence>
        {localDetectedIssue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            <div className={cn(
              "rounded-xl p-4 border",
              localIssueType === "none" 
                ? "border-green-500/30 bg-green-500/10"
                : "border-yellow-500/30 bg-yellow-500/10"
            )}>
              <div className="flex items-start gap-3">
                <IssueIcon className={cn("w-6 h-6 flex-shrink-0 mt-0.5", issueColorClass)} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white">{localDetectedIssue}</p>
                    {severity && severity !== "low" && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full border capitalize",
                        severityColors[severity]
                      )}>
                        {severity} severity
                      </span>
                    )}
                  </div>
                  
                  {analysisDetails && (
                    <p className="text-sm text-zinc-400 mt-2">
                      {analysisDetails}
                    </p>
                  )}
                  
                  {localSuggestedGuide && (
                    <p className="text-sm text-zinc-400 mt-2">
                      Suggested: <span className="text-blue-400">{localSuggestedGuide}</span>
                    </p>
                  )}
                  
                  {localIssueType && localIssueType !== "none" && (
                    <p className="text-xs text-zinc-500 mt-2">
                      Sound type: <span className="capitalize">{localIssueType}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              {localIssueType !== "none" && localSuggestedGuide && (
                <ViewRepairGuideButton 
                  suggestedGuide={localSuggestedGuide}
                  issueDescription={localDetectedIssue}
                />
              )}
              <button 
                onClick={() => {
                  setLocalDetectedIssue(undefined);
                  setLocalConfidence(undefined);
                  setLocalIssueType(undefined);
                  setLocalSuggestedGuide(undefined);
                  setAnalysisDetails(null);
                  setSeverity(null);
                  setError(null);
                }}
                className={cn(
                  "bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors",
                  localIssueType === "none" || !localSuggestedGuide ? "flex-1" : "flex-1"
                )}
              >
                Record Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Button */}
      <div className="p-6 pt-0">
        <button
          onClick={isListening ? stopListening : startListening}
          className={cn(
            "w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all",
            isListening
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Audio Analysis
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-zinc-500 mt-3">
          Place your phone near the source of the noise for best results
        </p>
      </div>
    </motion.div>
  );
}
