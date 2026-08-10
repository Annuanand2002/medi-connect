import bannerImage from "@/assets/images/robot.png";
import logo from "@/assets/logo/mediconnect-logo.jpeg";

const LoginDoctorBanner = () => {
  return (
    <section className="doctor-login-banner">

      {/* Decorative background */}
      <div className="doctor-banner-glow doctor-banner-glow-one" />
      <div className="doctor-banner-glow doctor-banner-glow-two" />

      <div className="doctor-banner-grid" />

      <span className="doctor-banner-dot doctor-banner-dot-one" />
      <span className="doctor-banner-dot doctor-banner-dot-two" />
      <span className="doctor-banner-dot doctor-banner-dot-three" />
      <span className="doctor-banner-dot doctor-banner-dot-four" />

      <div className="doctor-banner-content">

        {/* Brand */}
        <div className="doctor-brand">

          <div className="doctor-brand-logo">
            <img
              src={logo}
              alt="MediConnect logo"
            />
          </div>

          <div className="doctor-brand-info">
            <h2>MediConnect</h2>
            <span>Healthcare Platform</span>
          </div>

        </div>


        {/* Illustration */}
        <div className="doctor-banner-illustration">

          <div className="doctor-illustration-ring doctor-illustration-ring-one" />

          <div className="doctor-illustration-ring doctor-illustration-ring-two" />

          <div className="doctor-illustration-glow" />

          <img
            src={bannerImage}
            alt="MediConnect AI healthcare assistant"
            className="doctor-robot-image"
          />

        </div>


        {/* Bottom Content */}
        <div className="doctor-banner-message">

          <span className="doctor-banner-eyebrow">
            DOCTOR PORTAL
          </span>

          <h1>
            Smarter healthcare.
            <br />
            <span>Simplified.</span>
          </h1>

          <p>
            Everything you need to manage
            your practice, in one place.
          </p>

        </div>

      </div>
    </section>
  );
};

export default LoginDoctorBanner;