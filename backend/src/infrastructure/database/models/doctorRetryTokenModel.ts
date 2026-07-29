import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const doctorRetryTokenSchema = new Schema(
  {
    doctorRequestId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorRequest",
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

export type DoctorRetryTokenSchema = InferSchemaType<
  typeof doctorRetryTokenSchema
>;

export type DoctorRetryTokenDocument = HydratedDocument<DoctorRetryTokenSchema>;

export const DoctorRetryTokenModel = model<DoctorRetryTokenDocument>(
  "DoctorRetryToken",
  doctorRetryTokenSchema,
);
