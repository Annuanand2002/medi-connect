export const patientSetupTemplate = (
  name: string,
  otp: string,
) => `
<div style="
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 30px;
  color: #333;
">

  <h2 style="color: #241C84;">
    Welcome to MediConnect
  </h2>

  <p>
    Hello ${name},
  </p>

  <p>
    Your OTP to verify your email address is:
  </p>

  <div style="
    text-align: center;
    margin: 30px 0;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 8px;
    color: #241C84;
  ">
    ${otp}
  </div>

  <p>
    This OTP will expire in <strong>5 minutes</strong>.
  </p>

  <p>
    If you didn't request this, you can safely ignore this email.
  </p>

  <br />

  <p>
    Regards,<br />
    <strong>MediConnect Team</strong>
  </p>

</div>
`;