import IEmailService, { DoctorRejectEmailDate, DoctorSetupEmailData } from "../../application/services/IEmailService";
import transporter from '../../shared/config/mail.config';
import { doctorSetupTemplate } from '../../shared/services/template/doctorSetup.template';
import { doctorRejectionTemplate } from '../../shared/services/template/doctorRejection.template';


export default class EmailService implements IEmailService {
  async sendDoctorSetupEmail({
    name,
    email,
    token,
  }: DoctorSetupEmailData): Promise<void> {
    const setupLink =
      `${process.env.FRONTEND_URL}/doctor/setup-password?token=${token}`;

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
      data.canRetry
    ),
  });
}

  }
