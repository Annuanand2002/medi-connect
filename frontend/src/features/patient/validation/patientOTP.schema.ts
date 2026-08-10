import { z } from "zod";

export const patientOtpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type PatientOtpFormData = z.infer<typeof patientOtpSchema>;