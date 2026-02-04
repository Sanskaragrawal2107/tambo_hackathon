"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Wrench, Clock, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * Schema for RepairWizard props - used by Tambo for generative UI
 */
export const repairWizardSchema = z.object({
  title: z.string().describe("Title of the repair guide (e.g., 'Brake Pad Replacement')"),
  difficulty: z.enum(["Easy", "Moderate", "Difficult", "Very Difficult"]).optional().describe("Difficulty level of the repair"),
  estimatedTime: z.string().optional().describe("Estimated time to complete (e.g., '30-45 minutes')"),
  toolsRequired: z.array(z.string()).optional().describe("List of tools needed for the repair"),
  partsRequired: z.array(z.string()).optional().describe("List of parts needed for the repair"),
  steps: z.array(z.object({
    stepNumber: z.number().describe("Step number in sequence"),
    instruction: z.string().describe("Detailed instruction text for this step"),
    imageUrl: z.string().optional().describe("URL to step image from iFixit"),
    warning: z.string().optional().describe("Safety warning for this step if any"),
  })).describe("Array of repair steps with instructions and images"),
});

export type RepairWizardProps = z.infer<typeof repairWizardSchema>;

/**
 * RepairWizard Component
 * 
 * A swipeable step-by-step repair guide carousel.
 * Displays repair instructions fetched from iFixit via MCP.
 * Tinder-style card interface for easy navigation.
 */
export function RepairWizard({
  title,
  difficulty = "Moderate",
  estimatedTime,
  toolsRequired = [],
  partsRequired = [],
  steps = [],
}: RepairWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const difficultyColors = {
    Easy: "text-green-400 bg-green-500/10",
    Moderate: "text-yellow-400 bg-yellow-500/10",
    Difficult: "text-orange-400 bg-orange-500/10",
    "Very Difficult": "text-red-400 bg-red-500/10",
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleComplete = () => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(currentStep)) {
      newCompleted.delete(currentStep);
    } else {
      newCompleted.add(currentStep);
    }
    setCompletedSteps(newCompleted);
  };

  const currentStepData = steps[currentStep];
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl max-w-5xl mx-auto"
    >
      {/* Header - Compact */}
      <div className="px-4 py-2 border-b border-zinc-700 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Wrench className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <h2 className="text-sm font-bold text-white truncate">{title}</h2>
          {difficulty && (
            <span className={cn("text-xs px-2 py-0.5 rounded-full flex-shrink-0", difficultyColors[difficulty])}>
              {difficulty}
            </span>
          )}
          {estimatedTime && (
            <span className="text-xs text-zinc-400 flex items-center gap-1 flex-shrink-0">
              <Clock className="w-3 h-3" />
              {estimatedTime}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-lg font-bold text-white">{currentStep + 1}/{steps.length}</span>
          {/* Progress Bar */}
          <div className="w-24 bg-zinc-700 rounded-full h-1.5">
            <motion.div
              className="bg-blue-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Tools & Parts (Collapsible) - Mobile Only */}
      <div className="lg:hidden">
        {(toolsRequired.length > 0 || partsRequired.length > 0) && (
          <div className="px-6 py-4 bg-zinc-800/50 border-b border-zinc-700">
            <div className="grid grid-cols-2 gap-4">
              {toolsRequired.length > 0 && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Tools Needed</p>
                  <div className="flex flex-wrap gap-1">
                    {toolsRequired.slice(0, 4).map((tool, i) => (
                      <span key={i} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                        {tool}
                      </span>
                    ))}
                    {toolsRequired.length > 4 && (
                      <span className="text-xs text-zinc-500">+{toolsRequired.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}
              {partsRequired.length > 0 && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Parts Needed</p>
                  <div className="flex flex-wrap gap-1">
                    {partsRequired.slice(0, 4).map((part, i) => (
                      <span key={i} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                        {part}
                      </span>
                    ))}
                    {partsRequired.length > 4 && (
                      <span className="text-xs text-zinc-500">+{partsRequired.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Step Content - Swipeable Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {currentStepData && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-3"
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 items-start">
                {/* Step Image Column */}
                <div className="relative h-48 sm:h-56 lg:h-[280px] bg-zinc-950 rounded-lg overflow-hidden mb-4 lg:mb-0 border border-zinc-700 flex items-center justify-center">
                  {currentStepData.imageUrl ? (
                    <img
                      src={currentStepData.imageUrl}
                      alt={`Step ${currentStepData.stepNumber}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <ImageIcon className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10">
                    {currentStepData.stepNumber}
                  </div>

                  {/* Completed Badge */}
                  {completedSteps.has(currentStep) && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-green-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>

                {/* Step Instructions Column */}
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-white mb-2 block lg:hidden">
                    Step {currentStepData.stepNumber}
                  </h3>

                  {/* Tools & Parts (Desktop) */}
                  <div className="hidden lg:block mb-3">
                    {(toolsRequired.length > 0 || partsRequired.length > 0) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {toolsRequired.slice(0, 3).map((tool, i) => (
                          <span key={`tool-${i}`} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">
                            {tool}
                          </span>
                        ))}
                         {partsRequired.slice(0, 3).map((part, i) => (
                          <span key={`part-${i}`} className="text-xs bg-zinc-800 text-blue-300 px-2 py-1 rounded border border-blue-900/30">
                            {part}
                          </span>
                        ))}
                        {(toolsRequired.length + partsRequired.length) > 6 && (
                          <span className="text-xs text-zinc-500 px-2 py-1">
                            +{(toolsRequired.length + partsRequired.length) - 6} more items
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Warning (if any) */}
                  {currentStepData.warning && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-300 text-sm">{currentStepData.warning}</p>
                    </div>
                  )}

                  {/* Instruction Text */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-200 text-base leading-relaxed">
                      {currentStepData.instruction}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {steps.length === 0 && (
          <div className="p-6 text-center">
            <Wrench className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No repair steps available</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="px-4 py-2 border-t border-zinc-700 flex items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            currentStep === 0
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Step Dots - Inline */}
        <div className="flex items-center gap-1">
          {steps.slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentStep
                  ? "bg-blue-500 w-4"
                  : completedSteps.has(i)
                  ? "bg-green-500"
                  : "bg-zinc-600 hover:bg-zinc-500"
              )}
            />
          ))}
          {steps.length > 10 && <span className="text-xs text-zinc-500">+{steps.length - 10}</span>}
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            currentStep >= steps.length - 1
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
