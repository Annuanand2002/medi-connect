import {ReviewResDTO, UpdateReviewDTO } from "../../../../application/DTO/doctor/review.DTO";


export interface IUpdateReview{
    execute(id:string,dto:UpdateReviewDTO):Promise<ReviewResDTO>
}