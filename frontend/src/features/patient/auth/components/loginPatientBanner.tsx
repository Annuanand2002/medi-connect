import bannerImage from "@/assets/images/robot.png";
import logo from "@/assets/logo/mediconnect-logo.jpeg";

const LoginPatientBanner = () => {
  return (
    <aside className="patient-login-banner">
      <div className="patient-login-banner-grid" />
      <div className="patient-login-banner-orb patient-login-banner-orb-one" />
      <div className="patient-login-banner-orb patient-login-banner-orb-two" />

      <div className="patient-login-brand">
        <img src={logo} alt="MediConnect" className="patient-login-logo" />

        <div>
          <strong>MediConnect</strong>
          <span>Patient Portal</span>
        </div>
      </div>

      <div className="patient-login-banner-copy">


      </div>

      <div className="patient-login-robot-wrap">
        <div className="patient-login-robot-halo" />
        <span className="patient-login-orbit patient-login-orbit-one" />
        <span className="patient-login-orbit patient-login-orbit-two" />

        <img
          src={bannerImage}
          alt="MediConnect AI healthcare assistant"
          className="patient-login-robot"
        />
      </div>

      <div className="patient-login-banner-card">
        <span className="patient-login-banner-card-icon">✓</span>

        <div>
          <strong></strong>
          <p>  Manage appointments, access your care, and stay connected to what
          matters most.</p>
        </div>
      </div>
    </aside>
  );
};

export default LoginPatientBanner;
