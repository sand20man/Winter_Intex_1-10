import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import Footer from '../components/Footer';
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
  
      {/* Example featured movie card — you can use movies[0] or a hardcoded one */}
      <MovieCard
        showId={movies[0]?.showId || 'default-id'}
        title={movies[0]?.title || 'The Incredibles 2'}
        posterUrl={`/posters/${movies[0]?.title || 'The Incredibles 2'}.jpg`}
      />
  
      {/* Carousel of mapped movies */}
      <MovieCarousel
        movies={movies.map((m) => ({
          showId: m.showId,
          title: m.title,
          posterUrl: `/posters/${m.title}.jpg`,
        }))}
      />
  
      <Footer />
    </>
  );
  
}

export default MoviePage;
