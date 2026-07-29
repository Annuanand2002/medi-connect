export interface DoctorRejectEmailDate {
  name: string;
  email: string;
  rejectReason: string;
  canRetry: boolean;
  retryLink?: string;
}