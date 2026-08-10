import { inject, injectable } from "inversify";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IGetSignedFileUrlUseCase } from "../../../application/services/IGetFileUrl.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import { TYPES } from "../../../di/types/types";

@injectable()
export class GetFileURlController {
  constructor(
    @inject(TYPES.GetSignedFileUrlUseCase)
    private _getSignedFileUrlUseCase: IGetSignedFileUrlUseCase) {}
  getSignedFileUrl = asyncHandler(async (req: Request, res: Response) => {
    const { key } = req.query;

    if (!key || typeof key !== "string") {
      throw new AppError("File key is required", HTTP_STATUS.BAD_REQUEST);
    }

    const signedUrl = await this._getSignedFileUrlUseCase.execute(key);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Signed URL generated successfully",
      result: {
        url: signedUrl,
      },
    });
  });
}
