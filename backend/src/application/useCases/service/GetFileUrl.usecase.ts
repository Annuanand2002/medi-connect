import { inject, injectable } from "inversify";
import { IGetSignedFileUrlUseCase } from "../../services/IGetFileUrl.usecase";
import { TYPES } from "../../../di/types/types";
import { IFileAccessService } from "../../../domain/services/IFileAccess";

@injectable()
export class GetSignedFileUrlUseCase implements IGetSignedFileUrlUseCase{
  constructor(
    @inject(TYPES.S3FileAccessService)
    private readonly _fileAccessService: IFileAccessService,
  ) {}

  async execute(key: string): Promise<string> {
    return await this._fileAccessService.getSignedUrl(key);
  }
}