import React, { useEffect, useState } from 'react';
import { fetchAllGenres } from '../api/MovieAPI';

interface GenreFilterProps {
  onGenreSelect: (genre: string | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchAllGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    loadGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value === '' ? null : value);
    onGenreSelect(value === '' ? null : value);
  };

  return (
    <div className="p-2">
      <label htmlFor="genre-select" className="block mb-1 font-medium">
        Filter by Genre
      </label>
      <select
        id="genre-select"
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedGenre ?? ''}
        onChange={handleChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre, idx) => (
          <option key={idx} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
