import { z } from "zod";

export const loginDoctorSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be atleast 8 charcters."),
});

export type LoginDoctorFormData = z.infer<typeof loginDoctorSchema>;
