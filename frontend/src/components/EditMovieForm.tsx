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
      .map(({ label }) => label)
      .join(', ');

    await updateMovie(formData.showId, {
      ...formData,
      genre: selectedGenres,
    });

    onSuccess();
  };

  return (
    <div
      className="form-wrapper mb-4"
      style={{
        backgroundColor: '#2a2a2a',
        border: '1px solid #444',
        borderRadius: '12px',
        padding: '1.5rem',
      }}
    >
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="row g-3 mb-3">
          {/* Title */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="title"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Title:
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Type - Radio */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                Type:
              </label>
              <div className="d-flex flex-wrap gap-5">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeMovie"
                    value="Movie"
                    checked={formData.type === 'Movie'}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label text-light ms-1"
                    htmlFor="typeMovie"
                  >
                    Movie
                  </label>
                </div>
                <div className="form-check mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeTV"
                    value="TV Show"
                    checked={formData.type === 'TV Show'}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label text-light ms-1"
                    htmlFor="typeTV"
                  >
                    TV Show
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Director */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="director"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Director:
              </label>
              <input
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Genres */}
          <div className="col-md-3" style={{ position: 'relative' }}>
            <div className="d-flex align-items-center">
              <label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                Genres:
              </label>
              <button
                type="button"
                className="btn btn-outline-light w-100 text-start"
                onClick={() => setShowGenreDropdown((prev) => !prev)}
              >
                Select Genres
              </button>
            </div>

            {showGenreDropdown && (
              <div className="genre-dropdown">
                {genreOptions.map(({ label, field }) => (
                  <label key={field} className="d-block mb-1">
                    <input
                      type="checkbox"
                      name={field}
                      checked={formData[field as keyof Movie] === 1}
                      onChange={handleCheckboxChange}
                      className="me-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cast */}
          <div className="col-md-12">
            <div className="d-flex align-items-center">
              <label
                htmlFor="cast"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Cast:
              </label>
              <input
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Country */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="country"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Country:
              </label>
              <input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Year */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="releaseYear"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Year:
              </label>
              <input
                id="releaseYear"
                name="releaseYear"
                type="number"
                value={formData.releaseYear}
                onChange={handleChange}
                placeholder="Year"
                autoComplete="off"
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="rating"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Rating:
              </label>
              <input
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label
                htmlFor="duration"
                className="me-2 mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                Duration:
              </label>
              <input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-control"
                placeholder="ex. 120 min"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid white',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="col-12">
            <label
              htmlFor="description"
              className="form-label"
              style={{ textAlign: 'left', display: 'block' }}
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={3}
              style={{
                backgroundColor: '#2a2a2a',
                color: '#fff',
                border: '1px solid white',
              }}
            />
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-light">
            Save Changes
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
