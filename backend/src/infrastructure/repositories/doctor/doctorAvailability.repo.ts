import { injectable } from "inversify";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { Week } from "../../../shared/constants/week";
import DoctorAvailabilityModel, {
  DoctorAvailabilitySchema,
} from "../../database/models/doctorAvailability";
import { DoctorAvailabilityMapper } from "../../mappers/doctorAvailabilityMapper";
import { BaseRepository } from "../Base/base.repo.impl";

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
  async findByDoctor(doctorId: string): Promise<DoctorAvailability[]> {
    const doctors = await DoctorAvailabilityModel.find({ doctorId });
    return doctors.map((doctor) => DoctorAvailabilityMapper.toDomain(doctor));
  }
  async findByDoctorAndDay(
    doctorId: string,
    dayOfWeek: Week,
  ): Promise<DoctorAvailability | null> {
    const doctor = await DoctorAvailabilityModel.findOne({
      doctorId,
      dayOfWeek,
    });
    if (!doctor) return null;
    return DoctorAvailabilityMapper.toDomain(doctor);
  }
  async findAvailability(doctorId: string): Promise<DoctorAvailability[]> {
    const availability = await DoctorAvailabilityModel.find({
      doctorId,
      isDeleted: false,
    });
    return availability.map((item) => ({
      id: item._id.toString(),
      doctorId: item.doctorId.toString(),
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      breaks: item.breaks,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      isAvailable: item.isAvailable,
      isDeleted: item.isDeleted,
      duration: item.duration,
    }));
  }
}
