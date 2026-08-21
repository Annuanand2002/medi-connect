import { z } from "zod";

export const DoctorBlockSchema = z
  .object({
    date: z
      .string()
      .min(1, "Date is required"),

    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must be in 24-hour format (HH:mm)",
      ),

    endTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must be in 24-hour format (HH:mm)",
      ),

    reason: z
      .string()
      .trim()
      .min(1, "Reason is required")
      .max(500, "Reason must not exceed 500 characters"),
  })
  .refine(
    (data) => data.startTime < data.endTime,
    {
      message: "Start time must be less than end time",
      path: ["endTime"],
    },
  );

export type DoctorBlockFormData = z.infer<
  typeof DoctorBlockSchema
>;