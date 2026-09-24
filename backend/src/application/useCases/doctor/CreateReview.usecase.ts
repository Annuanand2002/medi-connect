import { inject, injectable } from "inversify";
import { ICreateReview } from "../../../domain/repositories/doctor/repo.usecase/ICreateReview.usecase";
import { IReviewRepo } from "../../../domain/repositories/doctor/IReview.repo";
import { TYPES } from "../../../di/types/types";
import { CreateReviewDTO, ReviewResDTO } from "../../DTO/doctor/review.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { ICounterRepo } from "../../../domain/repositories/common/ICounter";
import { generateCode } from "../../../shared/utils/GenerateCode";

@injectable()
export class CreateReview implements ICreateReview {
  constructor(
    @inject(TYPES.ReviewRepo)
    private _reviewRepo: IReviewRepo,
    @inject(TYPES.CounterRepo)
    private _counterRepo: ICounterRepo,
  ) {}

  async execute(dto: CreateReviewDTO): Promise<ReviewResDTO> {
    if (!dto.doctorId) {
      throw new AppError("Doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    if (!dto.appointmentId) {
      throw new AppError("Invalid appointment", HTTP_STATUS.NOT_FOUND);
    }
    const existing = await this._reviewRepo.findExisitingReview(
      dto.appointmentId,
    );
    if (existing) {
      throw new AppError(
        "You have already added your feedback",
        HTTP_STATUS.CONFLICT,
      );
    }
    const sequence = await this._counterRepo.getNextSequence("review");
    const reviewCode = generateCode(sequence, "REV");
    const review = await this._reviewRepo.create({
        patientId : dto.patientId,
        doctorId : dto.doctorId,
        appointmentId : dto.appointmentId,
        reviewCode,
        review : dto.review,
        rating : dto.rating,
        isDeleted : false
    })
    return {
      patientId: review.patientId,
      doctorId: review.doctorId,
      appointmentId: review.appointmentId,
      reviewCode: review.reviewCode,
      review: review.review,
      rating: review.rating,
      createdAt : review.createdAt,
      updatedAt : review.updatedAt
    };
  }
}
