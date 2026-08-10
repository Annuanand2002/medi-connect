import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const patientOtpSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
    lastSentAt: {
        type: Date,
        required : true,
    },
  resendCount: {
    type: Number,
    default: 0,
  }
  },
  {
    timestamps: true,
  },
);

export type PatientOtpSchema = InferSchemaType<typeof patientOtpSchema>;

export type PatientOtpDocument = HydratedDocument<PatientOtpSchema>;

const PatientOtpModel = model("PatientOtp", patientOtpSchema);

export default PatientOtpModel;
