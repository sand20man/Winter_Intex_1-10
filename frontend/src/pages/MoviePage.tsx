import { useEffect, useRef, useState } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Movie } from '../types/Movie';
import {
  fetchGenre,
  fetchSearch,
  fetchAllGenres,
  getPosterUrl,
  getUserRecommendations,
  fetchSingle,
  fetchCurrentUser,
} from '../api/MovieAPI';
import '../components/MovieCard.css';
import GenreFilter from '../components/GenreFilter';

function MoviePage() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResult] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<string[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [genreLoadedCounts, setGenreLoadedCounts] = useState<
    Record<string, number>
  >({});
  const genreInFlightRef = useRef<Record<string, boolean>>({});

  // Fetch recommendations
  // Fetch all genres once
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Get user info from backend
        console.log('Attempting to fetch current user');
        const user = await fetchCurrentUser();
        console.log('User fetched');
        const userId = user.userId;
        console.log(`Typeof userId: ${typeof userId}`);
        console.log(`UserId after fetch: ${userId}`);

        const recData = await getUserRecommendations(userId);
        const recIds = [
          recData.rec1,
          recData.rec2,
          recData.rec3,
          recData.rec4,
          recData.rec5,
          recData.rec6,
          recData.rec7,
          recData.rec8,
          recData.rec9,
          recData.rec10,
          recData.rec11,
          recData.rec12,
          recData.rec13,
          recData.rec14,
          recData.rec15,
          recData.rec16,
          recData.rec17,
          recData.rec18,
          recData.rec19,
          recData.rec20,
        ];

        const recDetails = await Promise.all(
          recIds.map((id) => fetchSingle(id))
        );
        setRecommendedMovies(recDetails);
      } catch (error) {
        console.error('Failed to load recommendations', error);
      }
    };

    const loadGenres = async () => {
      try {
        const genres = await fetchAllGenres(); // returns array like ["Drama", "Comedy"]
        setGenreList(genres);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    loadRecommendations();
    loadGenres();
  }, []);

  // Fetch movies for each genre
  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    const loadMoviesByGenre = async () => {
      setLoading(true);
      try {
        const allGenreMovies: Record<string, Movie[]> = {};

        await Promise.all(
          genreList.map(async (genre) => {
            const movies = await fetchGenre(genre);
            allGenreMovies[genre] = movies;
            initialCounts[genre] = movies.length;
          })
        );

        setGenreMovies(allGenreMovies);
        setGenreLoadedCounts(initialCounts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (genreList.length > 0) loadMoviesByGenre();
  }, [genreList]);

  // Handle search
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

    if (searchQuery && searchQuery.trim()) {
      searchMovies();
    }
  }, [searchQuery]);

  const handleGenreScroll = async (genre: string) => {
    if (genreInFlightRef.current[genre]) {
      return; // Skip if already loading
    }

    genreInFlightRef.current[genre] = true;

    const alreadyLoaded = genreLoadedCounts[genre] || 0;
    console.log(`Fetching more movies for ${genre}, skip=${alreadyLoaded}`);

    try {
      const newMovies = await fetchGenre(genre, alreadyLoaded);

      if (newMovies.length === 0) {
        console.log(`No more movies to load for genre: ${genre}`);
        return;
      }

      setGenreMovies((prev) => ({
        ...prev,
        [genre]: [...(prev[genre] || []), ...newMovies],
      }));

      setGenreLoadedCounts((prev) => ({
        ...prev,
        [genre]: alreadyLoaded + newMovies.length,
      }));
    } catch (error) {
      console.error(`Failed to load more movies for ${genre}`, error);
    } finally {
      genreInFlightRef.current[genre] = false;
    }
  };

  const handleHomeClick = () => {
    setSearchQuery(null);
    setSearchResult([]);
    setSelectedGenre(null);
    setSearchInput('');
    setShowSearch(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-neutral-900 text-white">
        <p className="text-lg">Loading movies...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar
        onSearchChange={setSearchQuery}
        homePageBool={false}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onHomeClick={handleHomeClick}
      />
      <GenreFilter onGenreSelect={setSelectedGenre} />

      {!searchQuery && !selectedGenre && recommendedMovies.length > 0 && (
        <>
          <h2 className="text-xl font-bold ml-4 mt-6">
            Recommended for You Based on Movies You've Rated
          </h2>
          <MovieCarousel
            movies={recommendedMovies.map((m) => ({
              showId: m.showId,
              title: m.title,
              posterUrl: getPosterUrl(m.title),
            }))}
          />
          <br />
        </>
      )}

      {searchQuery && searchQuery.trim() && searchResults.length > 0 ? (
        <>
          <div className="flex justify-end mr-4 mt-2">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => {
                setSearchQuery(null);
                setSearchResult([]);
              }}
            >
              Clear Search
            </button>
          </div>
          <h2 className="text-xl font-bold ml-4">Search Results</h2>
          <MovieCarousel
            movies={searchResults.map((m) => ({
              showId: m.showId,
              title: m.title,
              posterUrl: getPosterUrl(m.title),
            }))}
          />
        </>
      ) : (
        <>
          {selectedGenre ? (
            <div key={selectedGenre}>
              <h2 className="text-xl font-bold ml-4">{selectedGenre}</h2>
              <MovieCarousel
                movies={(genreMovies[selectedGenre] || []).map((m) => ({
                  showId: m.showId,
                  title: m.title,
                  posterUrl: `/Movie Posters/${m.title}.jpg`,
                }))}
              />
              <div className="flex justify-end mr-4 mt-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={() => setSelectedGenre(null)}
                >
                  Show All Genres
                </button>
              </div>
            </div>
          ) : (
            genreList.map((genre) => (
              <div key={genre}>
                <h2 className="text-xl font-bold ml-4">{genre}</h2>
                <MovieCarousel
                  movies={(genreMovies[genre] || []).map((m) => ({
                    showId: m.showId,
                    title: m.title,
                    posterUrl: `/Movie Posters/${m.title}.jpg`,
                  }))}
                  genre={genre} // only for genre carousels
                  onEndReached={handleGenreScroll}
                />
                <br />
              </div>
            ))
          )}
        </>
      )}
      <Footer />
    </>
  );
}

export default MoviePage;
