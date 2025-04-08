import { useEffect, useState } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Movie } from '../types/Movie';
import { fetchGenre, fetchSearch } from '../api/MovieAPI';

function MoviePage() {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchResults, setSearchResult] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchSearch(searchQuery);
        setSearchResult(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [searchQuery]);

  useEffect(() => {
    const loadMovies = async () => {
      // if (!searchQuery.trim()) return; // Don't search if it's empty
      try {
        setLoading(true);
        const data = await fetchGenre('thrillers');
        setGenre(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) return <p>Loading projects... </p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar onSearchChange={setSearchQuery} />
      <h2 className="text-xl font-bold ml-4">Search Results</h2>
      <MovieCarousel
        movies={searchResults.map((m) => ({
          showId: m.showId, // or use a real unique ID if available
          title: m.title,
          posterUrl: `posters/${m.title}.jpg`,
        }))}
      />
      <br />
      <h2 className="text-xl font-bold ml-4">Thrillers (HardCoded)</h2>
      <MovieCarousel
        movies={genre.map((m) => ({
          showId: m.showId,
          title: m.title,
          posterUrl: `/Movie Posters/${m.title}.jpg`,
        }))}
      />
      <Footer />
    </>
  );
}

export default MoviePage;
