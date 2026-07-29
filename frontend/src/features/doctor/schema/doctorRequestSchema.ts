import {z} from "zod";
const MAX_FILE_SIZE = 5 * 1024*1024
const IMAGE_TYPES = ["image/jpeg","image/png","image/jpg"]
const PDF_TYPE = "application/pdf";

const optionalImageSchema = z
  .instanceof(FileList)
  .refine(
    (files) => files.length === 0 || IMAGE_TYPES.includes(files[0].type),
    "Only PNG or JPEG images are allowed."
  )
  .refine(
    (files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE,
    "Image must be smaller than 5 MB."
  );

const pdfSchema = z
  .instanceof(FileList)
  .refine((files) => files.length === 1, "This document is required.")
  .refine(
    (files) => files[0]?.type === PDF_TYPE,
    "Only PDF files are allowed."
  )
  .refine(
    (files) => files[0]?.size <= MAX_FILE_SIZE,
    "PDF must be smaller than 5 MB."
  );

const multiplePdfSchema = z
  .instanceof(FileList)
  .refine(
    (files) => files.length > 0,
    "At least one degree certificate is required."
  )
  .refine(
    (files) => Array.from(files).every((file) => file.type === PDF_TYPE),
    "Only PDF files are allowed."
  )
  .refine(
    (files) =>
      Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
    "Each PDF must be smaller than 5 MB."
  );

export const doctorRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must contain at least 3 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required."),

  qualification: z
    .string()
    .trim()
    .min(2, "Qualification is required."),

  specialization: z
    .string()
    .trim()
    .min(2, "Specialization is required."),

experience: z
  .number({
    error: "Experience must be a number.",
  })
  .min(0, "Experience cannot be negative."),

  profileImg: optionalImageSchema,

  governmentId: pdfSchema,

  medicalLicense: pdfSchema,

  degreeCertificates: multiplePdfSchema,
});

export type DoctorRequestSchema = z.infer<typeof doctorRequestSchema>;