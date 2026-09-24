import { IBaseRepository } from "../base/IBaseRepository";
import { Review } from "../../entities/doctor/review.entity";
import {
  GetReviewReqDTO,
  PaginationReviewResDTO,
} from "../../../application/DTO/doctor/review.DTO";

export interface IReviewRepo extends IBaseRepository<Review> {
  findAllReview(dto: GetReviewReqDTO): Promise<PaginationReviewResDTO>;
  findExisitingReview(appointmentId: string): Promise<Review | null>;
}
