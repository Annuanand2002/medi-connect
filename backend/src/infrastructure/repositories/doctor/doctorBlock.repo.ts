import { injectable } from "inversify";
import {
  GetBlockReqDTO,
  PaginationDoctorBlockResDTO,
} from "../../../application/DTO/doctor/doctorBlock.DTO";
import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import DoctorBlockModel, {
  DoctorBlockSchema,
} from "../../database/models/doctorBlock";
import { DoctorBlockMapper } from "../../mappers/doctorBlock.mapper";
import { BaseRepository } from "../Base/base.repo.impl";

@injectable()
export class DoctorBlockRepo
  extends BaseRepository<DoctorBlockSchema, DoctorBlock>
  implements IDoctorBlockRepo
{
  constructor() {
    super(
      DoctorBlockModel,
      DoctorBlockMapper.toDomain,
      DoctorBlockMapper.toPersistence,
    );
  }

  async findByDoctorId(doctorId: string): Promise<DoctorBlock[]> {
    const blocks = await DoctorBlockModel.find({
      doctorId,
      isDeleted: false,
    });

    return blocks.map((block) =>
      DoctorBlockMapper.toDomain(block),
    );
  }

  async findByDoctorAndDate(
    doctorId: string,
    date: Date,
  ): Promise<DoctorBlock[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const documents = await DoctorBlockModel.find({
      doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isDeleted: false,
    });

    return documents.map((doc) =>
      DoctorBlockMapper.toDomain(doc),
    );
  }

  async findOverlappingBlock(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string,
    excludeId?: string,
  ): Promise<DoctorBlock | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query: Record<string, unknown> = {
      doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isDeleted: false,

      // Time overlap condition
      startTime: {
        $lt: endTime,
      },
      endTime: {
        $gt: startTime,
      },
    };

    if (excludeId) {
      query._id = {
        $ne: excludeId,
      };
    }

    const document = await DoctorBlockModel.findOne(query);

    if (!document) {
      return null;
    }

    return DoctorBlockMapper.toDomain(document);
  }

  async findBlocks(
    dto: GetBlockReqDTO,
  ): Promise<PaginationDoctorBlockResDTO> {
    const {
      page,
      limit,
      doctorId,
      date,
      search,
    } = dto;

    const query: Record<string, unknown> = {
      doctorId,
      isDeleted: false,
    };

    if (date) {
      const selectedDate = new Date(date);

      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (search) {
      query.reason = {
        $regex: search,
        $options: "i",
      };
    }

    const result = await super.findAll(
      page,
      limit,
      query,
    );

    return {
      requests: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
  async findBlocksByDoctorAndDate(
  doctorId: string,
  date: Date,
): Promise<DoctorBlock[]> {
  const blocks =  await DoctorBlockModel.find({
    doctorId,
    date,
    isDeleted: false,
  })
  return blocks.map(block=>DoctorBlockMapper.toDomain(block))
}
}
