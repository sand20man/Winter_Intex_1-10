import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import PrivacyPolicy from '../components/PrivacyPolicy';
import { Movie } from '../types/Movie';
import { fetchGenre, fetchSearch } from '../api/MovieAPI';

function PrivacyPage() {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [_searchResults, setSearchResult] = useState<Movie[]>([]);
  const [_genre, setGenre] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchSearch(searchQuery ?? null);
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
      <Navbar onSearchChange={(q) => setSearchQuery(q ?? '')} />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

export default PrivacyPage;
