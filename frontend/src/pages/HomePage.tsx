import PosterWall from '../components/PosterWall';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ zIndex: 3 }}
      >
        <Navbar onSearchChange={() => {}} homePageBool={true} />
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

      <div style={{ zIndex: 10 }}>
        <Footer homePageBool={false} />
      </div>
    </>
  );
}

export default HomePage;
