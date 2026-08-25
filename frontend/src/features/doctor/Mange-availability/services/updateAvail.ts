import { z } from "zod";

export const updateAvailabilitySchema = z
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
      .min(
        1,
        "Duration must be greater than 0",
      ),

    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .min(1, "End date is required"),

    breaks: z.array(
      z.object({
        startTime: z.string(),
        endTime: z.string(),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    // -------------------------
    // DATE VALIDATION
    // -------------------------

    if (data.startDate >= data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "End date must be after start date",
      });
    }

    // -------------------------
    // TIME VALIDATION
    // -------------------------

    if (data.startTime >= data.endTime) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message:
          "End time must be after start time",
      });
    }

    // -------------------------
    // BREAK VALIDATION
    // -------------------------

    data.breaks.forEach((breakItem, index) => {
      if (
        breakItem.startTime >=
        breakItem.endTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: [
            "breaks",
            index,
            "endTime",
          ],
          message:
            "Break end time must be after break start time",
        });
      }

      if (
        breakItem.startTime <
          data.startTime ||
        breakItem.endTime >
          data.endTime
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