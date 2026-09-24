import { CreateReviewDTO, ReviewResDTO } from "../../../../application/DTO/doctor/review.DTO";

export interface ICreateReview {
    execute(dto:CreateReviewDTO):Promise<ReviewResDTO>
}