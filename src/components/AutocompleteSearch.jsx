import { useState } from 'react';

export default function AutocompleteSearch({ allDoctors, onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const matches = allDoctors
        .filter((doc) => doc.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (name) => {
    setQuery(name);
    setSuggestions([]);
    onSearch(name);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <input
        className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
        data-testid="autocomplete-input"
        value={query}
        onChange={handleInputChange}
        placeholder="Search doctor by name"
      />
      <ul className="bg-white border rounded shadow-md mt-1">
        {suggestions.map((sug, idx) => (
          <li
            key={idx}
            data-testid="suggestion-item"
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(sug.name)}
          >
            {sug.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
