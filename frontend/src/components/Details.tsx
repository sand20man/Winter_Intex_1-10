import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchCurrentUser,
  fetchSingle,
  fetchUserRating,
  getContentRecommendations,
  getPosterUrl,
  getRecommendations,
  submitUserRating,
} from '../api/MovieAPI';
import NavBar from './NavBar';
import './Details.css';
import MovieCarousel from './MovieCarousel';
import StarRating from './StarRating';

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
  const [contentRecommended, setContentRecommended] = useState<MovieDetails[]>(
    []
  );
  const [userRating, setUserRating] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);


  const handleRating = async (newRating: number) => {
    setUserRating(newRating); // optimistic UI update

    try {
      // // Get user info from backend
      // const user = await fetchCurrentUser();
      // // const rating = await fetchUserRating(showId!, user.userId);
      // const rating = await fetchUserRating('s4634', 2);
      // console.log("Rating api returns", rating)
      // setUserRating(rating);

      // const userId = user.userId;

      await submitUserRating(showId!, userId!, newRating);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      // Optionally rollback or show toast
    }
  };

  useEffect(() => {
    if (!showId) return;

    const fetchMovieDetails = async () => {
      try {
        const movieData = await fetchSingle(showId);
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to fetch the movie', error);
      }

      try {
        setRecommendedMovies([]); // optional but helps UI reset
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
      } catch (error) {
        console.error('Collaborative Filter Recommender issue', error);
      }

      try {
        const contentRecData = await getContentRecommendations(showId);
        const contentRecIds = Object.entries(contentRecData)
          .filter(([key]) => key.startsWith('rec'))
          .map(([, value]) => value as string);

        const contentDetails = await Promise.all(
          contentRecIds.map(
            (id) => fetchSingle(id).catch(() => null) // silently skip any failed fetches
          )
        );

        setContentRecommended(contentDetails.filter((m) => m !== null));
      } catch (error) {
        console.error('Content Filter Recommender issue', error);
      }
      try {
        const user = await fetchCurrentUser();
        setUserId(user.userId)
        const rating = await fetchUserRating(showId!, user.userId);
        // const rating = await fetchUserRating('s4634', 2);
        setUserRating(rating);
      } catch (error) {
        console.error('Failed to fetch user rating:', error);
      }
    };

    fetchMovieDetails();
  }, [showId]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <NavBar
        onSearchChange={() => {}}
        showSearch={false}
        setShowSearch={() => {}}
        searchInput=""
        setSearchInput={() => {}}
      />
      <div className="container details-container">
        {/* Movie Details & Poster */}
        <div className="row h-100">
          {/* Left Column */}
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

            {/* Collaborative Carousel */}
            {recommendedMovies.length > 0 && (
              <div className="recommended-section mt-4">
                <h3 className="recommended-heading">
                  Others who watched <strong>{movie.title}</strong>
                </h3>
                <MovieCarousel
                  key={showId}
                  movies={recommendedMovies.map((m) => ({
                    showId: m.showId,
                    title: m.title,
                    posterUrl: getPosterUrl(m.title),
                  }))}
                />
              </div>
            )}
          </div>
          {/* Right Column: Poster + Star Rating */}

          <div className="col-md-4 h-100">
            <div className="poster-container">
              <img
                src={getPosterUrl(movie.title)}
                alt={`${movie.title} poster`}
                className="main-poster"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/logos/VerticalLogo.png';
                }}
              />
              <div className="star-rating-wrapper">
                <br />
                <h6>Rate This Movie</h6>
                <StarRating
                  rating={userRating} // this will come from state or API
                  onRate={handleRating} // call your backend
                />
              </div>
            </div>
          </div>
        </div>
        {/* Content-Based Carousel - Outside the previous row */}
        {contentRecommended.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="recommended-section mt-4">
                <h3 className="recommended-heading">
                  Movies similar to {movie.title}
                </h3>
                <MovieCarousel
                  movies={contentRecommended.map((m) => ({
                    showId: m.showId,
                    title: m.title,
                    posterUrl: getPosterUrl(m.title),
                  }))}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
