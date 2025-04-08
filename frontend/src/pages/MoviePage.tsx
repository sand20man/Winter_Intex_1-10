// import { useEffect, useState } from 'react';
// import MovieCarousel from '../components/MovieCarousel';
// import Footer from '../components/Footer';
// import Navbar from '../components/NavBar';
// import { Movie } from '../types/Movie';
// import { fetchGenre, fetchSearch } from '../api/MovieAPI';
// import '../components/MovieCard.css';

// function MoviePage() {
//   const [searchQuery, setSearchQuery] = useState<string | null>(null);
//   const [searchResults, setSearchResult] = useState<Movie[]>([]);
//   const [genre, setGenre] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const searchMovies = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchSearch(searchQuery);
//         setSearchResult(data);
//       } catch (error) {
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     searchMovies();
//   }, [searchQuery]);

//   useEffect(() => {
//     const loadMovies = async () => {
//       // if (!searchQuery.trim()) return; // Don't search if it's empty
//       try {
//         setLoading(true);
//         const data = await fetchGenre('thrillers');
//         setGenre(data);
//       } catch (error) {
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMovies();
//   }, []);

//   if (loading) return <p>Loading projects... </p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <>
//       <Navbar onSearchChange={setSearchQuery} homePageBool={false} />

//       {searchQuery && searchQuery.trim() && searchResults.length > 0 ? (
//         <>
//           <h2 className="text-xl font-bold ml-4">Search Results</h2>
//           <MovieCarousel
//             movies={searchResults.map((m) => ({
//               showId: m.showId,
//               title: m.title,
//               posterUrl: `posters/${m.title}.jpg`,
//             }))}
//           />
//         </>
//       ) : (
//         <>
//           <h2 className="text-xl font-bold ml-4">Thrillers (Hardcoded)</h2>
//           <MovieCarousel
//             movies={genre.map((m) => ({
//               showId: m.showId,
//               title: m.title,
//               posterUrl: `/Movie Posters/${m.title}.jpg`,
//             }))}
//           />
//           <br />
//           <br />
//           <h2 className="category-heading">Recommender</h2>
//           <MovieCarousel
//             movies={genre.map((m) => ({
//               showId: m.showId,
//               title: m.title,
//               posterUrl: `/Movie Posters/${m.title}.jpg`,
//             }))}
//           />
//           <Footer />
//         </>
//       )}
//     </>
//   );
// }

// export default MoviePage;

import { useEffect, useState } from 'react';
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
} from '../api/MovieAPI';
import '../components/MovieCard.css';

function MoviePage() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResult] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<string[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  // Fetch recommendations
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        //TODO make this not static
        const userId = 1; // change this to dynamic user if needed
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

    loadRecommendations();
  }, []);

  // Fetch all genres once
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genres = await fetchAllGenres(); // returns array like ["Drama", "Comedy"]
        setGenreList(genres);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    loadGenres();
  }, []);

  // Fetch movies for each genre
  useEffect(() => {
    const loadMoviesByGenre = async () => {
      setLoading(true);
      try {
        const allGenreMovies: Record<string, Movie[]> = {};

        await Promise.all(
          genreList.map(async (genre) => {
            const movies = await fetchGenre(genre);
            allGenreMovies[genre] = movies;
          })
        );

        setGenreMovies(allGenreMovies);
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

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar onSearchChange={setSearchQuery} homePageBool={false} />

      {recommendedMovies.length > 0 && (
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
          {genreList.map((genre) => (
            <div key={genre}>
              <h2 className="text-xl font-bold ml-4">{genre}</h2>
              <MovieCarousel
                movies={(genreMovies[genre] || []).map((m) => ({
                  showId: m.showId,
                  title: m.title,
                  posterUrl: `/Movie Posters/${m.title}.jpg`,
                }))}
              />
              <br />
            </div>
          ))}
        </>
      )}
      <Footer />
    </>
  );
}

export default MoviePage;
