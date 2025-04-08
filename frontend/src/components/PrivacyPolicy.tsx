import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-heading">CineNiche Privacy Policy</h1>
      <p className="privacy-meta">
        <strong>Effective Date:</strong> April 7, 2025
      </p>

      <h2 className="privacy-subheading">Scope of This Policy</h2>
      <p>
        This Privacy Policy applies to all websites, applications, and digital
        services offered by CineNiche. It does <strong>not</strong> apply to
        third-party websites or platforms, even if you access CineNiche content
        through them. We recommend reviewing the privacy policies of any
        third-party services you use.
      </p>

      <h2 className="privacy-subheading">Information We Collect</h2>
      <p>We collect two types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Data that identifies you (e.g.,
          name, email, payment info).
        </li>
        <li>
          <strong>Anonymous or Aggregated Data:</strong> Data that doesn’t
          personally identify you.
        </li>
      </ul>
      <p>
        Examples include account info, demographics, viewing history, device
        data, and cookies.
      </p>

      <h2 className="privacy-subheading">How We Collect Your Information</h2>
      <ul>
        <li>When you register, stream, or interact with CineNiche</li>
        <li>Via cookies and tracking technologies</li>
        <li>Through analytics tools</li>
        <li>From third-party partners</li>
      </ul>

      <h2 className="privacy-subheading">How We Use Your Information</h2>
      <ul>
        <li>To deliver and personalize your experience</li>
        <li>To recommend content</li>
        <li>To maintain and improve CineNiche</li>
        <li>To communicate with you</li>
        <li>To prevent fraud or misuse</li>
      </ul>

      <h2 className="privacy-subheading">Cookies and Tracking</h2>
      <p>
        We use cookies to keep you logged in, save preferences, and improve your
        experience. You can manage cookies in your browser settings. Disabling
        them may impact functionality.
      </p>

      <h2 className="privacy-subheading">Sharing Your Information</h2>
      <p>
        We <strong>do not sell</strong> your personal information. We may share
        it with:
      </p>
      <ul>
        <li>Service providers who help us operate CineNiche</li>
        <li>Law enforcement or regulators if required</li>
        <li>Third parties only with your consent</li>
      </ul>

      <h2 className="privacy-subheading">Your Privacy Choices</h2>
      <ul>
        <li>Update your profile</li>
        <li>Opt out of marketing emails</li>
        <li>Request account deletion</li>
        <li>Adjust cookie settings</li>
        <li>Request access to your data</li>
      </ul>
      <p>
        Contact us at{' '}
        <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>.
      </p>

      <h2 className="privacy-subheading">Children’s Privacy</h2>
      <p>
        CineNiche is not intended for children under 13. We do not knowingly
        collect information from children without verifiable parental consent.
      </p>

      <h2 className="privacy-subheading">Data Security and Retention</h2>
      <p>
        We use encryption, access controls, and security audits to protect your
        data. Data is only retained as long as necessary for legal or business
        reasons.
      </p>

      <h2 className="privacy-subheading">International Data Transfers</h2>
      <p>
        CineNiche is based in the U.S. Your data may be processed in the U.S. or
        other countries where our partners operate.
      </p>

      <h2 className="privacy-subheading">Updates to This Policy</h2>
      <p>
        We may update this policy occasionally. We will notify users of
        significant changes via email or platform notification.
      </p>

      <h2 className="privacy-subheading">Contact Us</h2>
      <p>If you have questions, please reach out:</p>
      <p>
        <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
        <br />
        CineNiche, 123 Indie Avenue, Provo, UT 84602
      </p>
    </div>
  );
};

export default PrivacyPolicy;
