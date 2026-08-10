export interface IFileAccessService {
  getSignedUrl(key: string): Promise<string>;
}