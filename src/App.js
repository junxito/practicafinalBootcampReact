import React, { useState, useEffect } from 'react';
import TablaDatos from './components/TablaDatos';
import Buscador from './components/Buscador';
import './style.css';
import { useTheme } from './ThemeContext';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { isDarkMode, toggleDarkMode } = useTheme();

  const [showOnlyOver50, setShowOnlyOver50] = useState(false);

  // useEffect para recoger la lista de los 100 usuarios y sus datos de la api
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data.results);
      });
  }, []);

  // Handle para el filtrado del nombre, apellido o el correo electrónico
  const handleSearch = (query) => {
    const filteredData = usuarios.filter(
      (usuario) =>
        usuario.name.first.toLowerCase().includes(query.toLowerCase()) ||
        usuario.name.last.toLowerCase().includes(query.toLowerCase()) ||
        usuario.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsuarios(filteredData);
  };

  // Handle para el filtrado de los usuarios con edad mayor a 50 años
  const handleShowOnlyOver50Change = () => {
    setShowOnlyOver50(!showOnlyOver50);
  };

  // Lista de usuarios filtrados según si es por el buscador o por el checkbox de edad
  const filteredUsuarios = usuarios.filter((usuario) => {
    // En este if filtro la lista de usuarios por edad y descarto a los menores de 50 años
    if (showOnlyOver50 && usuario.dob.age <= 50) {
      return false;
    }
    // If que filtra por la query introducida en el buscador
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        usuario.name.first.toLowerCase().includes(query) ||
        usuario.name.last.toLowerCase().includes(query) ||
        usuario.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    // Class name que controla el valor botón de cambiar tema
    <div className={isDarkMode ? 'app dark-mode' : 'app'}>
      <Buscador onSearch={setSearchQuery} />
      <button className="button-blue" onClick={toggleDarkMode}>
        Cambiar tema
      </button>
      <label>
        Mostrar usuarios mayores de 50 años
        <input
          type="checkbox"
          checked={showOnlyOver50}
          onChange={handleShowOnlyOver50Change}
        />
      </label>
      <TablaDatos usuarios={filteredUsuarios} />
    </div>
  );
}

export default App;
