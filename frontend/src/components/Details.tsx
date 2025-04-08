import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingle, getPosterUrl, getRecommendations } from '../api/MovieAPI';
import NavBar from './NavBar';
import './Details.css';
import MovieCarousel from './MovieCarousel';

interface MovieDetails {
  showId: string;
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
  const [recommendedMovies, setRecommendedMovies] = useState<MovieDetails[]>(
    []
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!showId) return;
        const data = await fetchSingle(showId);
        setMovie(data);

        const recData = await getRecommendations(showId);
        const recIds = [
          recData.rec1,
          recData.rec2,
          recData.rec3,
          recData.rec4,
          recData.rec5,
        ];

        const recDetails = await Promise.all(
          recIds.map((id) => fetchSingle(id))
        );

        setRecommendedMovies(recDetails);
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
      {/* <div className="details-container">
        <div>
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

          {recommendedMovies.length > 0 && (
            <>
              <h3 className="recommended-heading">You might also like</h3>
              <MovieCarousel
                movies={recommendedMovies.map((m) => ({
                  showId: m.showId,
                  title: m.title,
                  posterUrl: getPosterUrl(m.title), // assumes you have this helper
                }))}
              />
            </>
          )}
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
      </div> */}
      <div className="container details-container">
        <div className="row">
          {/* Left Column: Movie Info and Recommendations */}
          <div className="col-md-8">
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

            {recommendedMovies.length > 0 && (
              <div className="recommended-section mt-4">
                <h3 className="recommended-heading">You might also like</h3>
                <MovieCarousel
                  movies={recommendedMovies.map((m) => ({
                    showId: m.showId,
                    title: m.title,
                    posterUrl: getPosterUrl(m.title),
                  }))}
                />
              </div>
            )}
          </div>

          {/* Right Column: Poster */}
          <div className="col-md-4 d-flex align-items-start justify-content-center">
            <div className="poster-container">
              <img
                src={getPosterUrl(movie.title)}
                alt={`${movie.title} poster`}
                className="movie-poster img-fluid"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/logos/VerticalLogo.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
