import { z } from "zod";

export const patientRegistrationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name is too long"),

    email: z.string().email("Enter a valid email address"),

    dateOfBirth: z.string().min(1, "Date of birth is required"),

    gender: z.enum(["Male", "Female", "Other"], {
      error: "Please select your gender",
    }),

    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      error: "Please select your blood group",
    }),

    weight: z
      .number()
      .positive("Weight must be greater than 0")
      .max(300, "Please enter a valid weight"),

    height: z
      .number()
      .positive("Height must be greater than 0")
      .max(250, "Please enter a valid height"),
    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
