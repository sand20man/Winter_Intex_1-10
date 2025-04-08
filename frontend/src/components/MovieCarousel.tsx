import React from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

export interface CarouselMovie {
  showId: string;
  title: string;
  posterUrl: string;
}

interface MovieCarouselProps {
  movies: CarouselMovie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {movies.map((movie) => (
          <MovieCard
            key={movie.showId}
            showId={movie.showId}
            title={movie.title}
            // posterUrl={movie.posterUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
