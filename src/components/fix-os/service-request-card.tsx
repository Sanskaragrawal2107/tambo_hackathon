"use client";

import React from "react";
import { z } from "zod";
import { Calendar, Clock, FileText, CheckCircle } from "lucide-react";

export const serviceRequestCardSchema = z.object({
  serviceNumber: z.string().describe("Unique service request number"),
  issueType: z.string().describe("Type of service/issue"),
  vehicleInfo: z.string().describe("Vehicle details from chat context"),
  availableSlots: z.array(
    z.object({
      date: z.string(),
      time: z.string(),
      label: z.string(),
    })
  ).describe("Available appointment time slots"),
  estimatedCost: z.object({
    low: z.number().optional(),
    high: z.number().optional(),
  }).optional().describe("Estimated service cost range"),
  description: z.string().optional().describe("Service description"),
});

export type ServiceRequestCardProps = z.infer<typeof serviceRequestCardSchema>;

/**
 * ServiceRequestCard Component
 * Displays service request with available time slots
 * User can select preferred appointment time
 */
export const ServiceRequestCard = React.forwardRef<
  HTMLDivElement,
  ServiceRequestCardProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      serviceNumber,
      issueType,
      vehicleInfo,
      availableSlots,
      estimatedCost,
      description,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

    return (
      <div
        ref={ref}
        className="w-full max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6"
        {...props}
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Service Request Confirmed
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Service #{serviceNumber}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Issue Type</p>
                <p className="text-base font-semibold text-gray-900">
                  {issueType}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Vehicle</p>
                <p className="text-base font-semibold text-gray-900">
                  {vehicleInfo}
                </p>
              </div>
            </div>

            {estimatedCost && (estimatedCost.low || estimatedCost.high) && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    Estimated Cost
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    ${estimatedCost.low || 0} - ${estimatedCost.high || 0}
                  </p>
                </div>
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-100">
              ℹ️ {description}
            </p>
          )}
        </div>

        {/* Available Time Slots */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Select Your Preferred Time Slot
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableSlots.map((slot, index) => (
              <button
                key={`${slot.date}-${slot.time}-${index}`}
                onClick={() => setSelectedSlot(`${slot.date}-${slot.time}`)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedSlot === `${slot.date}-${slot.time}`
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 bg-white hover:border-teal-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-gray-900">
                    {slot.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{slot.time}</p>
                <p className="text-xs text-gray-500 mt-1">{slot.label}</p>
              </button>
            ))}
          </div>

          {selectedSlot && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">
                  Time Slot Selected
                </p>
                <p className="text-sm text-green-700">
                  Click "Book Professional Service" to proceed with payment and
                  confirmation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            ⚡ <strong>Next Step:</strong> Select a time slot above and click
            "Book Professional Service" to proceed with payment and finalize
            your appointment.
          </p>
        </div>
      </div>
    );
  }
);

ServiceRequestCard.displayName = "ServiceRequestCard";
