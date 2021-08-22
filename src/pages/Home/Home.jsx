import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SocialLogins, Loader } from '../../components';
import './home.css';

const Home = ({ loadingUser }) => {
  return (
    <div className="my-content-homepage">
      {loadingUser ? (
        <Loader tip="Chargement..." color="rgb(4, 78, 199)" />
      ) : (
        <div className="row">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
            <div className="home-div">
              <div>
                <h2>
                  Bienvenue sur
                  <br />
                  <img className="logo-homepage" src="/images/logo-blue-home.png" alt="Logo" />
                </h2>

                <p className="home-message">
                  Mesure-toi aux maîtres geeks des pronostics de Ligue 1<br />
                  et deviens expert pronogeekeur !
                </p>
              </div>

              <div className="home-register">
                <Link className="btn my-btn login-btn" to="/login">
                  Se connecter
                </Link>

                <Link className="btn my-btn signup-btn" to="/signup">
                  Créer un compte
                </Link>
              </div>

              <SocialLogins login home />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Home.defaultProps = {
  loadingUser: false,
};

Home.propTypes = {
  loadingUser: PropTypes.bool,
};

export default Home;
