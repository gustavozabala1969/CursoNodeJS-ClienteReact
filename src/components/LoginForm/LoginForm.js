/* eslint-disable no-debugger */
import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter, useHistory } from 'react-router-dom';
import { API_BASE_URL, ACCESS_TOKEN_NAME, USERNAME, ID_USER } from '../../constants/apiConstants';

function LoginForm(props) {
  const history = useHistory();

  if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
    history.push('/home');
  }

  const [state, setState] = useState({
    username: '',
    password: '',
    successMessage: null,
  });

  const redirectToHome = () => {
    props.updateTitle('Inicio');
    props.history.push('/home');
  };
  const redirectToRegister = () => {
    props.history.push('/register');
    props.updateTitle('Registro');
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password,
    };

    axios
      .post(`${API_BASE_URL}/auth/login`, payload)
      .then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: 'Login successful. Redirecting to home page..',
          }));
          localStorage.setItem(ID_USER, response.data.id);
          localStorage.setItem(USERNAME, response.data.username);
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          props.showError(null);
          redirectToHome();
        }
      })
      .catch(() => {
        props.showError('Usuario o Contraseña incorrectos ');
      });
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label>Usuario</label>
          <input
            type="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check" />
        <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
          Ingresar
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>No tienes una cuenta? </span>
        <span className="loginText" onClick={() => redirectToRegister()} aria-hidden="true">
          Registrarse
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
