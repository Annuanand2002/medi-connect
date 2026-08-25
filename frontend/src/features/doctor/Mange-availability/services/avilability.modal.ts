import { z } from "zod";

const breakSchema = z.object({
  startTime: z.string().min(1, "Break start time is required"),
  endTime: z.string().min(1, "Break end time is required"),
});

const dayAvailabilitySchema = z
  .object({
    dayOfWeek: z.string().min(1, "Day is required"),

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

    breaks: z.array(breakSchema),
  })
  .superRefine((data, ctx) => {
    // Availability time validation
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
    data.breaks.forEach((breakItem, index) => {
      if (
        breakItem.startTime &&
        breakItem.endTime &&
        breakItem.startTime >= breakItem.endTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", index, "endTime"],
          message:
            "Break end time must be after break start time",
        });
      }

      // Break must be inside availability
      if (
        breakItem.startTime < data.startTime ||
        breakItem.endTime > data.endTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", index],
          message:
            "Break must be within availability time",
        });
      }
    });
  });

export const addAvailabilitySchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .min(1, "End date is required"),

    days: z
      .array(dayAvailabilitySchema)
      .min(1, "Select at least one day"),
  })
  .superRefine((data, ctx) => {
    // Date validation
    if (data.startDate && data.endDate) {
      if (data.startDate >= data.endDate) {
        ctx.addIssue({
          code: "custom",
          path: ["endDate"],
          message: "End date must be after start date",
        });
      }
    }
  });