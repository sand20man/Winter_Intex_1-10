import { useState } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MovieAPI';

interface EditMovieFormProps {
  movie: Movie;
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

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked ? 1 : 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedGenres = genreOptions
      .filter(({ field }) => formData[field as keyof Movie] === 1)
      .map(({ label }) => label);

    const movieToSubmit = {
      ...formData,
      genre: selectedGenres.join(', '),
    };

    await updateMovie(formData.showId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
      />
      <input
        name="director"
        value={formData.director}
        onChange={handleChange}
        placeholder="Director"
      />
      <input
        name="cast"
        value={formData.cast}
        onChange={handleChange}
        placeholder="Cast"
      />
      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        name="releaseYear"
        type="number"
        value={formData.releaseYear}
        onChange={handleChange}
        placeholder="Year"
      />
      <input
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
      />
      <input
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration"
      />
      <textarea
        name="description"
        value={formData.description}
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
                  checked={formData[field as keyof Movie] === 1}
                  onChange={handleCheckboxChange}
                />
                {label}
              </label>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="admin-btn btn-add">
        Edit
      </button>
      <button type="button" className="admin-btn btn-delete" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditMovieForm;
