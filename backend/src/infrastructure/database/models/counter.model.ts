import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  sequence: {
    type: Number,
    default: 0,
  },
});

export type CounterSchema = InferSchemaType<typeof counterSchema>;
export type CounterDocument = HydratedDocument<CounterSchema>;
const CounterModel = model<CounterSchema>("Counter", counterSchema);

export default CounterModel;
