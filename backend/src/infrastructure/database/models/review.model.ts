import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const reviewSchema  = new Schema({
    doctorId : {
        type : Schema.Types.ObjectId,
        ref : "Doctor",
        required : true
    },
    patientId : {
        type : Schema.Types.ObjectId,
        ref : "Patient",
        required : true
    },
    appointmentId : {
        type : Schema.Types.ObjectId,
        ref : "Appointment",
        required : true,
        unique : true
    },
    reviewCode : {
        type : String,
        required : true,
        unique : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    review : {
        type : String,
        required : true,
        trim : true
    },
        isDeleted : {
        type : Boolean,
        default : false,
        required : true
    }
},{timestamps:true})

export type ReviewSchema = InferSchemaType<typeof reviewSchema>;
export type ReviewDocument = HydratedDocument<ReviewSchema>;
const ReviewModel = model<ReviewSchema>("Review", reviewSchema);
export default ReviewModel;
