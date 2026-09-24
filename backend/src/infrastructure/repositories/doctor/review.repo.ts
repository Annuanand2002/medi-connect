import {
  GetReviewReqDTO,
  PaginationReviewResDTO,
} from "../../../application/DTO/doctor/review.DTO";
import { Review } from "../../../domain/entities/doctor/review.entity";
import { IReviewRepo } from "../../../domain/repositories/doctor/IReview.repo";
import ReviewModel, { ReviewSchema } from "../../database/models/review.model";
import { ReviewMapper } from "../../mappers/ReviewMapper";
import { BaseRepository } from "../Base/base.repo.impl";

export class ReviewRepo
  extends BaseRepository<ReviewSchema, Review>
  implements IReviewRepo
{
  constructor() {
    super(ReviewModel, ReviewMapper.toDomain, ReviewMapper.toPersistence);
  }
  async findAllReview(dto: GetReviewReqDTO): Promise<PaginationReviewResDTO> {
    const { page, limit, search, doctorId } = dto;
    const query: Record<string, unknown> = { doctorId,isDeleted: false, };
    if (search) {
      query.$or = [
        { review: { $regex: search, $options: "i" } },
        { reviewCode: { $regex: search, $options: "i" } },
      ];
    }

    const result = await super.findAll(page, limit, query);
    return {
      reviews: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
  async findExisitingReview(appointmentId: string): Promise<Review | null> {
    const review = await ReviewModel.findOne({appointmentId})
    if (!review) return null;
    return ReviewMapper.toDomain(review);
  }
}
