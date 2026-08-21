import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const doctorLeaveSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      default: "",
      required: true,
    },
    isDeleted : {
        type : Boolean,
        default : false,
        required : true
    }
  },
  { timestamps: true },
);

export type DoctorLeaveSchema = InferSchemaType<typeof doctorLeaveSchema>;
export type DoctorLeaveDocument = HydratedDocument<DoctorLeaveSchema>;

const DoctorLeaveModel = model<DoctorLeaveSchema>("DoctorLeave", doctorLeaveSchema);

export default DoctorLeaveModel;
