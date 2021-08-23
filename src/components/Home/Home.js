import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Home.css';

const API_URL = process.env.REACT_APP_SERVER_URL;

const Home = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const HEADERS = {
        'x-access-token': localStorage.getItem(ACCESS_TOKEN_NAME),
      };
      const query = await axios
        .get(`${API_URL}/api/v1/users`, { headers: HEADERS })
        .then((response) => setUserList(response.data.users))
        .catch((error) => {
          throw error;
        });

      return query;
    };
    getProducts();
  }, []);

  return (
    <div className="mt-2">
      <h2>Bienvenido a la pagina principal</h2>
      <h5>
        Si esta viendo este contenido es porque se encuentra correctamente logueado en el sistema
      </h5>
      {userList.length > 0 ? (
        <table className="mt-5  ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Telefono</th>
            </tr>
          </thead>

          <tbody>
            {userList.length > 0 &&
              userList.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Nombre">{user.firstName || '------'}</td>
                  <td data-label="Apellido">{user.lastName || '------'}</td>
                  <td data-label="Email">{user.email || '------'}</td>
                  <td data-label="Telefono">{user.telefono || '------'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-5">
          No se encontraron usuarios, compruebe si tiene conexion con el servidor. Compruebe si
          tiene usuarios cargados en la base de datos
        </div>
      )}
    </div>
  );
};

export default withRouter(Home);
