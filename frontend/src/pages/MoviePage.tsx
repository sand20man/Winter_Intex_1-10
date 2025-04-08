import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import Navbar from '../components/NavBar';
import { Movie } from '../types/Movie';
import { fetchSearch } from '../api/MovieAPI';

function MoviePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchSearch('angry');
        setMovies(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchQuery]);

  if (loading) return <p>Loading projects... </p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar onSearchChange={setSearchQuery} />
      <MovieCard
        title={'The Incredibles 2'}
        posterUrl={'./posters/The Incredibles 2.jpg'}
      />
      <MovieCarousel movies={movies} />
    </>
  );
}

export default MoviePage;
