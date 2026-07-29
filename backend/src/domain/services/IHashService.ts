export interface IHashService {
  hashValue(value: string): Promise<string>;
  comparevalue(plainvalue: string, hahsValue: string): Promise<boolean>;
}
