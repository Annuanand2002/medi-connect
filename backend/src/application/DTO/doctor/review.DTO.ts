import { Review } from "../../../domain/entities/doctor/review.entity";

export interface CreateReviewDTO {
  doctorId: string;
  patientId: string;
  appointmentId: string;
  review: string;
  rating: number;
}
export interface UpdateReviewDTO {
  review: string;
  rating: number;
}
export interface ReviewResDTO {
  doctorId: string;
  patientId: string;
  appointmentId: string;
  reviewCode: string;
  review: string;
  rating: number;
  createdAt : Date;
  updatedAt : Date;
}

export interface GetReviewReqDTO {
  doctorId: string;
  page: number;
  limit: number;
  search?: string;
}
export interface PaginationReviewResDTO {
  reviews: Review[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
