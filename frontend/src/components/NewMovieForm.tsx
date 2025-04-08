import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie, getNextShowId } from '../api/MovieAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Top of NewMovieForm.tsx
const genreOptions = [
  { label: 'Action', field: 'action' },
  { label: 'Adventure', field: 'adventure' },
  {
    label: 'Anime Series International TV Shows',
    field: 'animeSeriesInternationalTvShows',
  },
  {
    label: 'British TV Shows Docuseries International TV Shows',
    field: 'britishTvShowsDocuseriesInternationalTvShows',
  },
  { label: 'Children', field: 'children' },
  { label: 'Comedies', field: 'comedies' },
  {
    label: 'Comedies Dramas International Movies',
    field: 'comediesDramasInternationalMovies',
  },
  {
    label: 'Comedies International Movies',
    field: 'comediesInternationalMovies',
  },
  { label: 'Comedies Romantic Movies', field: 'comediesRomanticMovies' },
  { label: 'Crime TV Shows Docuseries', field: 'crimeTvShowsDocuseries' },
  { label: 'Documentaries', field: 'documentaries' },
  {
    label: 'Documentaries International Movies',
    field: 'documentariesInternationalMovies',
  },
  { label: 'Docuseries', field: 'docuseries' },
  { label: 'Dramas', field: 'dramas' },
  { label: 'Dramas International Movies', field: 'dramasInternationalMovies' },
  { label: 'Dramas Romantic Movies', field: 'dramasRomanticMovies' },
  { label: 'Family Movies', field: 'familyMovies' },
  { label: 'Fantasy', field: 'fantasy' },
  { label: 'Horror Movies', field: 'horrorMovies' },
  {
    label: 'International Movies Thrillers',
    field: 'internationalMoviesThrillers',
  },
  {
    label: 'International TV Shows Romantic TV Shows TV Dramas',
    field: 'internationalTVShowsRomanticTVDramas',
  },
  { label: "Kids' TV", field: 'kidsTv' },
  { label: 'Language TV Shows', field: 'languageTvShows' },
  { label: 'Musicals', field: 'musicals' },
  { label: 'Nature TV', field: 'natureTv' },
  { label: 'Reality TV', field: 'realityTv' },
  { label: 'Spirituality', field: 'spirituality' },
  { label: 'TV Action', field: 'tvAction' },
  { label: 'TV Comedies', field: 'tvComedies' },
  { label: 'TV Dramas', field: 'tvDramas' },
  { label: 'Talk Shows TV Comedies', field: 'talkShowsTvComedies' },
  { label: 'Thrillers', field: 'thrillers' },
];

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    showId: '',
    title: '',
    type: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: 2024,
    rating: '',
    duration: '',
    description: '',
    genre: '',

    // All genres set to 0 by default
    action: 0,
    adventure: 0,
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comedies: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramas: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTVShowsRomanticTVDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  });

  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: checked ? 1 : 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newShowId = await getNextShowId();

    const selectedGenres = genreOptions
      .filter(({ field }) => newMovie[field as keyof Movie] === 1)
      .map(({ label }) => label);

    const movieToSubmit = {
      ...newMovie,
      showId: newShowId,
      genre: selectedGenres.join(', '),
    };

    await addMovie(movieToSubmit);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        name="title"
        value={newMovie.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="type"
        value={newMovie.type}
        onChange={handleChange}
        placeholder="Type"
      />
      <input
        name="director"
        value={newMovie.director}
        onChange={handleChange}
        placeholder="Director"
      />
      <input
        name="cast"
        value={newMovie.cast}
        onChange={handleChange}
        placeholder="Cast"
      />
      <input
        name="country"
        value={newMovie.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        name="releaseYear"
        type="number"
        value={newMovie.releaseYear}
        onChange={handleChange}
        placeholder="Year"
      />
      <input
        name="rating"
        value={newMovie.rating}
        onChange={handleChange}
        placeholder="Rating"
      />
      <input
        name="duration"
        value={newMovie.duration}
        onChange={handleChange}
        placeholder="Duration"
      />
      <textarea
        name="description"
        value={newMovie.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <div className="genre-dropdown-wrapper">
        <button
          type="button"
          className="admin-btn btn-add"
          onClick={() => setShowGenreDropdown((prev) => !prev)}
        >
          Select Genres
        </button>

        {showGenreDropdown && (
          <div className="genre-dropdown">
            {genreOptions.map(({ label, field }) => (
              <label key={field}>
                <input
                  type="checkbox"
                  name={field}
                  checked={newMovie[field as keyof Movie] === 1}
                  onChange={handleCheckboxChange}
                />
                {label}
              </label>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="admin-btn btn-add">
        Add
      </button>
      <button type="button" className="admin-btn btn-delete" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewMovieForm;
