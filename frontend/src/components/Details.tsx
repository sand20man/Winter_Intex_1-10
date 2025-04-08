import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingle } from '../api/MovieAPI';
import NavBar from './NavBar';

interface MovieDetails {
  title: string;
  director: string;
  cast: string;
  description: string;
  rating: string;
  releaseYear: number;
  url: string;
  // Add other fields as needed
}

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <h2>
          {movie.title} ({movie.releaseYear})
        </h2>
        <p>
          <strong>Directed by:</strong> {movie.director}
        </p>
        <p>
          <strong>Cast:</strong> {movie.cast}
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
        <p>{movie.description}</p>
      </div>
    </>
  );
};

export default Details;
