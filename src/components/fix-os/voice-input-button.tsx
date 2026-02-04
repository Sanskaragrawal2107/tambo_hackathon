"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

// Web Speech API Type Definitions
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * VoiceInputButton Component
 * 
 * A floating microphone button that enables voice input using the Web Speech API.
 * Uses the browser's built-in speech recognition for hands-free interaction.
 */
export function VoiceInputButton({ 
  onTranscript, 
  className,
  size = "md" 
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        setInterimTranscript(interim);

        if (final) {
          onTranscript(final);
          setInterimTranscript("");
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInterimTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  if (!isSupported) {
    return (
      <div 
        className={cn(
          "rounded-full bg-zinc-700 flex items-center justify-center opacity-50 cursor-not-allowed",
          sizeClasses[size],
          className
        )}
        title="Voice input not supported in this browser"
      >
        <MicOff className={cn(iconSizes[size], "text-zinc-400")} />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Interim Transcript Bubble */}
      <AnimatePresence>
        {interimTranscript && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 shadow-lg min-w-[200px] max-w-[300px]"
          >
            <p className="text-sm text-zinc-300 text-center">{interimTranscript}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-zinc-800 border-r border-b border-zinc-700 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Ring Animation */}
      <AnimatePresence>
        {isListening && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className={cn(
                "absolute inset-0 rounded-full bg-blue-500",
                sizeClasses[size]
              )}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className={cn(
                "absolute inset-0 rounded-full bg-blue-500",
                sizeClasses[size]
              )}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all shadow-lg",
          sizeClasses[size],
          isListening
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <MicOff className={iconSizes[size]} />
          </motion.div>
        ) : (
          <Mic className={iconSizes[size]} />
        )}
      </motion.button>
    </div>
  );
}
