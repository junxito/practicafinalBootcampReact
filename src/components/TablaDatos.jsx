import React, { useState, useEffect } from 'react';

function TablaDatos({ usuarios }) {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electrónico</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.name.first}</td>
              <td>{usuario.name.last}</td>
              <td>{usuario.email}</td>
              <td>{usuario.dob.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;
