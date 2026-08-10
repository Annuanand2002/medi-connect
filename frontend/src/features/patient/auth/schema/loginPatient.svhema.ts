import { z } from "zod";

export const loginPatientSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be atleast 8 charcters."),
});

export type LoginPatientFormData = z.infer<typeof loginPatientSchema>;
