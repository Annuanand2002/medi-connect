import { injectable } from "inversify";
import { IHashService } from "../../domain/services/IHashService";
import bcrypt from "bcrypt";

@injectable()
export class HashService implements IHashService {
  private readonly saltRound = 10;
  async hashValue(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRound);
  }
  async comparevalue(plainvalue: string, hahsValue: string): Promise<boolean> {
    return bcrypt.compare(plainvalue, hahsValue);
  }
}
