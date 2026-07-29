import { DoctorRetryToken } from "../../../domain/entities/doctor/doctorRetryToken";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import { DoctorRetryTokenMapper } from "../../database/mappers/DoctorRetryTokenMapper";
import { DoctorRetryTokenModel } from "../../database/models/doctorRetryTokenModel";


export class DoctorRetryTokenRepository implements IDoctorRetryTokenRepo{
    async create(data: DoctorRetryToken): Promise<void> {
        const token = await DoctorRetryTokenMapper.toPersistence(data);
        await DoctorRetryTokenModel.create(token)
    }
    async findByToken(token: string): Promise<DoctorRetryToken | null> {
        const retryToken = await DoctorRetryTokenModel.findOne({token})
        if(!retryToken)return null;
        return DoctorRetryTokenMapper.toDomain(retryToken)
    }
    async deleteByToken(token: string): Promise<void> {
        await DoctorRetryTokenModel.deleteOne({token})
    }
    async deleteBydoctorRequest(doctorRequestId: string): Promise<void> {
        await DoctorRetryTokenModel.deleteOne({doctorRequestId})
    }
}