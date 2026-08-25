import { HydratedDocument, model, Schema, Types } from "mongoose";

export interface DoctorAvailabilitySchema {
  doctorId: Types.ObjectId;

  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  isAvailable: boolean;
  isDeleted: boolean;

  duration: number;

  startDate: Date;
  endDate: Date;

  recurrenceRule: string;
  exceptions: {
    date: Date;
    startTime: string;
    endTime: string;
    breaks: {
      startTime: string;
      endTime: string;
    }[];
  }[];

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
      required: false,
    },
    duration: {
      type: Number,
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
    recurrenceRule: {
      type: String,
      required: true,
    },
    exceptions: {
      type: [
        {
          _id: false,
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
          breaks: {
            type: {
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
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type DoctorAvailabilityDocument =
  HydratedDocument<DoctorAvailabilitySchema>;

const DoctorAvailabilityModel = model<DoctorAvailabilitySchema>(
  "DoctorAvailability",
  doctorAvailabilitySchema,
);

export default DoctorAvailabilityModel;
