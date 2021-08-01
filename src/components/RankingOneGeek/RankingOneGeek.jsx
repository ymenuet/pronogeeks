import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CorrectIcon,
  ExactIcon,
  FavTeamIcon,
  ViewPronoIcon,
  FirstIcon,
  SecondIcon,
  ThirdIcon,
} from "../Icons";
import {
  getUserSeasonFromProfile,
  getUserMatchweekFromProfile,
} from "../../utils/helpers";
import "./rankingOneGeek.css";

const iconSize = "20px";

const RankingOneGeek = ({ user, geek, rank, seasonID, matchweek, header }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPronos, setCorrectPronos] = useState(0);
  const [exactPronos, setExactPronos] = useState(0);
  const [favTeamBonus, setFavTeamBonus] = useState(false);
  const [favTeam, setFavTeam] = useState(null);

  useEffect(() => {
    const geekSeason = getUserSeasonFromProfile(geek, seasonID);

    if (geekSeason) {
      setFavTeam(geekSeason.favTeam);

      const geekMatchweek =
        matchweek && getUserMatchweekFromProfile(geekSeason, matchweek);

      if (geekMatchweek) {
        setTotalPoints(geekMatchweek.totalPoints);
        setCorrectPronos(geekMatchweek.numberCorrects);
        setExactPronos(geekMatchweek.numberExacts);
        setFavTeamBonus(geekMatchweek.bonusFavTeam);
      } else {
        setTotalPoints(geekSeason.totalPoints || geekSeason.initialPoints);
        setCorrectPronos(
          geekSeason.numberCorrects || geekSeason.initialNumberCorrects
        );
        setExactPronos(
          geekSeason.numberExacts || geekSeason.initialNumberExacts
        );
        setFavTeamBonus(
          geekSeason.bonusFavTeam || geekSeason.initialBonusFavTeam
        );
      }
    } else {
      setTotalPoints(0);
      setCorrectPronos(0);
      setExactPronos(0);
      setFavTeamBonus(false);
      setFavTeam(null);
    }
  }, [geek, matchweek, seasonID]);

  const giveMedal = () => {
    switch (rank) {
      case 1:
        return (
          <FirstIcon
            className="medal-icons-ranking"
            size="28px"
            color="#FFA500"
          />
        );
      case 2:
        return (
          <SecondIcon
            className="medal-icons-ranking"
            size="28px"
            color="#616060"
          />
        );
      case 3:
        return (
          <ThirdIcon
            className="medal-icons-ranking"
            size="28px"
            color="#6A3805"
          />
        );
      default:
        return ` ${rank} - `;
    }
  };

  const favTeamInfo = () => {
    if (matchweek)
      return (
        favTeamBonus && (
          <span className="ranking-icon">
            <FavTeamIcon size={iconSize} />
            <div className="ranking-icon-details ranking-icon-details-right">
              <p>
                Bon prono avec son équipe de coeur :<br />
                <img
                  className="team-logo-ranking"
                  src={favTeam?.logo}
                  alt="Fav Team"
                />{" "}
                {favTeam?.name}
              </p>
            </div>
          </span>
        )
      );
    else
      return (
        <span className="ranking-icon">
          {favTeamBonus || 0}
          <FavTeamIcon className="ranking-icon-component" size={iconSize} />
          <div className="ranking-icon-details ranking-icon-details-right">
            <p>{favTeamBonus} bons pronos avec son équipe de coeur.</p>
          </div>
        </span>
      );
  };

  const seePronos = () => {
    const geekIsCurrentUser = geek._id === user._id;

    const linkToPronos = geekIsCurrentUser
      ? `/pronogeeks/${seasonID}/matchweek/${matchweek}`
      : `/geek/${geek._id}/pronogeeks/${seasonID}/matchweek/${matchweek}`;

    if (matchweek)
      return (
        <Link to={linkToPronos}>
          <span className="ranking-icon ranking-icon-last">
            <ViewPronoIcon color="rgba(156, 0, 99, 0.8)" size="24px" />
            <div className="ranking-icon-details">
              {geekIsCurrentUser ? (
                <p>Voir mes pronos</p>
              ) : (
                <p>Voir les pronos de {geek.username}</p>
              )}
            </div>
          </span>
        </Link>
      );
    else
      return favTeam ? (
        <span className="ranking-icon ranking-icon-last ranking-favteam-logo">
          <img
            className="team-logo-ranking"
            src={favTeam.logo}
            alt="Fav Team"
          />
          <div className="ranking-icon-details">
            <p>
              Équipe de coeur de {geek.username} : {favTeam.name}
            </p>
          </div>
        </span>
      ) : (
        <span className="ranking-icon ranking-icon-last ranking-favteam-logo">
          &nbsp;
        </span>
      );
  };

  return (
    <li
      key={geek._id}
      className={`list-group-item d-flex ${header ? "mb-2" : ""}`}
    >
      <div className="d-flex justify-content-center align-items-center mr-2 geek-ranking-number">
        <span>
          {giveMedal()}
          <img className="profile-pic-ranking" src={geek.photo} alt="Pic" />
        </span>
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center ranking-line-top">
          {user._id === geek._id && (
            <span className="username-ranking">
              <b>{geek.username}</b>
            </span>
          )}

          {user._id !== geek._id && (
            <span className="username-ranking">{geek.username}</span>
          )}

          <span className="badge badge-success badge-pill my-badge my-badge-ranking">
            {totalPoints || 0}pts
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          {seePronos()}

          <div className="d-flex justify-content-evenly align-items-center">
            {favTeamInfo()}

            <span className="ranking-icon">
              {correctPronos || 0}
              <CorrectIcon className="ranking-icon-component" size={iconSize} />
              <div className="ranking-icon-details ranking-icon-details-right">
                <p>{correctPronos || 0} pronogeeks corrects</p>
              </div>
            </span>

            <span className="ranking-icon ranking-icon-last">
              {exactPronos || 0}
              <ExactIcon className="ranking-icon-component" size={iconSize} />
              <div className="ranking-icon-details ranking-icon-details-right">
                <p>{exactPronos || 0} pronogeeks exacts</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RankingOneGeek;
