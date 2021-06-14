import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Loader, RankGeeks, ErrorMessage } from "../../components";
import { openNotification, appendPhoto } from "../../utils/helpers";
import {
  useSeasonPlayersRanking,
  useUser,
  useSeasonHistory,
} from "../../utils/hooks";
import { UsernameInput } from "../../utils/components";
import { EditIcon, WarningIcon } from "../../components/Icons";
import "./profile.css";

import {
  updateUsername,
  updatePhoto,
  deleteUserAccount,
  logout,
} from "../../state/actions/authActions";

const Profile = ({ loading }) => {
  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
  const [cloudinaryError, setCloudinaryError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [season, setSeason] = useState(null);

  const { user, isUserConnected } = useUser();

  const { loadingUsername, loadingPhoto } = useSelector(
    ({ authReducer }) => authReducer
  );

  const dispatch = useDispatch();

  const { seasonRanking, setSeasonRanking, errorRanking } =
    useSeasonPlayersRanking(season);

  const seasonFromUserHistory = useSeasonHistory();
  useEffect(() => {
    if (seasonFromUserHistory) {
      const season = seasonFromUserHistory.season;
      setSeason(season);
    } else setSeasonRanking([]);
  }, [seasonFromUserHistory, setSeasonRanking]);

  // TODO: Implement useForm
  const [usernameInput, setUsernameInput] = useState("");
  useEffect(() => {
    if (isUserConnected) {
      setUsernameInput(user.username);
    }
  }, [user, isUserConnected]);

  const photoLoader = loadingPhoto || cloudinaryLoading;

  const uploadPhoto = async (e) => {
    const photo = appendPhoto(e);
    if (photo) {
      setCloudinaryLoading(true);
      const {
        data: { secure_url },
      } = await axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, photo)
        .catch(() => {
          setCloudinaryError(true);
          setCloudinaryLoading(false);
          openNotification(
            "error",
            "Une erreur a eu lieu lors de l'import de la photo. Merci de réessayer."
          );
        });
      if (!cloudinaryError) {
        dispatch(updatePhoto(secure_url));
        setCloudinaryLoading(false);
      }
    }
  };

  const saveUsername = () => {
    setShowModal(false);
    dispatch(updateUsername(usernameInput));
  };

  const removeAccount = () => {
    dispatch(logout());
    dispatch(deleteUserAccount());
  };

  const setRank = (num) => {
    if (num === 1) return "1er(e)";
    else if (num === 0) return "_";
    else return `${num}ème`;
  };

  const defineUserRank = (seasonRanking, geekLeague) => {
    return (
      seasonRanking
        .filter(({ _id }) => geekLeague.geeks.includes(_id))
        .map((player) => player._id)
        .indexOf(user._id) + 1
    );
  };

  const printEditIcon = () =>
    loadingUsername ? (
      <Loader container={false} tip="" fontSize="2.5rem" />
    ) : (
      <button onClick={() => setShowModal(!showModal)}>
        <EditIcon />
      </button>
    );

  return loading ? (
    <div className="my-profile-page">
      <Loader />
    </div>
  ) : (
    <div className="my-profile-page row">
      <div className="my-profile col-10 offset-1 col-lg-4">
        <section className="about-section">
          <h2>
            Bonjour {user.username}
            {printEditIcon()}
          </h2>

          <div className="profile-details">
            <div className="profile-picture-container">
              {!photoLoader && (
                <img
                  src={user.photo}
                  alt="Profile pic"
                  className="profile-pic"
                />
              )}

              {photoLoader && (
                <div className="profile-pic">
                  <Loader
                    container={false}
                    size="medium"
                    tip="Chargement de la photo..."
                    tipSize="1rem"
                    color="rgb(26, 145, 254)"
                    fontSize="2rem"
                  />
                </div>
              )}

              <label className="first-file-label" htmlFor="profile-pic-input">
                Changer de photo de profil :
              </label>

              <div className="custom-file">
                <label
                  className="profile-image custom-file-label"
                  htmlFor="profile-pic-input"
                >
                  Charger une photo
                  <input
                    id="profile-pic-input"
                    type="file"
                    name="image"
                    className="custom-file-input"
                    onChange={uploadPhoto}
                  />
                </label>
              </div>
            </div>

            {seasonFromUserHistory && seasonFromUserHistory.favTeam && (
              <div className="favteam-info">
                <div>
                  <img
                    src={seasonFromUserHistory.favTeam.logo}
                    alt="Logo équipe de coeur"
                  />
                </div>

                <h5>
                  {seasonFromUserHistory.favTeam.name} est ton équipe de coeur
                  <br />
                  pour la saison {seasonFromUserHistory.season.year} de{" "}
                  {seasonFromUserHistory.season.leagueName}.
                </h5>
              </div>
            )}
          </div>
        </section>

        <section className="geekleagues-section">
          <h2>Ligues Geek</h2>

          <Link to="/myGeekLeagues/new" className="btn my-btn new-league">
            Nouvelle ligue
          </Link>

          {user.geekLeagues.length > 0 && (
            <ul className="list-group list-group-flush geekleagues-list-profile mt-4">
              {errorRanking ? (
                <ErrorMessage>{errorRanking}</ErrorMessage>
              ) : !seasonRanking ? (
                <div className="pt-4">
                  <Loader tip="Chargement des ligues..." container={false} />
                </div>
              ) : (
                <>
                  <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
                    <span className="username-ranking">
                      <b>Ligues</b>
                    </span>
                    <span className="username-ranking">
                      <b>Classement</b>
                    </span>
                  </li>

                  {user.geekLeagues.map((league) => (
                    <Link to={`/myGeekLeagues/${league._id}`} key={league._id}>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span
                          className="username-ranking"
                          style={{ color: "rgb(4, 78, 199)" }}
                        >
                          {league.name}
                        </span>
                        <span className="badge badge-success badge-pill my-badge my-badge-ranking my-badge-ranking-header">
                          {setRank(defineUserRank(seasonRanking, league))} /{" "}
                          {league.geeks.length}
                        </span>
                      </li>
                    </Link>
                  ))}
                </>
              )}
            </ul>
          )}
        </section>
      </div>

      <div
        className="col-10 offset-1 col-lg-4 offset-lg-2"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {season && (
          <section className="my-profile-ranking pt-4">
            <h2 style={{ marginTop: 0 }}>
              {season.leagueName} saison {season.year}
              <br />
              Classement général
            </h2>

            {errorRanking ? (
              <ErrorMessage>{errorRanking}</ErrorMessage>
            ) : !seasonRanking.length ? (
              <Loader tip="Chargement du classement..." container={false} />
            ) : (
              <RankGeeks
                players={seasonRanking}
                seasonID={season._id}
                generalRanking
              />
            )}
          </section>
        )}

        <div className="delete-account">
          <button
            onClick={() => setDeleteAccount(!deleteAccount)}
            className="btn my-btn delete-account-btn"
          >
            Supprimer compte
          </button>
        </div>
      </div>

      {showModal && (
        <div
          id="update-username-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="update-username-modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Changer de pseudo :</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <UsernameInput
                  value={usernameInput}
                  onChange={setUsernameInput}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="my-btn close"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>

                <button
                  type="button"
                  className="my-btn save"
                  onClick={saveUsername}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteAccount && (
        <div
          id="delete-account-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="delete-account-modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Supprimer mon compte</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setDeleteAccount(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <p>
                  <WarningIcon />
                  Es-tu sûr de vouloir supprimer ton compte ? Toutes tes données
                  seront perdues...
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="my-btn close-delete"
                  onClick={() => setDeleteAccount(false)}
                >
                  Annuler
                </button>

                <button
                  type="button"
                  className="my-btn delete-account-btn"
                  onClick={removeAccount}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
