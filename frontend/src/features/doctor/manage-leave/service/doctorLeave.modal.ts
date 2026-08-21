import { z } from "zod";

export const createDoctorLeaveSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().min(1, "End date is required"),

    reason: z
      .string()
      .trim()
      .min(1, "Reason is required")
      .max(200, "Reason must not exceed 200 characters"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });
