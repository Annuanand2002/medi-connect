import {
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../../shared/config/s3";
import { IFileAccessService } from "../../domain/services/IFileAccess";
import { injectable } from "inversify";
import env from "../../shared/config/env";

@injectable()
export class S3FileAccessService implements IFileAccessService{
  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET!,
      Key: key,
    });

    const signedUrl = await getSignedUrl(
      s3Client,
      command,
      {
        expiresIn: 300, 
      },
    );

    return signedUrl;
  }
}