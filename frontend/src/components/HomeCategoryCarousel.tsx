import { useState } from 'react';
import './HomeCategoryCarousel.css';

interface Category {
  name: string;
  posters: string[]; // image paths
}

const categories: Category[] = [
  {
    name: 'Cult Classics',
    posters: [
      '/posters/labyrinth.jpg',
      '/posters/pulpfiction.jpg',
      '/posters/montypython.jpg',
      '/posters/hairspray.jpg',
      '/posters/ferrisbuellersdayoff.jpg',
      '/posters/clockworkorange.jpg',
    ],
  },
  {
    name: 'International Cinema',
    posters: [
      '/posters/panslabyrinth.jpg',
      '/posters/cityofgod.jpg',
      '/posters/squidgame.jpg',
      '/posters/lacasadepapel.jpg',
      '/posters/sngamalydiaries.jpg',
      '/posters/resurrection.jpg',
    ],
  },
  {
    name: 'Indie Films',
    posters: [
      '/posters/thepiano.jpg',
      '/posters/brightstar.jpg',
      '/posters/gurgaon.jpg',
      '/posters/paradisehills.jpg',
      '/posters/reallylove.jpg',
      '/posters/likecrazy.jpg',
    ],
  },
  {
    name: 'Niche Documentaries',
    posters: [
      '/posters/fantasticfungi.jpg',
      '/posters/misha.jpg',
      '/posters/johnofgod.jpg',
      '/posters/helvetica.jpg',
      '/posters/sushi.jpg',
      '/posters/theactofkilling.jpg',
    ],
  },
];

export default function HomeCategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const currentCategory = categories[currentIndex];

  return (
    <div
      className="text-white text-center py-5"
      style={{ backgroundColor: 'black' }}
    >
      <h4 className="mb-4 text-uppercase fw-bold">Discover the Best In</h4>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <button className="arrow-btn me-3" onClick={handlePrev}>
          <i className="fas fa-chevron-left fa-2x" />
        </button>
        <div className="category-carousel-wrapper mb-4 position-relative">
          <div className="category-carousel d-flex justify-content-center">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`carousel-item text-center mx-3 ${
                  idx === currentIndex ? 'active' : 'inactive'
                }`}
              >
                <h2 className="text-uppercase mb-0">{cat.name}</h2>
              </div>
            ))}
          </div>

          {/* Left and right fade overlays */}
          <div className="fade-left" />
          <div className="fade-right" />
        </div>

        <button className="arrow-btn ms-3" onClick={handleNext}>
          <i className="fas fa-chevron-right fa-2x" />
        </button>
      </div>
      <div className="poster-fade-wrapper position-relative">
        <div className="row justify-content-center g-4 px-3">
          {currentCategory.posters.map((poster, i) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
              <img
                src={poster}
                alt={`Poster ${i}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* Fades */}
        <div className="fade-poster-left" />
        <div className="fade-poster-right" />
      </div>
    </div>
  );
}
