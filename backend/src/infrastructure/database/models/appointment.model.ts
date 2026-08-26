import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    appointmentCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentDate: {
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
    status: {
      type: String,
      required: true,
      enum: ["BOOKED", "CANCELLED", "RESCHEDULED"],
    },
  },
  { timestamps: true },
);

export type AppointmentSchema = InferSchemaType<typeof appointmentSchema>;
export type AppointmentDocument = HydratedDocument<AppointmentSchema>;

const AppointmentModel = model<AppointmentSchema>(
  "Appointment",
  appointmentSchema,
);

export default AppointmentModel;
