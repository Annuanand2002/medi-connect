import { GetDoctorRequestDTO } from "../../../application/DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../../application/DTO/doctorRequet/PaginationDoctorRequestDTO";
import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { DoctorRequestMapper } from "../../database/mappers/DoctorRequestMapper";
import DoctorRequestModel from "../../database/models/doctorRequest.model";

export class DoctorRequestRepository implements IDoctorRequest {
  async create(data: Partial<DoctorRequest>): Promise<DoctorRequest> {
    const document = await DoctorRequestModel.create(
      DoctorRequestMapper.toPersistence(data),
    );
    return DoctorRequestMapper.toDomain(document);
  }
  async findById(id: string): Promise<DoctorRequest|null> {
    console.log("repo id",id)
    const document = await DoctorRequestModel.findById(id);
    if (!document) return null;
    return DoctorRequestMapper.toDomain(document);

  }
  async findByEmail(email: string): Promise<DoctorRequest|null> {
    const document = await DoctorRequestModel.findOne({ email });
    if (!document) return null;
    return DoctorRequestMapper.toDomain(document);
  }
  async update(
    id: string,
    data: Partial<DoctorRequest>,
  ): Promise<DoctorRequest | null> {
    const document = await DoctorRequestModel.findByIdAndUpdate(
      id,
      DoctorRequestMapper.toPersistence(data),
      { new: true },
    );
    if (!document) return null;
    return DoctorRequestMapper.toDomain(document);
  }
  async findAll(dto: GetDoctorRequestDTO): Promise<PaginationDoctorRequestDTO> {
      const {page,limit,status,search} = dto;
      const query:Record<string,unknown> = {};
      if(status){
        query.status = status;
      }
      if(search){
        query.$or = [
            {
                fullName : {
                    $regex : search,
                    $options : "i"
                },
                email : {
                    $regex : search,
                    $options : "i"
                }
            }
        ]
      };
      const total = await DoctorRequestModel.countDocuments(query);
      const documents = await DoctorRequestModel.find(query)
      .sort({createdAt : -1})
      .skip((page-1)*limit)
      .limit(limit);
      return {
        requests : documents.map(DoctorRequestMapper.toDomain),
        page,
        limit,
        total,
        totalPages: Math.ceil(total/limit)
      }
  }
}
