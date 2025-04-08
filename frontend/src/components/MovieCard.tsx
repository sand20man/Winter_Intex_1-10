import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';
import { getPosterUrl } from '../api/MovieAPI';

interface MovieCardProps {
  showId: string;
  title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ showId, title }) => {
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
      <img
        src={getPosterUrl(title)}
        alt={title}
        className="movie-poster"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/logos/CameraLogo.png';
        }}
      />
      <h4 className="movie-title">{title}</h4>
    </div>
  );
};

export default MovieCard;
