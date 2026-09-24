import { ReviewResDTO } from "../../../../application/DTO/doctor/review.DTO";


export interface IDeleteReview {
    execute(id:string):Promise<ReviewResDTO|null>
}