import bannerImage from "@/assets/images/robot.png";
import logo from "@/assets/logo/mediconnect-logo.jpeg";

const LoginBanner = () => {
  return (
    <section className="login-banner">

      {/* Decorative background */}
      <div className="banner-glow banner-glow-one" />
      <div className="banner-glow banner-glow-two" />

      <div className="banner-grid" />

      <span className="banner-dot banner-dot-one" />
      <span className="banner-dot banner-dot-two" />
      <span className="banner-dot banner-dot-three" />
      <span className="banner-dot banner-dot-four" />

      <div className="banner-content">

        {/* Brand */}
        <div className="brand">
          <div className="brand-logo">
            <img
              src={logo}
              alt="MediConnect logo"
            />
          </div>

          <div className="brand-info">
            <h2>MediConnect</h2>
            <span>Healthcare Platform</span>
          </div>
        </div>

        {/* Illustration */}
        <div className="banner-illustration">

          <div className="illustration-ring illustration-ring-one" />
          <div className="illustration-ring illustration-ring-two" />

          <div className="illustration-glow" />

          <img
            src={bannerImage}
            alt="MediConnect AI healthcare assistant"
            className="robot-image"
          />

        </div>

        {/* Bottom Content */}
        <div className="banner-message">

          <span className="banner-eyebrow">
            ADMIN PORTAL
          </span>

          <h1>
            Smarter healthcare.
            <br />
            <span>Simplified.</span>
          </h1>

          <p>
            Everything you need to manage
            your healthcare platform, in one place.
          </p>

        </div>

      </div>
    </section>
  );
};

export default LoginBanner;
