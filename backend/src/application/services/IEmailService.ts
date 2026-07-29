export interface DoctorSetupEmailData {
  name: string;
  email: string;
  token: string;
}

export interface DoctorRejectEmailDate{
    email :string;
    name : string;
    rejectReason : string;
    canRetry : boolean
    retryLink ?: string;
}
export default interface IEmailService {
  sendDoctorSetupEmail(
    data: DoctorSetupEmailData
  ): Promise<void>;
  sendDoctorRejectionemail(data:DoctorRejectEmailDate):Promise<void>
}