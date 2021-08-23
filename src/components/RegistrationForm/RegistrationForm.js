import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { withRouter, useHistory } from 'react-router-dom';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

function RegistrationForm(props) {
  const history = useHistory();
  if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
    history.push('/home');
  }
  const [state, setState] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    confirmPassword: '',
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const redirectToHome = () => {
    props.updateTitle('Home');
    props.history.push('/home');
  };
  const redirectToLogin = () => {
    props.updateTitle('Login');
    props.history.push('/login');
  };
  const sendDetailsToServer = () => {
    if (state.username.length && state.password.length) {
      props.showError(null);
      const payload = {
        username: state.username,
        password: state.password,
        lastName: state.lastName,
        firstName: state.firstName,
        email: state.email,
        telefono: state.telefono,
      };
      axios
        .post(`${API_BASE_URL}/auth/register`, payload)
        .then((response) => {
          if (response.status === 201) {
            setState((prevState) => ({
              ...prevState,
              successMessage: 'Registration successful. Redirecting to home page..',
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
            props.showError(null);
          } else {
            props.showError('Some error ocurred');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.showError('Please enter valid username and password');
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError('Passwords do not match');
    }
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center p-4">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputUsuario1">Usuario</label>
          <input
            type="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Nombre de usuario"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="********"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputUsuario1">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="usernameHelp"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputNombre1">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            aria-describedby="usernameHelp"
            placeholder="Nombre"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputNombre1">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="usernameHelp"
            placeholder="Apellido"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputNombre1">Telefono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            aria-describedby="usernameHelp"
            placeholder="Telefono"
            value={state.telefono}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
          Registrarse
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Ya tiene una cuenta? </span>
        <span className="loginText" onClick={() => redirectToLogin()} aria-hidden="true">
          Ingresar aqui
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
