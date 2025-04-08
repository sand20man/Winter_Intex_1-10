import React, { useState } from 'react';

type Props = {
  onSearchSubmit: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearchSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchInput); // Only here do we pass it to MoviePage
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        required
        type="text"
        placeholder="Search..."
        className="navbar-search"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button type="submit">Enter</button>
    </form>
  );
};

export default SearchBar;
