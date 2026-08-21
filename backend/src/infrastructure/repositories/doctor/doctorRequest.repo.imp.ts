import { injectable } from "inversify";
import { GetDoctorRequestDTO } from "../../../application/DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../../application/DTO/doctorRequet/PaginationDoctorRequestDTO";
import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import DoctorRequestModel, {
  DoctorRequestSchmea,
} from "../../database/models/doctorRequest.model";
import { BaseRepository } from "../Base/base.repo.impl";
import { DoctorRequestMapper } from "../../mappers/DoctorRequestMapper";

@injectable()
export class DoctorRequestRepository
  extends BaseRepository<DoctorRequestSchmea, DoctorRequest>
  implements IDoctorRequest
{
  constructor() {
    super(
      DoctorRequestModel,
      DoctorRequestMapper.toDomain,
      DoctorRequestMapper.toPersistence,
    );
  }

  async findByEmail(email: string): Promise<DoctorRequest | null> {
    const document = await DoctorRequestModel.findOne({ email });
    if (!document) return null;
    return DoctorRequestMapper.toDomain(document);
  }
  async findDoctorRequests(
    dto: GetDoctorRequestDTO,
  ): Promise<PaginationDoctorRequestDTO> {
    const { page, limit, status, search } = dto;
    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const result = await super.findAll(page, limit, query);
    return {
      requests: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
}
