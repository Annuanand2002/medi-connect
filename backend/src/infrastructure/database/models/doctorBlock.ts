import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const doctorBlockSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      default: "",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

export type DoctorBlockSchema = InferSchemaType<typeof doctorBlockSchema>;
export type DoctorBlockDocument = HydratedDocument<DoctorBlockSchema>;

const DoctorBlockModel = model<DoctorBlockSchema>(
  "DoctorBlock",
  doctorBlockSchema,
);

export default DoctorBlockModel;
