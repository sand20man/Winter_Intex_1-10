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
                value={newMovie.title}
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
                    checked={newMovie.type === 'Movie'}
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
                    checked={newMovie.type === 'TV Show'}
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
                value={newMovie.director}
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
                      checked={newMovie[field as keyof Movie] === 1}
                      onChange={handleCheckboxChange}
                      className="me-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>

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
                value={newMovie.cast}
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
                value={newMovie.country}
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
                value={newMovie.releaseYear}
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
                value={newMovie.rating}
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
                value={newMovie.duration}
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
              value={newMovie.description}
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

          <button type="submit" className="btn btn-light">
            Add
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMovieForm;
