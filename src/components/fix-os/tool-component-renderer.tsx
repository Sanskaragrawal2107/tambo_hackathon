"use client";

/**
 * Tool Component Renderer
 * 
 * This component solves a critical issue with Tambo's component rendering:
 * 
 * The Problem:
 * - Tambo's `associatedTools` mechanism links tools to components
 * - However, `message.renderedComponent` is only populated when the AI uses 
 *   internal "UI tools" (prefixed with `show_component_`)
 * - Client-side tools (like our Fix-OS tools) don't automatically render their
 *   associated components
 * 
 * The Solution:
 * - This component detects when a Fix-OS tool has been called
 * - It finds the associated component from our registry
 * - It renders the component with the tool's return data as props
 * - It properly finds the tool result from the thread's message history
 */

import { useTambo, type TamboThreadMessage } from "@tambo-ai/react";
import { useMessageContext } from "@/components/tambo/message";
import { createElement, useMemo } from "react";
import { cn } from "@/lib/utils";

// Import our Fix-OS components
import {
  VehicleHero,
  RepairWizard,
  AudioDiagnostic,
  ServiceSOS,
  PartsFinder,
} from "@/components/fix-os";

/**
 * Mapping of tool names to their associated React components
 */
const TOOL_COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  // These are now handled natively by Tambo's associatedTools
  // identifyVehicleIssue: VehicleHero,
  // getRepairGuide: RepairWizard, 
  // requestProfessionalHelp: ServiceSOS,
  // findPartsOnline: PartsFinder,
  
  // Audio diagnostic still seems to need manual rendering or is special case
  startAudioDiagnostic: AudioDiagnostic,
};

/**
 * Parse tool result content from a tool response message
 */
function parseToolResult(message: TamboThreadMessage): Record<string, unknown> | null {
  if (message.role !== "tool") return null;
  
  const content = message.content;
  if (!content) return null;
  
  // Handle array content format
  if (Array.isArray(content)) {
    for (const part of content) {
      if (part.type === "text" && part.text) {
        try {
          return JSON.parse(part.text);
        } catch {
          // Not JSON, try next part
        }
      }
    }
  }
  
  // Handle string content
  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  
  return null;
}

/**
 * Get the tool call request from a message
 */
function getToolCallRequest(message: TamboThreadMessage): { toolName?: string; parameters?: { parameterName: string; parameterValue: unknown }[] } | undefined {
  return message.toolCallRequest ?? message.component?.toolCallRequest;
}

/**
 * Find the tool response for a given assistant message with a tool call
 */
function findToolResponse(
  messages: TamboThreadMessage[],
  assistantMessage: TamboThreadMessage
): TamboThreadMessage | null {
  const assistantIndex = messages.findIndex(m => m.id === assistantMessage.id);
  if (assistantIndex === -1) return null;
  
  // Look for the tool response message that follows this assistant message
  for (let i = assistantIndex + 1; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "tool") {
      return msg;
    }
    // If we hit another assistant message with a tool call, stop looking
    if (msg.role === "assistant" && getToolCallRequest(msg)) {
      break;
    }
  }
  
  return null;
}

interface ToolComponentRendererProps {
  className?: string;
}

/**
 * Renders the component associated with a tool call
 * 
 * This component checks if the current message has a tool call to one of our
 * Fix-OS tools, finds the tool response, and renders the appropriate component
 * with the response data as props.
 */
export function ToolComponentRenderer({ className }: ToolComponentRendererProps) {
  const { message, role } = useMessageContext();
  const { thread } = useTambo();
  
  const renderedComponent = useMemo(() => {
    // Only render for assistant messages
    if (role !== "assistant") return null;
    
    // Skip if Tambo already rendered a component (avoid duplicates)
    if (message.renderedComponent) return null;
    
    // Check if there's a tool call request
    const toolCall = getToolCallRequest(message);
    if (!toolCall?.toolName) return null;
    
    // Check if this is one of our mapped tools
    const Component = TOOL_COMPONENT_MAP[toolCall.toolName];
    if (!Component) return null;
    
    // Smart filtering: If audio diagnostic tool was used, don't render identifyVehicleIssue
    // This prevents duplicate components when both are called
    if (toolCall.toolName === "identifyVehicleIssue" && thread?.messages) {
      const hasAudioDiagnosticInThread = thread.messages.some(msg => {
        const request = getToolCallRequest(msg);
        return request?.toolName === "startAudioDiagnostic";
      });
      if (hasAudioDiagnosticInThread) {
        return null; // Skip vehicle issue component if audio diagnostic was also called
      }
    }
    
    // Find the tool response
    const messages = thread?.messages ?? [];
    const toolResponse = findToolResponse(messages, message);
    
    if (toolResponse) {
      // Parse the tool result and render the component with it
      const toolResult = parseToolResult(toolResponse);
      if (toolResult) {
        return createElement(Component, toolResult);
      }
    }
    
    // If no response yet but we have the tool call, render with default/input props
    // This handles the case where the component should show immediately (like AudioDiagnostic)
    const inputProps: Record<string, unknown> = {};
    if (toolCall.parameters) {
      for (const param of toolCall.parameters) {
        inputProps[param.parameterName] = param.parameterValue;
      }
    }
    
    // For tools that should render immediately even without a response
    // Add default props based on tool type
    if (toolCall.toolName === "startAudioDiagnostic") {
      return createElement(Component, {
        isListening: false,
        ...inputProps,
      });
    }
    
    // For other tools, we need the response first
    return null;
  }, [message, role, thread?.messages, message.renderedComponent]);
  
  if (!renderedComponent) return null;
  
  return (
    <div className={cn("w-full mt-4 border-t border-zinc-800/50 pt-4", className)}>
      {renderedComponent}
    </div>
  );
}

export default ToolComponentRenderer;
