import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const patientResetTokenSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export type PatientResetTokenSchema = InferSchemaType<
  typeof patientResetTokenSchema
>;

export type PatientResetTokenDocument =
  HydratedDocument<PatientResetTokenSchema>;

export const PatientResetTokenModel = model<PatientResetTokenDocument>(
  "PatientResetToken",
  patientResetTokenSchema,
);
