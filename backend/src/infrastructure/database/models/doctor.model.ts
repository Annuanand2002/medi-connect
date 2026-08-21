import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";
import { Department } from "../../../shared/constants/department";

const uploadFileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const doctorSchema = new Schema(
  {
    doctorCode : {
        type:String,
        unique : true,
        trim : true
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    profileImg: {
      type : uploadFileSchema,
      required : true
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      enum : Object.values(Department),
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [ "ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export type DoctorSchema = InferSchemaType<typeof doctorSchema>;
export type DoctorDocument = HydratedDocument<DoctorSchema>;

const DoctorModel = model<DoctorSchema>("Doctor", doctorSchema);

export default DoctorModel;