import IEmailService, {
  DoctorRejectEmailDate,
  DoctorResetEmailData,
  DoctorSetupEmailData,
  PatientOTPEmailData,
} from "../../application/services/IEmailService";
import transporter from "../../shared/config/mail.config";
import { doctorSetupTemplate } from "../../shared/services/template/doctorSetup.template";
import { doctorRejectionTemplate } from "../../shared/services/template/doctorRejection.template";
import { injectable } from "inversify";
import { patientSetupTemplate } from "../../shared/services/template/pateintSetupTemplate";
import { doctorResetPasswordTemplate } from "../../shared/services/template/doctorResetPasswordTemplate";
import { patientResetPasswordTemplate } from "../../shared/services/template/patientResetPassword";

@injectable()
export default class EmailService implements IEmailService {
  async sendDoctorSetupEmail({
    name,
    email,
    token,
  }: DoctorSetupEmailData): Promise<void> {
    const setupLink = `${process.env.FRONTEND_URL}/doctor/setup-password?token=${token}`;

    await transporter.sendMail({
      from: `"MediConnect" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Complete your MediConnect account setup",
      html: doctorSetupTemplate(name, setupLink),
    });
  }
  async sendDoctorRejectionemail(data: DoctorRejectEmailDate): Promise<void> {
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Update on your MediConnect application",
      html: doctorRejectionTemplate(
        data.name,
        data.rejectReason,
        data.retryLink ?? "",
        data.canRetry,
      ),
    });
  }
  async sendDoctorResetEmail(data: DoctorResetEmailData): Promise<void> {
    const setupResetLink = `${process.env.FRONTEND_URL}/doctor/reset-password?token=${data.token}`;
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Reset your MediConnect password",
      html: doctorResetPasswordTemplate(data.name, setupResetLink),
    });
  }
async sendPatientOtp(data: PatientOTPEmailData): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Verify your Mediconnect account setup",
      html: patientSetupTemplate(data.name, data.otp),
    });
  } catch (error) {
    console.error("EMAIL SENDING ERROR:", error);
    throw error;
  }
}
 async sendPatientResetEmail(data: DoctorResetEmailData): Promise<void> {
    const setupResetLink = `${process.env.FRONTEND_URL}/patient/reset-password?token=${data.token}`;
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Reset your MediConnect account setup",
      html: patientResetPasswordTemplate(data.name, setupResetLink),
    });
  }
}
