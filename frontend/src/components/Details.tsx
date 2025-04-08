import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingle, getPosterUrl } from '../api/MovieAPI';
import NavBar from './NavBar';
import './Details.css';

interface MovieDetails {
  title: string;
  director: string;
  cast: string;
  description: string;
  rating: string;
  releaseYear: number;
}

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (!showId) return;
    const fetchMovie = async () => {
      try {
        const data = await fetchSingle(showId);
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };
    fetchMovie();
  }, [showId]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="details-container">
        <div className="movie-info">
          <h2 className="movie-detail-title">
            {movie.title}{' '}
            <span className="release-year">({movie.releaseYear})</span>
          </h2>

          <p>
            <strong>Directed by:</strong> {movie.director?.trim() || 'N/A'}
          </p>

          <div>
            <strong>Cast:</strong> {movie.cast || 'N/A'}
          </div>

          <br />
          <div>
            <strong>Rating:</strong> {movie.rating || 'N/A'}
          </div>

          <p className="description">
            <strong>Movie Description:</strong>{' '}
            {movie.description?.trim() || 'N/A'}
          </p>
        </div>

        <div className="poster-container">
          <img
            src={getPosterUrl(movie.title)}
            alt={`${movie.title} poster`}
            className="movie-poster"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logos/VerticalLogo.png';
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
