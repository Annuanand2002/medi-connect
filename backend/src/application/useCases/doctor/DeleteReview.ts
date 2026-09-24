import { inject, injectable } from "inversify";
import { IReviewRepo } from "../../../domain/repositories/doctor/IReview.repo";
import { TYPES } from "../../../di/types/types";
import { IDeleteReview } from "../../../domain/repositories/doctor/repo.usecase/IDeleteReview.useCase";
import { ReviewResDTO } from "../../DTO/doctor/review.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class DeleteReview implements IDeleteReview {
  constructor(
    @inject(TYPES.ReviewRepo)
    private _reviewRepo: IReviewRepo,
  ) {}
  async execute(id: string): Promise<ReviewResDTO | null> {
    if (!id) {
      throw new AppError("Review not found", HTTP_STATUS.NOT_FOUND);
    }
    const reveiw = await this._reviewRepo.update(id, { isDeleted: true });
    if (!reveiw) {
      throw new AppError(
        "Review was not able to delete",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return {
      patientId: reveiw.patientId,
      doctorId: reveiw.doctorId,
      appointmentId: reveiw.appointmentId,
      reviewCode: reveiw.reviewCode,
      review: reveiw.review,
      rating: reveiw.rating,
      createdAt: reveiw.createdAt,
      updatedAt: reveiw.updatedAt,
    };
  }
}
