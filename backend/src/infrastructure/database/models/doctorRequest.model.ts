import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const uploadFileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const doctorRequestSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    profileImg: {
      type: uploadFileSchema,
    },
    qualification: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    governmentId: {
      type: uploadFileSchema,
      required: true,
    },
    medicalLicense: {
      type: uploadFileSchema,
      required: true,
    },
    degreeCertificates: {
      type: [uploadFileSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      required: true,
    },
    rejectReason: {
      type: String,
      default: "",
    },
    rejectCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

doctorRequestSchema.index({ status: 1 });

export type DoctorRequestSchmea = InferSchemaType<typeof doctorRequestSchema>;
export type DoctorRequestDcoument = HydratedDocument<DoctorRequestSchmea>;
const DoctorRequestModel = model<DoctorRequestSchmea>(
  "DoctorRequest",
  doctorRequestSchema,
);

export default DoctorRequestModel;
