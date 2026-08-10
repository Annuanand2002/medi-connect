import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const doctorResetTokenSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
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

export type DoctorResetTokenSchema = InferSchemaType<
  typeof doctorResetTokenSchema
>;

export type DoctorResetTokenDocument = HydratedDocument<DoctorResetTokenSchema>;

export const DoctorResetTokenModel = model<DoctorResetTokenDocument>(
  "DoctorResetToken",
  doctorResetTokenSchema,
);
