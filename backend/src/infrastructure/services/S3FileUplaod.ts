import { PutObjectCommand } from "@aws-sdk/client-s3";
import FileEntity from "../../domain/entities/common/file.entity";
import { UploadFile } from "../../domain/entities/doctor/doctorRequestEntity";
import { IFileUploadService } from "../../domain/services/IFileUpload";
import s3Client from "../../shared/config/s3";
import env from "../../shared/config/env";
import { injectable } from "inversify";


@injectable()
export class S3FileUploadService implements IFileUploadService {
  async upload(file: FileEntity, folder: string): Promise<UploadFile> {
    const key = `${folder}/${Date.now()}-${file.originalName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const url = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

    return {
      url,
      key: key,
    };
  }

  async uploadMany(files: FileEntity[], folder: string): Promise<UploadFile[]> {
    return Promise.all(files.map((file) => this.upload(file, folder)));
  }
}
