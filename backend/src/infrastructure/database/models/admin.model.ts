import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export type AdminSchmea = InferSchemaType<typeof adminSchema>;
export type AdminDcoument = HydratedDocument<AdminSchmea>;
const AdminModel = model<AdminSchmea>("Admin", adminSchema);

export default AdminModel;
