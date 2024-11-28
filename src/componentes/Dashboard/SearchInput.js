import React, { useState } from 'react';

export function SearchInput({ isOpen, onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value); // Llamar a la función de búsqueda pasada desde el padre
  };

  return (
    <div className="input-search">
      <i className="bx bx-search"></i>
      {isOpen && (
        <input
          type="text"
          className="input"
          placeholder="Buscar"
          value={searchText}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}
