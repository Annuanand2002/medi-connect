import { z } from "zod";

export const addAvailabilitySchema = z
  .object({
    dayOfWeek: z
      .string()
      .min(1, "Day is required"),

    startTime: z
      .string()
      .min(1, "Start time is required"),

    endTime: z
      .string()
      .min(1, "End time is required"),

    duration: z
      .number({
        error: "Duration is required",
      })
      .min(1, "Duration must be greater than 0"),

    breakStartTime: z.string().optional(),

    breakEndTime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check end time
    if (
      data.startTime &&
      data.endTime &&
      data.startTime >= data.endTime
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "End time must be after start time",
      });
    }

    // Break validation
    if (
      data.breakStartTime &&
      !data.breakEndTime
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["breakEndTime"],
        message: "Break end time is required",
      });
    }

    if (
      !data.breakStartTime &&
      data.breakEndTime
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["breakStartTime"],
        message: "Break start time is required",
      });
    }

    // Break time order
    if (
      data.breakStartTime &&
      data.breakEndTime &&
      data.breakStartTime >= data.breakEndTime
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["breakEndTime"],
        message:
          "Break end time must be after break start time",
      });
    }
  });