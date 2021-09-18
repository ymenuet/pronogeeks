import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ErrorMessage, Loader } from '../../components';
import { useUserGeekLeagues } from '../../utils/hooks';
import './geekleagues.css';

const AllGeekLeagues = ({ loading }) => {
  const { userGeekLeagues, errorGeekLeagues } = useUserGeekLeagues();

  return (
    <div className="geekleague-bg geekleagues-list">
      {(!userGeekLeagues && !errorGeekLeagues) || loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h2>Mes Ligues Geek</h2>

          {errorGeekLeagues ? (
            <ErrorMessage>{errorGeekLeagues}</ErrorMessage>
          ) : (
            <>
              <div className="my-geekleagues row">
                {userGeekLeagues.reverse().map((geekLeague) => (
                  <div key={geekLeague._id} className="col-10 col-lg-6 geekleague-card-container">
                    <div className="geekleague-card">
                      <h4>{geekLeague.name}</h4>

                      <h5>{`${geekLeague.season.leagueName} - ${geekLeague.season.year}`}</h5>

                      <p>
                        Créée par {geekLeague.creator.username} en{' '}
                        {new Date(geekLeague.createdAt).getMonth() + 1 > 9
                          ? new Date(geekLeague.createdAt).getMonth() + 1
                          : `0${new Date(geekLeague.createdAt).getMonth() + 1}`}
                        /{new Date(geekLeague.createdAt).getFullYear()}
                      </p>

                      <Link
                        to={`/myGeekLeagues/${geekLeague._id}`}
                        className="btn my-btn new-league geekleagues-page-btn"
                      >
                        Voir le détail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/myGeekLeagues/new" className="btn my-btn new-league geekleagues-page-btn">
                Créer une ligue
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

AllGeekLeagues.defaultProps = {
  loading: false,
};

AllGeekLeagues.propTypes = {
  loading: PropTypes.bool,
};

export default AllGeekLeagues;
