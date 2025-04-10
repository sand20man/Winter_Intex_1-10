import PosterWall from '../components/PosterWall';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HomePage.css';
import { useState } from 'react';
import HomeCategoryCarousel from '../components/HomeCategoryCarousel';


interface SupportedDevice {
  name: string;
  svgPath?: string;
  iconClass?: string;
  label: string;
}

const supportedDevices: SupportedDevice[] = [
  {
    name: 'Windows/Mac',
    iconClass: 'fas fa-desktop',
    label: 'Windows and Mac',
  },
  {
    name: 'iOS/Android',
    iconClass: 'fas fa-mobile-alt',
    label: 'iOS and Android',
  },
  {
    name: 'Roku',
    svgPath: '/logos/roku.svg',
    label: 'Roku',
  },
  {
    name: 'Apple TV',
    svgPath: '/logos/appletv.svg',
    label: 'Apple TV',
  },
  {
    name: 'GoogleTV',
    svgPath: '/logos/google.svg',
    label: 'GoogleTV',
  },
  {
    name: 'LG',
    svgPath: '/logos/lg.svg',
    label: 'Select TV Models',
  },
  {
    name: 'Samsung',
    svgPath: '/logos/samsung.svg',
    label: 'Select TV Models',
  },
  {
    name: 'Play Station',
    svgPath: '/logos/playstation.svg',
    label: 'Select Models',
  },
];

function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const faqData = [
    {
      question: "What's CineNiche?",
      answer:
        'CineNiche is an up-and-coming movie streaming company focused on delivering curated, hard-to-find content to a passionate audience.',
    },
    {
      question: 'What kind of content can be found on CineNiche?',
      answer:
        'Our catalog spans cult classics, international cinema, indie films, and niche documentaries, many of which are unavailable on larger mainstream platforms.',
    },
    {
      question: 'How do I sign up?',
      answer:
        'You can sign up through our website or app with just a few steps. Click "Get Started" at the top of the page to begin!',
    },
    {
      question: 'What devices are supported?',
      answer:
        'CineNiche supports a wide range of platforms including Apple TV, Roku, Android TV, iOS, and more.',
    },
    {
      question: 'How much does CineNiche cost?',
      answer:
        'We offer multiple pricing tiers to suit your needs, including monthly and yearly plans.',
    },
    {
      question: 'Where is CineNiche available?',
      answer:
        'The CineNiche app is available in the US, across 10 territories in Latin America and the Caribbean, and in 20 countries in Central and Eastern Europe. As CineNiche grows, we hope to expand to more countries, so please support CineNiche by streaming today!',
    },
    // Add more questions as needed
  ];
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100"
        style={{ zIndex: 10 }}
      >
        <Navbar
          onSearchChange={() => {}}
          homePageBool={true}
          showSearch={false}
          setShowSearch={() => {}}
          searchInput=""
          setSearchInput={() => {}}
        />
      </div>

      <div className="position-relative">
        <PosterWall />

        {/* Left-to-right gradient overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ zIndex: 2, pointerEvents: 'none' }}
        >
          <div className="w-100 h-100 position-relative">
            <svg
              className="position-relative top-0 start-0 w-100 h-100"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient
                  id="fadeLeftToRight"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="black" stopOpacity="1" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="url(#fadeLeftToRight)"
              />
            </svg>

            {/* Bottom fade-to-black gradient */}
            <svg
              className="position-absolute bottom-0 start-0 w-100"
              height="150"
              preserveAspectRatio="none"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient
                  id="fadeBottom"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="black" stopOpacity="0" />
                  <stop offset="100%" stopColor="black" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#fadeBottom)"
              />
            </svg>

            <div
              className="position-absolute"
              style={{
                bottom: '37.5%',
                left: '2rem',
                color: 'white',
                zIndex: 1,
              }}
            >
              <div
                className="d-flex flex-column gap-3 text-start"
                style={{
                  maxWidth: '700px',
                }}
              >
                <h1
                  style={{
                    fontSize: '4rem', // Big bold headline (adjust up if needed)
                    fontWeight: '700', // Very bold
                    lineHeight: '1.1', // Tight line height
                    wordWrap: 'break-word',
                  }}
                >
                  Your Destination for Curated Cinema
                </h1>
                <h5
                  style={{
                    fontSize: '1.5rem', // Subheadline, still strong
                    fontWeight: '400',
                    lineHeight: '1.4',
                  }}
                >
                  Discover Hidden Gems, Cult Classics & International Hits.
                  Smart Recommendations. Serious Passion for Film.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeCategoryCarousel />

      {/* Supported Devices Section */}
      <div
        className="container text-white py-5"
        style={{ backgroundColor: 'black' }}
      >
        <h2 className="text-center fw-bold mb-4">
          Watch CineNiche on Your Favorite Devices
        </h2>
        <div className="container py-5 text-white">
          <div className="row justify-content-center g-4">
            {supportedDevices.map((device) => (
              <div className="col-6 col-md-3 text-center" key={device.name}>
                {device.svgPath ? (
                  <img
                    src={device.svgPath}
                    alt={device.name}
                    className="white-logo"
                  />
                ) : (
                  <i
                    className={`${device.iconClass} fa-2x mb-2`}
                    style={{ color: 'white' }}
                    aria-hidden="true"
                  ></i>
                )}
                <div>{device.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container py-5 text-white">
        <h2 className="text-center fw-bold mb-4">Still Have Questions?</h2>
        {faqData.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="border-bottom py-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveIndex(isActive ? -1 : index)}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <span className="fs-4 fw-semibold">{faq.question}</span>
                <i
                  className={`fas fa-chevron-down transition-icon ${
                    isActive ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              {isActive && (
                <div className="mt-3 text-white text-start">{faq.answer}</div>
              )}
            </div>
          );
        })}
      </div>

      <Footer homePageBool={false} />
    </>
  );
}

export default HomePage;
