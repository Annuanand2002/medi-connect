import { Model, HydratedDocument } from "mongoose";
import {
  IBaseRepository,
  PaginationResult,
} from "../../../domain/repositories/base/IBaseRepository";

export class BaseRepository<
  TSchema,
  TDomain,
> implements IBaseRepository<TDomain> {
  constructor(
    protected readonly model: Model<TSchema>,
    protected readonly toDomain: (doc: HydratedDocument<TSchema>) => TDomain,
    protected readonly toPersistence: (
      domain: Partial<TDomain>,
    ) => Partial<TSchema>,
  ) {}

  async findById(id: string): Promise<TDomain | null> {
    const document = await this.model.findById(id);
    if (!document) return null;
    return this.toDomain(document);
  }
  async create(data: Partial<TDomain>): Promise<TDomain> {
    const persistanceData = this.toPersistence(data);
    const document = await this.model.create(persistanceData);
    return this.toDomain(document);
  }
  async update(id: string, data: Partial<TDomain>): Promise<TDomain | null> {
    const persistanceData = this.toPersistence(data);
    const document = await this.model.findByIdAndUpdate(id, persistanceData, {
      new: true,
    });
    if (!document) return null;
    return this.toDomain(document);
  }
  async findAll(
    page: number,
    limit: number,
    query: Record<string, unknown>,
  ): Promise<PaginationResult<TDomain>> {
    const total = await this.model.countDocuments(query);
    const documents = await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      data: documents.map(this.toDomain),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
