import React from 'react';

type Props = {
  onSearchSubmit: (query: string) => void;
  value: string;
  setValue: (val: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearchSubmit, value, setValue }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(value); // Send search value
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        required
        type="text"
        placeholder="Search..."
        className="navbar-search me-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
