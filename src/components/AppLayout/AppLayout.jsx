import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HomeIcon } from '../Icons';
import { useCurrentUserProfile, useAccountDeleted } from '../../utils/hooks';
import './appLayout.css';

import { logout } from '../../state/actions/authActions';

const AppLayout = ({ children }) => {
  const { isUserConnected, user } = useCurrentUserProfile();

  useAccountDeleted();

  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark my-navbar">
        <Link className="navbar-brand my-brand" to="/">
          <h1>pronogeeks</h1>
        </Link>

        <button
          className="navbar-toggler my-navbar-btn"
          type="button"
          data-toggle="collapse"
          data-target="#my-navbar-toggle"
          aria-controls="my-navbar-toggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="my-navbar-toggle">
          <ul className="navbar-nav mt-2 mt-lg-0">
            {isUserConnected ? (
              <>
                <li className="nav-item  mobile-list-item">
                  <button className="nav-link navbar-btns" onClick={() => dispatch(logout())}>
                    Déconnexion
                  </button>
                </li>

                <li className="nav-item mobile-list-item">
                  <Link className="nav-link" to="/rules">
                    Règles du jeu
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/myGeekLeagues">
                    Mes ligues
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/pronogeeks/6106e0216c1986102d71752a">
                    Pronogeeks
                  </Link>
                </li>

                <li className="nav-item profile-pic-navbar-list-item">
                  <Link className="nav-link" to="/profile" style={{ fontSize: '1rem' }}>
                    <img className="profile-pic-navbar" src={user.photo} alt="pic" />
                  </Link>
                  <div className="profile-submenu">
                    <ul>
                      <li className="nav-item">
                        <Link to="/profile">Profil</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/rules">
                          Règles
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link navbar-btns" onClick={() => dispatch(logout())}>
                          Déconnexion
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Se connecter
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Créer un compte
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <HomeIcon className="bi bi-house-fill my-home-icon" />
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="my-content">{children}</div>

      {window.addEventListener('click', () => {
        if (document.querySelector('.navbar-collapse').classList.contains('show'))
          document.querySelector('.navbar-collapse').classList.remove('show');
      })}
    </>
  );
};

export default AppLayout;
