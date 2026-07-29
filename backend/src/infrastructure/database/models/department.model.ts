import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  departmentCode: {
    type: String,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim : true,
    default: "",
  },
  isActive : {
    type : Boolean,
    default : true
  }
},
{timestamps : true});

export type DepartmentSchema = InferSchemaType<typeof departmentSchema>;
export type DepartmentDocument = HydratedDocument<DepartmentSchema>;
const DepartmentModel = model<DepartmentSchema>("Department", departmentSchema);

export default DepartmentModel;
