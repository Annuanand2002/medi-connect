import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

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

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["PENDING_SETUP", "ACTIVE", "BLOCKED"],
      default: "PENDING_SETUP",
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