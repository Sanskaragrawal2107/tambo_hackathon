"use client";

import React from "react";
import { z } from "zod";
import {
  CreditCard,
  MapPin,
  Clock,
  CheckCircle,
  Loader,
  Truck,
} from "lucide-react";

export const bookProfessionalServiceSchema = z.object({
  serviceNumber: z.string().describe("Unique service request number"),
  issueType: z.string().describe("Type of service"),
  vehicleInfo: z.string().describe("Vehicle details"),
  location: z.string().describe("Service location address"),
  appointmentTime: z.string().describe("Selected appointment time"),
  serviceProvider: z
    .object({
      name: z.string(),
      rating: z.number(),
      reviews: z.number(),
      distanceFromYou: z.string(),
    })
    .describe("Service provider details"),
  totalCost: z.number().describe("Total service cost"),
  taxAmount: z.number().optional().describe("Tax amount"),
  breakdownDetails: z
    .array(
      z.object({
        label: z.string(),
        amount: z.number(),
      })
    )
    .optional()
    .describe("Cost breakdown details"),
});

export type BookProfessionalServiceProps = z.infer<
  typeof bookProfessionalServiceSchema
>;

/**
 * BookProfessionalService Component
 * Displays service booking with payment details and confirmation
 */
export const BookProfessionalService = React.forwardRef<
  HTMLDivElement,
  BookProfessionalServiceProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      serviceNumber,
      issueType,
      vehicleInfo,
      location,
      appointmentTime,
      serviceProvider,
      totalCost,
      taxAmount = 0,
      breakdownDetails = [],
      className,
      ...props
    },
    ref
  ) => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState("card");

    const handleBooking = async () => {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsConfirmed(true);
    };

    if (isConfirmed) {
      return (
        <div
          ref={ref}
          className="w-full max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6"
          {...props}
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600">
              Your professional service has been successfully booked.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Service Number</p>
                  <p className="text-sm text-gray-600">#{serviceNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Service Provider
                  </p>
                  <p className="text-sm text-gray-600">
                    {serviceProvider.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">{location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Appointment</p>
                  <p className="text-sm text-gray-600">{appointmentTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Next Steps</p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>✓ You'll receive a confirmation email shortly</li>
                <li>✓ Service provider will arrive at your location</li>
                <li>✓ Total cost: ${totalCost.toFixed(2)}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="w-full max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6"
        {...props}
      >
        {/* Booking Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Booking
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Service</p>
                <p className="text-base font-semibold text-gray-900">
                  {issueType}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Vehicle</p>
                <p className="text-base font-semibold text-gray-900">
                  {vehicleInfo}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-base font-semibold text-gray-900">
                  {location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Appointment Time
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {appointmentTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Provider Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Your Service Provider</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <p className="text-lg font-bold text-gray-900">
              {serviceProvider.name}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                ⭐ {serviceProvider.rating} ({serviceProvider.reviews} reviews)
              </span>
              <span>📍 {serviceProvider.distanceFromYou} away</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Cost Breakdown</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
            {breakdownDetails && breakdownDetails.length > 0 ? (
              breakdownDetails.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">
                    ${item.amount.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Cost</span>
                <span className="font-medium text-gray-900">
                  ${(totalCost - (taxAmount || 0)).toFixed(2)}
                </span>
              </div>
            )}

            {taxAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  ${taxAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="text-lg font-bold text-teal-600">
                ${totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            Payment Method
          </h3>

          <div className="space-y-2">
            {["card", "upi", "wallet"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all"
                style={{
                  borderColor:
                    paymentMethod === method ? "#0d9488" : "#e5e7eb",
                  backgroundColor:
                    paymentMethod === method ? "#f0fdf4" : "#ffffff",
                }}
              >
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-medium text-gray-900 capitalize">
                  {method === "card"
                    ? "Credit/Debit Card"
                    : method === "upi"
                      ? "UPI"
                      : "Digital Wallet"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 mt-1" />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-teal-600 font-medium hover:underline">
                terms and conditions
              </a>
              . By completing this booking, I authorize the service provider to
              access my location and vehicle information.
            </span>
          </label>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={isProcessing}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Complete Booking & Pay ${totalCost.toFixed(2)}
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          🔒 Your payment is secure and encrypted
        </p>
      </div>
    );
  }
);

BookProfessionalService.displayName = "BookProfessionalService";
