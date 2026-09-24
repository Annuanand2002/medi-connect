import { GetReviewReqDTO, PaginationReviewResDTO } from "../../../../application/DTO/doctor/review.DTO";

export interface IGetReviews {
    execute(dto:GetReviewReqDTO):Promise<PaginationReviewResDTO>
}