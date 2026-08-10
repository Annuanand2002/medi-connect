import { injectable } from "inversify";
import { ICounterRepo } from "../../domain/repositories/common/ICounter";
import CounterModel from "../database/models/counter.model";

@injectable()
export default class CounterRepo implements ICounterRepo {
  async getNextSequence(name: string): Promise<number> {
    const counter = await CounterModel.findOneAndUpdate(
      { name },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    return counter.sequence;
  }
}
