export const doctorRejectionTemplate = (
  name: string,
  rejectReason: string,
  retryLink: string,
  canRetry: boolean
) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
  <h2>Application Update</h2>

  <p>Hello Dr. ${name},</p>

  <p>
    Thank you for your interest in joining MediConnect.
    After reviewing your application, we're unable to approve it at this time.
  </p>

  <p><strong>Reason for rejection:</strong></p>

  <blockquote
    style="
      border-left:4px solid #ef4444;
      padding-left:12px;
      color:#444;
      margin:20px 0;
    "
  >
    ${rejectReason}
  </blockquote>

  ${
    canRetry
      ? `
      <p>
        You may correct the above issues and submit your application again.
      </p>

      <p style="text-align:center;margin:30px 0;">
        <a
          href="${retryLink}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Retry Application
        </a>
      </p>
      `
      : `
      <p>
        You have reached the maximum number of application attempts.
        If you believe this decision was made in error, please contact our support team.
      </p>
      `
  }

  <br/>

  <p>Regards,</p>

  <strong>MediConnect Team</strong>
</div>
`;