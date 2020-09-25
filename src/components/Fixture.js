import React, { useState, useEffect, useContext } from 'react'
import { getFixture } from '../services/fixtures'
import { Skeleton } from 'antd'
import { Context } from '../context'

const Fixture = ({ fixtureID }) => {
    const [fixture, setFixture] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const { user } = useContext(Context)

    useEffect(() => {
        const fetchFixturesAndOdds = async (fixtureID) => {
            const fixture = await getFixture(fixtureID)
            const seasonID = fixture.season
            if (new Date(fixture.date) - Date.now() < 0) setMatchStarted(true)
            setFixture(fixture)
            const season = user.seasons.filter(season => season.season._id === seasonID)[0]
            let pronogeek = { homeProno: '', awayProno: '' };
            if (season.pronogeeks.length > 0) pronogeek = season.pronogeeks.filter(pronogeek => pronogeek.fixture === fixtureID)[0]
            setHomeScore(pronogeek.homeProno)
            setAwayScore(pronogeek.awayProno)
        }
        fetchFixturesAndOdds(fixtureID)
    }, [])

    const savePronos = async (homeScore, awayScore, fixtureID) => {

    }

    const dateTransform = (date) => {
        date = new Date(date)
        let weekDay = date.getDay()
        let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
        switch (weekDay) {
            case 0:
                weekDay = 'dimanche'
                break
            case 1:
                weekDay = 'lundi'
                break;
            case 2:
                weekDay = 'mardi'
                break;
            case 3:
                weekDay = 'mercredi'
                break
            case 4:
                weekDay = 'jeudi'
                break;
            case 5:
                weekDay = 'vendredi'
                break;
            case 6:
                weekDay = 'samedi'
                break;
        }
        return { fullDate: `${weekDay} ${date.getDate()}/${month}/${date.getFullYear()}`, fullTime: `${date.getHours()}h${minutes}` }
    }


    return !fixture || homeScore == null || awayScore == null ? (
        <Skeleton />
    ) : (
            <div className='fixture-line'>
                <table>
                    <thead>
                        <tr>
                            <th><img src={fixture.homeTeam.logo} alt="logo" className='team-logo' /></th>
                            <th><small>{fixture.homeTeam.stadium}<br />{dateTransform(fixture.date).fullDate}<br />à {dateTransform(fixture.date).fullTime}</small></th>
                            <th><img src={fixture.awayTeam.logo} alt="logo" className='team-logo' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='pb-3'>
                            <td className='team-name'>{fixture.homeTeam.name}</td>
                            <td className='score-fixture'>{fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}</td>
                            <td className='team-name'>{fixture.awayTeam.name}</td>
                        </tr>
                        <tr className='odds-section odds-top'>
                            <td>Cote domicile :</td>
                            <td>Cote nul :</td>
                            <td>Cote extérieur :</td>
                        </tr>
                        <tr className='odds-section odds-bottom'>
                            <td>{fixture.oddsWinHome}</td>
                            <td>{fixture.oddsDraw}</td>
                            <td>{fixture.oddsWinAway}</td>
                        </tr>
                        <tr className='prono-section'>
                            <td className='prono-input-col'><label>Buts domicile :</label><input className='prono-input' type="number" name='homeProno' value={homeScore} onChange={e => setHomeScore(e.target.value)} placeholder={0} disabled={matchStarted} /></td>
                            <td className='prono-input-col'><button className='btn my-btn save-prono' onClick={savePronos}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" /></svg></button></td>
                            <td className='prono-input-col'><label>Buts extérieur :</label><input className='prono-input' type="number" name='homeProno' value={awayScore} onChange={e => setAwayScore(e.target.value)} placeholder={0} disabled={matchStarted} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}

export default Fixture
