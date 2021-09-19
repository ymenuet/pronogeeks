import React from 'react';
import PropTypes from 'prop-types';

import { fullDateFormatter } from '../../utils/helpers';
import { CorrectIcon, ExactIcon, FavTeamIcon } from '../Icons';
import './rulesProno.css';
import { SeasonModel } from '../../utils/models';

const RulesProno = ({ setShowRules, lastScoresUpdated, lastOddsUpdated, season }) => {
  return (
    <>
      {setShowRules && (
        <>
          {/* eslint-disable-next-line */}
          <span onClick={() => setShowRules(false)}>X</span>
          <h4>Règles des pronogeeks :</h4>
          <hr />
        </>
      )}
      <ul className="pronogeeks-rules-list">
        <li>
          Les statuts et résultats des matchs sont actualisés en moyenne toutes les 30 minutes (à
          partir de 7 jours avant le début de la journée) et les points de pronogeeks avec.{' '}
          {lastScoresUpdated && `(dernière mise à jour le ${fullDateFormatter(lastScoresUpdated)})`}
        </li>
        <li>
          Les cotes sont actualisées une fois par jour (à partir de 7 jours avant le début de la
          journée). À partir de 30 minutes avant le début d&apos;un match, ses cotes ne changent
          plus.{' '}
          {lastOddsUpdated && `(dernière mise à jour le ${fullDateFormatter(lastOddsUpdated)})`}
        </li>
        <li>Il n&apos;est plus possible de changer son pronogeek après le coup d&apos;envoi.</li>
        <li>
          Un pronogeek <b>correct</b> (bon vainqueur ou match nul) rapporte le nombre de points
          indiqués dans les cotes de la rencontre.
        </li>
        <li>
          Un pronogeek <b>exact</b> (score exact bien pronogeeké) rapporte le double de la cote
          correspondante.
        </li>
        <li>
          Un pronogeek correct sur un match de son <b>équipe de coeur</b> <FavTeamIcon />{' '}
          (qu&apos;elle soit gagnante ou perdante) rapporte 30 points bonus. L&apos;équipe de coeur
          est choisie avant de commencer à pronogeeker une saison, et ne peut plus être changée
          pendant toute la durée de cette dernière.
        </li>
        <li className="bonus-details-list-item">
          Détail des bonus par journée {season && `de ${season.leagueName}`}:
          <center>
            <table className="bonus-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <CorrectIcon className="rules-icon" />
                    <br />
                    Pronos corrects
                  </th>
                  <th>
                    <ExactIcon className="rules-icon" />
                    <br />
                    Pronos exacts
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{'< 3'}</td>
                  <td>+0pt</td>
                  <td>+0pt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>+0pt</td>
                  <td>+50pts</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>+0pt</td>
                  <td>+100pts</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>+50pts</td>
                  <td>+200pts</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>+100pts</td>
                  <td>+300pts</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>+200pts</td>
                  <td>+500pts</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>+300pts</td>
                  <td>+700pts</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>+500pts</td>
                  <td>+1000pts</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>+700pts</td>
                  <td>+1500pts</td>
                </tr>
              </tbody>
            </table>
          </center>
          Exemple : Si un(e) geek a 7 pronos corrects (+200pts) dont 4 pronos exacts (+100pts) sur
          une même journée, il ou elle prend 300 points bonus sur cette journée. 10 pronos exacts
          sur la même journée rapportent donc 2200 points bonus !!!
        </li>
      </ul>
    </>
  );
};

RulesProno.defaultProps = {
  setShowRules: undefined,
  lastScoresUpdated: undefined,
  lastOddsUpdated: undefined,
  season: undefined,
};

RulesProno.propTypes = {
  setShowRules: PropTypes.func,
  lastScoresUpdated: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lastOddsUpdated: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  season: SeasonModel,
};

export default RulesProno;
