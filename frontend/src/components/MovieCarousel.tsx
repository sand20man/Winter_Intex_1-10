import React, { useRef, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

export interface CarouselMovie {
  showId: string;
  title: string;
  posterUrl: string;
}

interface MovieCarouselProps {
  movies: CarouselMovie[];
  genre?: string; // optional
  onEndReached?: (genre: string) => void; // optional
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  genre,
  onEndReached,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ⬇️ Add this useEffect block directly after scrollRef
  useEffect(() => {
    if (!genre || !onEndReached) return;

    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 100) {
        onEndReached(genre);
      }
    };

    const current = scrollRef.current;
    current?.addEventListener('scroll', handleScroll);
    return () => current?.removeEventListener('scroll', handleScroll);
  }, [onEndReached, genre]);

  return (
    <div className="carousel-container">
      <div className="carousel-track" ref={scrollRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.showId}
            showId={movie.showId}
            title={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
