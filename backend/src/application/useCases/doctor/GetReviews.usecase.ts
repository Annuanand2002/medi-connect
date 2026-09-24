import { inject, injectable } from "inversify";
import { IGetReviews } from "../../../domain/repositories/doctor/repo.usecase/IGetReviews.usecase";
import { IReviewRepo } from "../../../domain/repositories/doctor/IReview.repo";
import { TYPES } from "../../../di/types/types";
import { GetReviewReqDTO, PaginationReviewResDTO } from "../../DTO/doctor/review.DTO";

@injectable()
export class GetReviews implements IGetReviews{
    constructor(
        @inject(TYPES.ReviewRepo)
        private _reviewRepo : IReviewRepo
    ){}
    async execute(dto: GetReviewReqDTO): Promise<PaginationReviewResDTO> {
        return await this._reviewRepo.findAllReview(dto)
    }
}