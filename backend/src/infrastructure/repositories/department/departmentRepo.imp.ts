import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import { DepartmentMapper } from "../../mappers/DepartmentMapper";
import DepartmentModel from "../../database/models/department.model";
import { injectable } from "inversify";

@injectable()
export class DepartmentRepo implements IDepartmentRepo {
  async create(data: Partial<Department>): Promise<Department> {
    const document = await DepartmentModel.create(data);
    return DepartmentMapper.toDomain(document);
  }
  async update(
    id: string,
    data: Partial<Department>,
  ): Promise<Department | null> {
    const document = await DepartmentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return null;
    }
    return DepartmentMapper.toDomain(document);
  }
  async findById(id: string): Promise<Department | null> {
    const document = await DepartmentModel.findById(id);
    if (!document) {
      return null;
    }
    return DepartmentMapper.toDomain(document);
  }
  async findByName(name: string): Promise<Department | null> {
    const document = await DepartmentModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      isActive: true,
    });
    if (!document) {
      return null;
    }
    return DepartmentMapper.toDomain(document);
  }
  async findAll(): Promise<Department[]> {
    const department = await DepartmentModel.find({ isActive: true }).sort({
      name: 1,
    });
    return department.map(DepartmentMapper.toDomain);
  }
  async findlastDepartment(): Promise<Department | null> {
    const department = await DepartmentModel.findOne().sort({ createdAt: -1 });
    return department ? DepartmentMapper.toDomain(department) : null;
  }
}
