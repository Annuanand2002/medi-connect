import FileEntity from "../../domain/entities/common/file.entity";
import { UploadFile } from "../../domain/entities/doctor/doctorRequestEntity";
import { IFileUploadService } from "../../domain/services/IFileUpload";
import cloudinary from "../../shared/config/cloudinary";
import streamifier from "streamifier";

export class CloudinaryFileUploadService implements IFileUploadService {
  async upload(file: FileEntity, folder: string): Promise<UploadFile> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadMany(files: FileEntity[], folder: string): Promise<UploadFile[]> {
    return Promise.all(files.map((file) => this.upload(file, folder)));
  }
}
