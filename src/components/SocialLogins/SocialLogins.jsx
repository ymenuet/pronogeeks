import React from 'react';
import { Link } from 'react-router-dom';
import './socialLogins.css';

const SocialLogins = ({ login, home }) => {
  return (
    <>
      <div className="social-logins">
        <h4>{login ? 'Se connecter avec :' : 'Créer un compte avec :'}</h4>

        <div className="social-login-links">
          <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/facebook`}>
            <img src="/images/facebook-logo.png" alt="Facebook" />
          </a>
          <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/google`}>
            <img src="/images/google-logo.png" alt="Google" />
          </a>
        </div>
      </div>

      {!home && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {login ? (
            <p className="reset-pwd">
              Ou crée un compte <Link to="/signup">ici</Link>.
            </p>
          ) : (
            <p className="reset-pwd">
              Tu as déjà un compte ?<br />
              Connecte-toi <Link to="/login">ici</Link>.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default SocialLogins;
