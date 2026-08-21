import {
  HydratedDocument,
  model,
  Schema,
  Types,
} from "mongoose";
import { Week } from "../../../shared/constants/week";

export interface DoctorAvailabilitySchema {
  doctorId: Types.ObjectId;
  dayOfWeek: Week;
  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  isAvailable: boolean;
  isDeleted : boolean;
  duration : number
  createdAt: Date;
  updatedAt: Date;
}

const doctorAvailabilitySchema = new Schema<DoctorAvailabilitySchema>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    dayOfWeek: {
      type: String,
      enum: Object.values(Week),
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

    breaks: {
      type: [
        {
          _id: false,
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
      required: true,
    },
    duration : {
        type : Number,
        required : true
    }
  },
  {
    timestamps: true,
  },
);

doctorAvailabilitySchema.index(
  { doctorId: 1, dayOfWeek: 1 },
  { unique: true },
);

export type DoctorAvailabilityDocument =
  HydratedDocument<DoctorAvailabilitySchema>;

const DoctorAvailabilityModel = model<DoctorAvailabilitySchema>(
  "DoctorAvailability",
  doctorAvailabilitySchema,
);

export default DoctorAvailabilityModel;