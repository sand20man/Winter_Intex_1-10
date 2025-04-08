import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  showId: number;
  title: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ showId, title, posterUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${showId}`);
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      key={showId}
    >
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h4 className="movie-title">{title}</h4>
    </div>
  );
};

export default MovieCard;
