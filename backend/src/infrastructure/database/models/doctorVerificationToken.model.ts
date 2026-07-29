import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const doctorVerificationTokenSchema = new Schema(
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
   timestamps : true
  },
);

export type DoctorVerificationTokenSchema = InferSchemaType<
  typeof doctorVerificationTokenSchema
>;

export type DoctorVerificationTokenDocument =
  HydratedDocument<DoctorVerificationTokenSchema>;

const DoctorVerificationTokenModel = model<DoctorVerificationTokenSchema>(
  "DoctorVerificationToken",
  doctorVerificationTokenSchema,
);

export default DoctorVerificationTokenModel;
