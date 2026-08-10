import { Model, HydratedDocument } from "mongoose";
import { IBaseRepository } from "../../../domain/repositories/base/IBaseRepository";

export class BaseRepository<
  TSchema,
  TDomain,
> implements IBaseRepository<TDomain> {
  constructor(
    protected readonly model: Model<TSchema>,
    protected readonly toDomain: (doc: HydratedDocument<TSchema>) => TDomain,
  ) {}

  async findById(id: string): Promise<TDomain | null> {
    const document = await this.model.findById(id);

    if (!document) return null;

    return this.toDomain(document);
  }
}
