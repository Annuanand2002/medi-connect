export interface ICounterRepo {
  getNextSequence(name: string): Promise<number>;
}