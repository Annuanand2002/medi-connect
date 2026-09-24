import { inject, injectable } from "inversify";
import { IUpdateReview } from "../../../domain/repositories/doctor/repo.usecase/IUpdateReview.usecase";
import { TYPES } from "../../../di/types/types";
import { IReviewRepo } from "../../../domain/repositories/doctor/IReview.repo";
import { ReviewResDTO, UpdateReviewDTO } from "../../DTO/doctor/review.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class UpdateReview implements IUpdateReview {
  constructor(
    @inject(TYPES.ReviewRepo)
    private _reviewRepo: IReviewRepo,
  ) {}

  async execute(id: string, dto: UpdateReviewDTO): Promise<ReviewResDTO> {
    if (!id) {
      throw new AppError("Review not found", HTTP_STATUS.NOT_FOUND);
    }
    const update = await this._reviewRepo.update(id, dto);
    if (!update) {
      throw new AppError("Failed to update", HTTP_STATUS.NOT_FOUND);
    }
    return {
      doctorId: update.doctorId,
      patientId: update.patientId,
      appointmentId: update.appointmentId,
      reviewCode: update.reviewCode,
      review: update.review,
      rating: update.rating,
      createdAt: update.createdAt,
      updatedAt: update.updatedAt,
    };
  }
}
