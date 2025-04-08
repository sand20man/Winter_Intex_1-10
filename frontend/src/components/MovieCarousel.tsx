import React from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

export interface CarouselMovie {
  id: number;
  title: string;
  posterUrl: string;
}

interface MovieCarouselProps {
  movies: CarouselMovie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Recommended for You</h2>
      <div className="carousel-track">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl} // ← Use the actual property
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
