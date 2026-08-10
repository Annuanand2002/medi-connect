export interface IGetSignedFileUrlUseCase {
  execute(key: string): Promise<string>;
}