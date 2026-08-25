import { injectable } from "inversify";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import DoctorAvailabilityModel, {
  DoctorAvailabilitySchema,
} from "../../database/models/doctorAvailability";
import { DoctorAvailabilityMapper } from "../../mappers/doctorAvailabilityMapper";
import { BaseRepository } from "../Base/base.repo.impl";
import { Week } from "../../../shared/constants/week";

@injectable()
export class DoctorAvailabilityRepo
  extends BaseRepository<DoctorAvailabilitySchema, DoctorAvailability>
  implements IDoctorAvailabilityRepo
{
  constructor() {
    super(
      DoctorAvailabilityModel,
      DoctorAvailabilityMapper.toDomain,
      DoctorAvailabilityMapper.toPersistence,
    );
  }
  async findAvailability(doctorId: string): Promise<DoctorAvailability[]> {
    const records = await DoctorAvailabilityModel.find({
      doctorId,
      isAvailable: true,
      isDeleted: false,
    });
    return records.map((record) => DoctorAvailabilityMapper.toDomain(record));
  }

  async findAvailabiltyForDate(
    doctorId: string,
    date: Date,
  ): Promise<DoctorAvailability[]> {
    const records = await DoctorAvailabilityModel.find({
      doctorId,
      startDate: { $lte: date },
      endDate: { $gte: date },
      isAvailable: true,
      isDeleted: false,
    });
    return records.map((record) => DoctorAvailabilityMapper.toDomain(record));
  }

  async findOverlapAvailability(
    doctorId: string,
    dayOfWeek: Week,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<DoctorAvailability | null> {
    const dayMap: Record<Week, string> = {
      MONDAY: "MO",
      TUESDAY: "TU",
      WEDNESDAY: "WE",
      THURSDAY: "TH",
      FRIDAY: "FR",
      SATURDAY: "SA",
      SUNDAY: "SU",
    };
    const rruleDay = dayMap[dayOfWeek];
    const query: Record<string, unknown> = {
      doctorId,
      isDeleted: false,
      recurrenceRule: {
        $regex: `BYDAY=${rruleDay}`,
      },
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    };
    if (excludeId) {
      query._id = {
        $ne: excludeId,
      };
    }
    const record = await DoctorAvailabilityModel.findOne(query);
    if (!record) return null;
    return DoctorAvailabilityMapper.toDomain(record);
  }
  async findAvailabilityForLeave(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DoctorAvailability[]> {
    const records = await DoctorAvailabilityModel.find({
      doctorId,
      isAvailable: true,
      isDeleted: false,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });
    return records.map((record) => DoctorAvailabilityMapper.toDomain(record));
  }
}
