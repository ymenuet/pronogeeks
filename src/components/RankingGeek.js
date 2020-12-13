import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CorrectIcon, ExactIcon, FavTeamIcon, ViewPronoIcon, FirstIcon, SecondIcon, ThirdIcon } from './Icons'

const iconSize = '20px'

const RankingGeek = ({ user, geek, index, seasonID, matchweek }) => {

    const [totalPoints, setTotalPoints] = useState(0)
    const [correctPronos, setCorrectPronos] = useState(0)
    const [exactPronos, setExactPronos] = useState(0)
    const [favTeam, setFavTeam] = useState(false)
    const [team, setTeam] = useState(null)

    useEffect(() => {
        const geekPlaysSeason = geek.seasons.length > 0 &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString()).length > 0
        const geekPlaysMatchweek = matchweek &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.length > 0 &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString()).length > 0

        if (geekPlaysSeason && geekPlaysMatchweek) {
            const team = geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].favTeam
            const matchweekDetails = geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString())[0]
            setTotalPoints(matchweekDetails.totalPoints)
            setCorrectPronos(matchweekDetails.numberCorrects)
            setExactPronos(matchweekDetails.numberExacts)
            setFavTeam(matchweekDetails.bonusFavTeam)
            setTeam(team)
        }
        else if (!matchweek && geekPlaysSeason) {
            const seasonDetails = geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0]
            setTotalPoints(seasonDetails.totalPoints || seasonDetails.initialPoints)
            setCorrectPronos(seasonDetails.numberCorrects || seasonDetails.initialNumberCorrects)
            setExactPronos(seasonDetails.numberExacts || seasonDetails.initialNumberExacts)
            setFavTeam(seasonDetails.bonusFavTeam || seasonDetails.initialBonusFavTeam)
            setTeam(seasonDetails.favTeam)
        }
    }, [geek, matchweek, seasonID])

    const giveMedal = () => {
        switch (index) {
            case 0:
                return <FirstIcon className='medal-icons-ranking' size='28px' color='#FFA500' />
            case 1:
                return <SecondIcon className='medal-icons-ranking' size='28px' color='#616060' />
            case 2:
                return <ThirdIcon className='medal-icons-ranking' size='28px' color='#6A3805' />
            default: return ` ${index + 1} - `
        }
    }

    const favTeamInfo = () => {
        if (matchweek) return favTeam && <span className='ranking-icon'>
            <FavTeamIcon size={iconSize} />
            <div className='ranking-icon-details ranking-icon-details-right'>
                <p>Bon prono avec son équipe de coeur :<br />
                    <img className="team-logo-ranking" src={team?.logo} alt="Fav Team" /> {team?.name}
                </p>
            </div>
        </span>
        else return <span className='ranking-icon'>
            {favTeam}<FavTeamIcon className='ranking-icon-component' size={iconSize} />
            <div className='ranking-icon-details ranking-icon-details-right'>
                <p>{favTeam} bons pronos avec son équipe de coeur.</p>
            </div>
        </span>
    }

    const seePronos = () => {
        if (matchweek) return <Link to={`/geek/${geek._id}/pronogeeks/${seasonID}/matchweek/${matchweek}`}>
            <span className='ranking-icon ranking-icon-last'>
                <ViewPronoIcon color='rgba(156, 0, 99, 0.8)' size='24px' />
                <div className='ranking-icon-details'>
                    <p>Voir les pronos de {geek.username}</p>
                </div>
            </span>
        </Link>
        else return <span className='ranking-icon ranking-icon-last ranking-favteam-logo'>
            <img className="team-logo-ranking" src={team?.logo} alt="Fav Team" />
            <div className='ranking-icon-details'>
                <p>Équipe de coeur de {geek.username} : {team?.name}</p>
            </div>
        </span>
    }

    return (
        <li
            key={geek._id}
            className='list-group-item d-flex'
        >

            <div className='d-flex justify-content-center align-items-center mr-2 geek-ranking-number'>
                <span>{giveMedal()}<img className='profile-pic-ranking' src={geek.photo} alt="Pic" /></span>
            </div>

            <div className='flex-grow-1'>

                <div className='d-flex justify-content-between align-items-center ranking-line-top'>

                    {user._id === geek._id && <span className='username-ranking'><b>{geek.username}</b></span>}

                    {user._id !== geek._id && <span className='username-ranking'>{geek.username}</span>}

                    <span className='badge badge-success badge-pill my-badge my-badge-ranking'>{totalPoints} pts</span>

                </div>

                <div className='d-flex justify-content-between align-items-center'>

                    {seePronos()}

                    <div className='d-flex justify-content-evenly align-items-center'>

                        {favTeamInfo()}

                        <span className='ranking-icon'>
                            {correctPronos}<CorrectIcon className='ranking-icon-component' size={iconSize} color='#28a745' />
                            <div className='ranking-icon-details ranking-icon-details-right'>
                                <p>{correctPronos} pronogeeks corrects</p>
                            </div>
                        </span>

                        <span className='ranking-icon ranking-icon-last'>
                            {exactPronos}<ExactIcon className='ranking-icon-component' size={iconSize} color='#0041aa' />
                            <div className='ranking-icon-details ranking-icon-details-right'>
                                <p>{exactPronos} pronogeeks exacts</p>
                            </div>
                        </span>

                    </div>

                </div>

            </div>

        </li>
    )
}

export default RankingGeek
