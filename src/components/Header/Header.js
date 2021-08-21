import React from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    props.history.push('/login');
  }

  let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length));
  if (props.location.pathname === '/') {
    title = 'CURSO NODE - CLASE FINAL';
  }

  function renderLogout() {
    if (props.location.pathname === '/home') {
      return (
        <div className="ml-auto">
          <button type="button" className="btn btn-danger" onClick={() => handleLogout()}>
            SALIR
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{props.title || title}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
