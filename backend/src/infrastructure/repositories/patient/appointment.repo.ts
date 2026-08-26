import { injectable } from "inversify";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { BaseRepository } from "../Base/base.repo.impl";
import AppointmentModel, {
  AppointmentSchema,
} from "../../database/models/appointment.model";
import { Appointment } from "../../../domain/entities/patient/appointnent/appointment.entity";
import { AppointmentMapper } from "../../mappers/appointmentMapper";
import {
  GetAppointmentReqDTO,
  PaginationAppointmenttResDTO,
} from "../../../application/DTO/patient/getAppointmentRepo";
import DoctorModel from "../../database/models/doctor.model";
import { Types } from "mongoose";
import PatientModel from "../../database/models/patient.model";
import {
  GetDoctorAppointmentReqDTO,
  PaginationDoctorAppointmenttResDTO,
} from "../../../application/DTO/doctor/appointment";

@injectable()
export class AppoitmentRepo
  extends BaseRepository<AppointmentSchema, Appointment>
  implements IAppointmentRepo
{
  constructor() {
    super(
      AppointmentModel,
      AppointmentMapper.toDomain,
      AppointmentMapper.toPersistence,
    );
  }
  async findPatientAppointment(
    patientId: string,
    dto: GetAppointmentReqDTO,
  ): Promise<PaginationAppointmenttResDTO> {
    const { page, limit, search, status } = dto;

    const query: Record<string, unknown> = {
      patientId: new Types.ObjectId(patientId),
    };

    if (status) {
      query.status = status;
    }

    if (search) {
      const doctors = await DoctorModel.find({
        $or: [
          {
            fullName: {
              $regex: search,
              $options: "i",
            },
          },
          {
            department: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      const doctorIds = doctors.map((doctor) => doctor._id);

      query.$or = [
        {
          appointmentCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          doctorId: {
            $in: doctorIds,
          },
        },
      ];
    }

    const result = await super.findAll(page, limit, query);
    const doctorIds = result.data.map((appointment) => appointment.doctorId);
    const doctors = await DoctorModel.find({
      _id: {
        $in: doctorIds,
      },
    }).select("_id fullName doctorCode department");

    const doctorMap = new Map(
      doctors.map((doctor) => [doctor._id.toString(), doctor]),
    );

    const requests = result.data.map((appointment) => {
      const doctor = doctorMap.get(appointment.doctorId.toString());

      return {
        ...appointment,

        doctorName: doctor?.fullName ?? "",
        doctorCode: doctor?.doctorCode ?? "",
        department: doctor?.department ?? "",
      };
    });

    return {
      requests,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
  async findDoctorAppointment(
    doctorId: string,
    dto: GetDoctorAppointmentReqDTO,
  ): Promise<PaginationDoctorAppointmenttResDTO> {
    const { page, limit, search, date } = dto;

    const query: Record<string, unknown> = {
      doctorId: new Types.ObjectId(doctorId),
      status: "BOOKED",
    };
    const selectedDate = date ?? new Date();
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    query.appointmentDate = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
    if (search) {
      query.appointmentCode = {
        $regex: search,
        $options: "i",
      };
    }

    const result = await super.findAll(page, limit, query);
    const patientIds = result.data.map((appointment) => appointment.patientId);
    const patients = await PatientModel.find({
      _id: {
        $in: patientIds,
      },
    }).select("_id fullName patientCode email gender");
    const patientMap = new Map(
      patients.map((patient) => [patient._id.toString(), patient]),
    );
    const requests = result.data.map((appointment) => {
      const patient = patientMap.get(appointment.patientId.toString());

      return {
        ...appointment,

        patientName: patient?.fullName ?? "",
        patientCode: patient?.patientCode ?? "",
        email: patient?.email ?? "",
        gender: patient?.gender ?? "",
      };
    });

    return {
      requests,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }

  async findExistingAppointment(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string,
  ): Promise<Appointment | null> {
    const appointment = await AppointmentModel.findOne({
      doctorId,
      appointmentDate: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(24, 0, 0, 0)),
      },

      status: "BOOKED",
      startTime: {
        $lt: endTime,
      },

      endTime: {
        $gt: startTime,
      },
    });

    if (!appointment) {
      return null;
    }

    return AppointmentMapper.toDomain(appointment);
  }

  async findAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date,
  ): Promise<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await AppointmentModel.find({
      doctorId: new Types.ObjectId(doctorId),

      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },

      status: {
        $in: ["BOOKED", "RESCHEDULED"],
      },
    });

    return appointments.map((appointment) =>
      AppointmentMapper.toDomain(appointment),
    );
  }
}
