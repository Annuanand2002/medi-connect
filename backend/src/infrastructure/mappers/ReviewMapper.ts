import { Types } from "mongoose";
import { Review } from "../../domain/entities/doctor/review.entity";
import { ReviewDocument, ReviewSchema } from "../database/models/review.model";

export class ReviewMapper {
  static toDomain(document: ReviewDocument): Review {
    return {
      id: document.id.toString(),
      doctorId: document.doctorId.toString(),
      patientId: document.patientId.toString(),
      appointmentId: document.appointmentId.toString(),
      reviewCode: document.reviewCode,
      rating: document.rating,
      review: document.review,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      isDeleted : document.isDeleted
    };
  }
  static toPersistence(review: Partial<Review>): Partial<ReviewSchema> {
    return {
      doctorId: review.doctorId
        ? new Types.ObjectId(review.doctorId)
        : undefined,
      patientId: review.patientId
        ? new Types.ObjectId(review.patientId)
        : undefined,
      appointmentId: review.appointmentId
        ? new Types.ObjectId(review.appointmentId)
        : undefined,
      reviewCode: review.reviewCode,
      review: review.review,
      rating: review.rating,
      isDeleted : review.isDeleted
    };
  }
}
