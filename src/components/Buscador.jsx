import React, { useState } from 'react';

function Buscador({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="buscador-container">
      <input
        className="input-field"
        type="text"
        placeholder="Buscar por nombre, apellido o correo"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="button-blue" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default Buscador;
