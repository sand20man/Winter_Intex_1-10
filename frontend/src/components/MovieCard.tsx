import React from 'react';
import './MovieCard.css';

interface MovieCardProps {
  title: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h4 className="movie-title">{title}</h4>
    </div>
  );
};

export default MovieCard;
