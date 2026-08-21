import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";
import DoctorRequest, { UploadFile } from "../../../domain/entities/doctor/doctorRequestEntity";
import { Department } from "../../../shared/constants/department";

const uploadFileSchema = new Schema<UploadFile>({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const doctorRequestSchema = new Schema<DoctorRequest>(
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
    department: {
      type: String,
      enum : Object.values(Department),
      required: true,
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
