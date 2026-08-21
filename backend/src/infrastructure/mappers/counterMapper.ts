import { Counter } from "../../domain/entities/common/counter";
import { CounterDocument } from "../database/models/counter.model";

export class CounterMapper {
  static toDomain(document: CounterDocument): Counter {
    return {
      id: document._id.toString(),
      name: document.name,
      sequence: document.sequence,
    };
  }

  static toPersistence(counter: Partial<Counter>) {
    return {
      name: counter.name,
      sequence: counter.sequence,
    };
  }
}
