export const doctorSetupTemplate = (
  name: string,
  setupLink: string
) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
  <h2>Welcome to MediConnect</h2>

  <p>Hello Dr. ${name},</p>

  <p>
    Your application has been approved.
    Click the button below to create your password and activate your account.
  </p>

  <p style="text-align:center;margin:30px 0;">
    <a
      href="${setupLink}"
      style="
        background:#2563eb;
        color:white;
        padding:12px 24px;
        text-decoration:none;
        border-radius:6px;
      "
    >
      Set Password
    </a>
  </p>

  <p>This link will expire in 24 hours.</p>

  <p>If you didn't request this, you can safely ignore this email.</p>

  <br/>

  <p>Regards,</p>
  <strong>MediConnect Team</strong>
</div>
`;