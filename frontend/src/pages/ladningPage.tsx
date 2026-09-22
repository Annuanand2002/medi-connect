import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Check,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
  Video,
} from "lucide-react";
import '@/styles/landingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="landing-header">
        <div className="landing-container navbar">
          <Link to="/" className="brand">
            <span className="brand-icon">
              <HeartPulse size={22} />
            </span>
            <span className="brand-text">
              <strong>MediConnect</strong>
              <small>Healthcare, connected</small>
            </span>
          </Link>

          <nav className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#patients">For patients</a>
            <a href="#doctors">For doctors</a>
            <a href="#ai-care">AI care</a>
          </nav>

          <div className="nav-actions">
            <Link to="/patient/login" className="nav-login">
              Patient login
            </Link>
            <Link to="/doctor/login" className="nav-doctor-login">
              Doctor login
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-glow" />

          <div className="landing-container hero-grid">
            <div className="hero-content">
              <div className="eyebrow">
                <Sparkles size={16} />
                Smarter healthcare starts here
              </div>

              <h1>
                Healthcare,
                <br />
                <span>made simpler.</span>
              </h1>

              <p className="hero-description">
                Discover healthcare professionals, book appointments,
                and manage your healthcare journey from one simple platform.
              </p>

              <div className="hero-actions">
                <Link to="/patient/create-patient" className="button button-primary">
                  Find a doctor <ArrowRight size={17} />
                </Link>
                <Link to="/doctor/apply" className="button button-secondary">
                  Join as a doctor
                </Link>
              </div>

              <div className="hero-benefits">
                <span><Check size={16} /> Verified professionals</span>
                <span><Check size={16} /> Flexible appointments</span>
                <span><Check size={16} /> Online consultations</span>
              </div>
            </div>

            {/* Decorative dashboard preview */}
            <div className="hero-preview">
              <div className="preview-header">
                <div>
                  <small>MEDICONNECT</small>
                  <h3>Find the right care</h3>
                </div>
                <span className="preview-logo">
                  <HeartPulse size={22} />
                </span>
              </div>

              <div className="preview-card search-preview">
                <small>WHAT ARE YOU LOOKING FOR?</small>
                <div className="preview-search">
                  <Stethoscope size={19} />
                  <span>Search by specialization</span>
                </div>
              </div>

              <div className="preview-card">
                <div className="doctor-preview-top">
                  <div className="avatar-placeholder">
                    <UserRound size={26} />
                  </div>
                  <div className="doctor-preview-info">
                    <strong>Experienced specialist</strong>
                    <small>Verified healthcare professional</small>
                  </div>
                  <span className="rating-pill">4.9 ★</span>
                </div>

                <div className="preview-details">
                  <div>
                    <CalendarCheck size={16} />
                    <small>Availability</small>
                    <strong>Check slots</strong>
                  </div>
                  <div>
                    <Video size={16} />
                    <small>Consultation</small>
                    <strong>Online</strong>
                  </div>
                </div>
              </div>

              <div className="ai-preview">
                <span className="ai-icon"><Brain size={21} /></span>
                <div>
                  <strong>AI-assisted care</strong>
                  <small>Coming soon to MediConnect</small>
                </div>
                <span className="soon-pill">SOON</span>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="highlights-section">
          <div className="landing-container highlights-grid">
            <div>
              <strong>One connected platform</strong>
              <p>Healthcare discovery and appointments</p>
            </div>
            <div>
              <strong>Verified professionals</strong>
              <p>Doctor applications reviewed by admins</p>
            </div>
            <div>
              <strong>Built for convenience</strong>
              <p>Access your healthcare journey online</p>
            </div>
          </div>
        </section>

        {/* Patients */}
        <section className="content-section patient-section" id="patients">
          <div className="landing-container two-column">
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <small>Patient dashboard</small>
                <h3>Your healthcare, organized.</h3>
              </div>

              <div className="patient-feature-grid">
                <FeatureCard
                  icon={<Stethoscope />}
                  title="Find doctors"
                  description="Explore relevant specialists"
                />
                <FeatureCard
                  icon={<CalendarCheck />}
                  title="Book appointments"
                  description="Choose available slots"
                />
                <FeatureCard
                  icon={<Video />}
                  title="Online consultations"
                  description="Connect from anywhere"
                />
                <FeatureCard
                  icon={<Clock3 />}
                  title="Manage appointments"
                  description="Keep everything organized"
                />
              </div>
            </div>

            <div className="section-copy">
              <span className="section-label">FOR PATIENTS</span>
              <h2>Care that fits into your life.</h2>
              <p>
                Find healthcare professionals, explore their availability,
                and book consultations with convenience.
              </p>

              <InfoRow
                icon={<ShieldCheck />}
                title="Discover verified professionals"
                description="Doctor applications go through an administrative verification process."
              />
              <InfoRow
                icon={<CalendarCheck />}
                title="Choose convenient appointments"
                description="View available consultation slots and schedule a time that works for you."
              />

              <Link to="/patient/create-patient" className="button button-primary">
                Get started <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section className="content-section doctor-section" id="doctors">
          <div className="landing-container two-column">
            <div className="section-copy">
              <span className="section-label">FOR DOCTORS</span>
              <h2>Bring your expertise closer to patients.</h2>
              <p>
                Qualified healthcare professionals can apply to join
                MediConnect, build their professional presence, manage
                availability, and provide consultations.
              </p>

              <InfoRow
                icon={<UsersRound />}
                title="Connect with patients"
                description="Make your specialization discoverable to patients looking for care."
              />
              <InfoRow
                icon={<CalendarCheck />}
                title="Manage your availability"
                description="Set consultation hours and manage appointments."
              />
              <InfoRow
                icon={<ShieldCheck />}
                title="Professional verification"
                description="Applications are reviewed before doctors can join the platform."
              />

              <Link to="/doctor/apply" className="button button-secondary">
                Apply as a doctor <ArrowRight size={17} />
              </Link>
            </div>

            <div className="doctor-workspace">
              <div className="workspace-heading">
                <div>
                  <small>DOCTOR PROFILE</small>
                  <h3>Professional workspace</h3>
                </div>
                <Stethoscope size={23} />
              </div>

              <div className="workspace-profile">
                <div className="doctor-preview-top">
                  <div className="avatar-placeholder">
                    <UserRound size={26} />
                  </div>
                  <div className="doctor-preview-info">
                    <strong>Verified Doctor</strong>
                    <small>Professional profile</small>
                  </div>
                  <span className="available-pill">Available</span>
                </div>

                <div className="preview-details">
                  <div>
                    <small>Appointments</small>
                    <strong>Manage</strong>
                  </div>
                  <div>
                    <small>Availability</small>
                    <strong>Flexible</strong>
                  </div>
                </div>
              </div>

              <p className="workspace-note">
                Applications are reviewed by the MediConnect admin team.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="content-section how-section" id="how-it-works">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-label">HOW IT WORKS</span>
              <h2>Simple from the start.</h2>
              <p>
                MediConnect keeps the journey straightforward for patients
                and healthcare professionals.
              </p>
            </div>

            <div className="steps-grid">
              <StepCard
                number="01"
                icon={<UserRound />}
                title="Create an account"
                description="Register as a patient or submit your professional application as a doctor."
              />
              <StepCard
                number="02"
                icon={<ShieldCheck />}
                title="Get verified"
                description="Doctor applications are reviewed by the MediConnect admin team."
              />
              <StepCard
                number="03"
                icon={<CalendarCheck />}
                title="Start connecting"
                description="Patients can discover doctors and book consultations. Approved doctors can manage availability."
              />
            </div>
          </div>
        </section>

        {/* AI */}
        <section className="content-section ai-section" id="ai-care">
          <div className="landing-container two-column">
            <div className="section-copy">
              <span className="section-label">AI CARE · COMING SOON</span>
              <h2>A smarter way to find the care you need.</h2>
              <p>
                MediConnect is being designed to include AI-assisted
                symptom analysis that may help patients understand which
                type of specialist could be relevant.
              </p>
              <p className="disclaimer">
                Designed to support healthcare discovery, not replace
                a medical professional.
              </p>
            </div>

            <div className="ai-workflow">
              <div className="workflow-heading">
                <div>
                  <small>AI-ASSISTED CARE</small>
                  <h3>Future workflow</h3>
                </div>
                <Sparkles size={21} />
              </div>

              <WorkflowStep number="01" title="Describe your symptoms"
                description="Share what you are experiencing." />
              <WorkflowStep number="02" title="AI-assisted analysis"
                description="Identify potentially relevant specializations." />
              <WorkflowStep number="03" title="Discover relevant doctors"
                description="Explore doctors by specialization and availability." />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="landing-container">
            <div className="cta-card">
              <HeartPulse size={34} />
              <h2>Healthcare starts with connection.</h2>
              <p>
                Find the care you need or bring your expertise online
                with MediConnect.
              </p>
              <div className="cta-actions">
                <Link to="/patient/create-patient" className="button cta-patient">
                  Get started as a patient
                </Link>
                <Link to="/doctor/apply" className="button cta-doctor">
                  Join as a doctor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container footer-content">
          <Link to="/" className="brand">
            <span className="brand-icon"><HeartPulse size={19} /></span>
            <strong>MediConnect</strong>
          </Link>
          <p>Connecting patients with healthcare professionals.</p>
          <small>© {new Date().getFullYear()} MediConnect</small>
        </div>
      </footer>
    </div>
  );
};

type IconContentProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<IconContentProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="patient-feature">
    <span className="feature-icon">{icon}</span>
    <strong>{title}</strong>
    <p>{description}</p>
  </div>
);

const InfoRow: React.FC<IconContentProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="info-row">
    <span className="info-icon">{icon}</span>
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  </div>
);

type StepProps = IconContentProps & { number: string };

const StepCard: React.FC<StepProps> = ({
  number,
  icon,
  title,
  description,
}) => (
  <article className="step-card">
    <div className="step-card-top">
      <span className="feature-icon">{icon}</span>
      <span className="step-number">{number}</span>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
);

type WorkflowStepProps = {
  number: string;
  title: string;
  description: string;
};

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
}) => (
  <div className="workflow-step">
    <span className="workflow-number">{number}</span>
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  </div>
);

export default LandingPage;