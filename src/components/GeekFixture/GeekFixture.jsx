import React from 'react';
import { Skeleton } from 'antd';
import { printFixtureDate, printFixtureStatus } from '../../utils/helpers';
import { useMatchStarted, useGeekFixtureProno } from '../../utils/hooks';
import { FavTeamIcon } from '../Icons';
import { ErrorMessage } from '..';
import './fixture.css';

const GeekFixture = ({ fixture, geek }) => {
  const matchStarted = useMatchStarted(fixture);

  const { pronogeek, homeScore, awayScore, errorProno } = useGeekFixtureProno(fixture, geek);

  return !fixture || homeScore == null || awayScore == null ? (
    <div style={{ padding: 20, paddingTop: 0 }}>
      <Skeleton active />
    </div>
  ) : (
    <div className="fixture-line">
      <table>
        <thead>
          <tr>
            <th>
              <img src={fixture.homeTeam.logo} alt="logo" className="team-logo" />
            </th>
            <th>
              <small>
                {fixture.homeTeam.stadium}
                <br />
                {printFixtureDate(fixture.date).fullDate}
                <br />à {printFixtureDate(fixture.date).fullTime}
              </small>
            </th>
            <th>
              <img src={fixture.awayTeam.logo} alt="logo" className="team-logo" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="score-teams-row">
            <td className="team-name">{fixture.homeTeam.name}</td>
            <td className="score-fixture">
              {fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}
            </td>
            <td className="team-name">{fixture.awayTeam.name}</td>
          </tr>

          {(fixture.timeElapsed || fixture.statusShort === 'PST') && (
            <tr className="pb-1">
              <td />
              <td className="fixture-status">
                {printFixtureStatus(fixture.statusShort, fixture.timeElapsed)}
              </td>
              <td />
            </tr>
          )}

          <tr className="odds-section odds-top">
            <td>Cote domicile :</td>
            <td>Cote nul :</td>
            <td>Cote extérieur :</td>
          </tr>

          <tr className="odds-section odds-bottom">
            <td>{fixture.oddsWinHome}</td>
            <td>{fixture.oddsDraw}</td>
            <td>{fixture.oddsWinAway}</td>
          </tr>

          {matchStarted && fixture.statusShort !== 'PST' && (
            <tr className="prono-section">
              {errorProno ? (
                <ErrorMessage style={{ margin: '0 auto' }}>{errorProno}</ErrorMessage>
              ) : (
                <>
                  <td className="prono-input-col">
                    <label>Buts domicile :</label>
                    <input
                      className="prono-input"
                      type="number"
                      name="homeProno"
                      value={homeScore}
                      placeholder="Prono"
                      disabled
                    />
                  </td>

                  <td className="prono-input-col">
                    {pronogeek.points > 0 && pronogeek.bonusFavTeam && (
                      <div style={{ margin: '0 10px' }}>
                        {geek.username} a scoré {pronogeek.points}pts
                        <br />
                        (bonus {pronogeek.exact && 'score exact'}
                        {pronogeek.exact && <br />}
                        {pronogeek.exact && 'et '}
                        <FavTeamIcon size="20px" />)
                      </div>
                    )}

                    {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                      <div style={{ margin: '0 10px' }}>
                        {geek.username} a scoré {pronogeek.points}pts
                        <br />
                        {pronogeek.exact && '(bonus score exact)'}
                      </div>
                    )}

                    {pronogeek.points === 0 && pronogeek.addedToProfile && (
                      <div style={{ margin: '0 10px' }}>Mauvais prono...</div>
                    )}
                  </td>

                  <td className="prono-input-col">
                    <label>Buts extérieur :</label>
                    <input
                      className="prono-input"
                      type="number"
                      name="awayProno"
                      value={awayScore}
                      placeholder="Prono"
                      disabled
                    />
                  </td>
                </>
              )}
            </tr>
          )}

          {(!matchStarted || fixture.statusShort === 'PST') && (
            <tr style={{ marginTop: 10 }}>
              <td />
              <td>Pronogeek non visible.</td>
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GeekFixture;
