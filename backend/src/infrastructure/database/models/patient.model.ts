import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const uploadPatientFileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const patientSchema = new Schema(
  {
    patientCode: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    profileImg: {
      type: uploadPatientFileSchema,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export type PatientSchema = InferSchemaType<typeof patientSchema>;
export type PatientDocument = HydratedDocument<PatientSchema>;
const PatientModel = model<PatientSchema>("Patient", patientSchema);
export default PatientModel;
