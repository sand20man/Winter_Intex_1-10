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
      <p>
        We process your personal data under the following legal bases:
        <ul>
          <li>Your consent (e.g., for email marketing or cookies)</li>
          <li>
            The performance of a contract (e.g., providing subscription access)
          </li>
          <li>Our legitimate interests (e.g., improving the service)</li>
          <li>Compliance with legal obligations</li>
        </ul>
      </p>

      <h2 className="privacy-subheading">Cookies and Tracking</h2>
      <p>
        We use cookies for essential functionality, to understand usage
        patterns, and to deliver personalized content and advertising.
      </p>
      <p>The types of cookies we use include:</p>
      <ul>
        <li>
          <strong>Essential cookies</strong> – Required for site functionality
        </li>
        <li>
          <strong>Analytics cookies</strong> – Help us understand how users
          interact with the site
        </li>
        <li>
          <strong>Marketing cookies</strong> – Used to display relevant
          advertisements
        </li>
      </ul>
      <p>
        You can adjust your cookie preferences at any time in your browser
        settings or via our cookie consent tool.
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

      <h2 className="privacy-subheading">Your Data Protection Rights</h2>
      <p>You have the following rights under the GDPR:</p>
      <ul>
        <li>
          The right to access – You can request a copy of the personal data we
          hold about you.
        </li>
        <li>
          The right to rectification – You can ask us to correct or complete
          inaccurate or incomplete data.
        </li>
        <li>
          The right to erasure – You can request that we delete your data under
          certain conditions.
        </li>
        <li>
          The right to restrict processing – You can request we limit how we use
          your data.
        </li>
        <li>
          The right to object to processing – You can object to how we use your
          data, including for direct marketing.
        </li>
        <li>
          The right to data portability – You can request a copy of your data in
          a machine-readable format.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please email{' '}
        <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>. We
        will respond within one month.
      </p>

      <h2 className="privacy-subheading">Children’s Privacy</h2>
      <p>
        CineNiche is not intended for children under 13. We do not knowingly
        collect information from children without verifiable parental consent.
      </p>

      <h2 className="privacy-subheading">Data Security and Retention</h2>
      <p>
        We use encryption, access controls, and security audits to protect your
        data. We retain your personal data for as long as your account is active
        or as needed to provide you with our services. Inactive accounts are
        deleted after 12 months of inactivity. Data related to financial
        transactions is retained for up to 7 years for legal compliance.
      </p>

      <h2 className="privacy-subheading">International Data Transfers</h2>
      <p>
        CineNiche is based in the U.S. Your data may be processed in the U.S. or
        other countries where our partners operate. If we transfer your personal
        data outside the European Economic Area (EEA), we ensure appropriate
        safeguards are in place, such as Standard Contractual Clauses approved
        by the European Commission.
      </p>

      <h2 className="privacy-subheading">Updates to This Policy</h2>
      <p>
        We may update this policy occasionally. We will notify users of
        significant changes via email or platform notification.
      </p>

      <h2 className="privacy-subheading">Contact Us</h2>
      <p>
        CineNiche LLC is the data controller responsible for processing your
        personal data in accordance with this policy.
      </p>
      <p>
        If you are a resident of the European Economic Area (EEA) and believe
        that your data protection rights have been violated, you have the right
        to lodge a complaint with your local Data Protection Authority (DPA).
      </p>
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
