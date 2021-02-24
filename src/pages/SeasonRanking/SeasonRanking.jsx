import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ErrorMessage, Loader } from '../../components'
import { DragIcon, SaveIcon, ListIcon } from '../../components/Icons'
import { openNotification, isConnected } from '../../utils/functions'
import { handleStateWithId } from '../../utils/stateHandlers'
import { PROV_RANKING_MATCHWEEK_LIMIT } from '../../utils/constants.js'
import './seasonRanking.css'

import { saveUserProvRanking } from '../../actions/geekActions'
import { getSeason, closeProvRankings } from '../../actions/seasonActions'

const SeasonRanking = ({ match: { params: { seasonID, matchweekNumber } }, history, loadingGeek, user, rankingSaved, detailedSeasons, saveUserProvRanking, getSeason, closeProvRankings }) => {

    const [season, setSeason] = useState(null)
    const [userProvRanking, setUserProvRanking] = useState(null)
    const [userWithoutRanking, setUserWithoutRanking] = useState(false)
    const [provRankingOpen, setProvRankingOpen] = useState(false)
    const [errorSeason, setErrorSeason] = useState(false)

    useEffect(() => {
        handleStateWithId({
            id: seasonID,
            reducerData: detailedSeasons,
            action: getSeason,
            setResult: setSeason,
            setError: setErrorSeason
        })
    }, [seasonID, detailedSeasons, getSeason])


    useEffect(() => {
        if (rankingSaved) {
            openNotification('success', 'Classement enregistré')
        }
    }, [rankingSaved])


    useEffect(() => {
        if (isConnected(user) && season) {
            const seasonUser = user.seasons.filter(season => season.season._id === seasonID)
            if (seasonUser.length) {
                const userProvRanking = seasonUser[0].provisionalRanking
                if (userProvRanking.length) setUserProvRanking(userProvRanking)
                else {
                    setUserWithoutRanking(true)
                    if (season.provRankingOpen) setUserProvRanking(season.rankedTeams)
                    else setUserProvRanking([])
                }
            } else history.push(`/pronogeeks/${seasonID}`)
        }
    }, [history, user, season, seasonID])


    useEffect(() => {
        if (season && season.provRankingOpen) {
            const matchweek7Dates = season.fixtures.filter(({ matchweek }) => matchweek === PROV_RANKING_MATCHWEEK_LIMIT).map(({ date }) => new Date(date))
            const matchweek7HasStarted = Date.now() - Math.min(...matchweek7Dates) > 0

            if (matchweek7HasStarted) {
                closeProvRankings(season._id)
                setProvRankingOpen(false)

            } else setProvRankingOpen(true)
        }

    }, [season, closeProvRankings])


    const handleDragEnd = result => {
        if (!result.destination) return
        const newRanking = [...userProvRanking]
        const [reorderedItem] = newRanking.splice(result.source.index, 1)
        newRanking.splice(result.destination.index, 0, reorderedItem)
        setUserProvRanking(newRanking)
    }

    const saveRanking = async () => {
        saveUserProvRanking(seasonID, userProvRanking)
    }

    const infoProvRanking = (provRankingOpen) => {
        return provRankingOpen ? <p>Tu as jusqu'avant le début de la <b>journée 7</b> pour modifier ton classement prévisionnel. Il pourra te rapporter des points bonus à la fin de la saison.
        <br />
        Les équipes bien classées par rapport au classement actuel apparaissent en vert. Mais tout le monde sait que le classement peut beaucoup bouger d'ici à la fin de la saison, donc réfléchis bien !</p>

            : !userWithoutRanking ? <p>Ton classement prévisionnel n'est plus modifiable. Mais n'hésite pas à le consulter de temps en temps pour voir si tu te rapproches des points bonus ! (Clique <Link to='/rules#link-to-provisional-ranking'>ici</Link> pour plus de détails)
            <br />
            Les clubs qui apparaissent sur fond vert sont ceux qui sont bien positionnés par rapport au classement actuel.</p>

                : <p>Il est trop tard pour faire ton classement prévisionnel... Tu avais jusqu'avant le début de la journée 7.
                <br />
                RDV la saison prochaine !</p>
    }

    return <div className="pronogeeks-bg offset-for-btn">

        {errorSeason ? (

            <ErrorMessage>{errorSeason}</ErrorMessage>

        ) : season && userProvRanking ? <>

            <div className='go-to-ranking'>

                <Link className='btn my-btn go-to-ranking-btn' to={`/pronogeeks/${seasonID}${matchweekNumber ? `/matchweek/${matchweekNumber}` : ''}`}>
                    <ListIcon size='40px' />
                        &nbsp;
                        <span>Faire mes pronogeeks</span>
                </Link>

                <div className='go-to-ranking-info'>
                    <p>Faire mes pronogeeks.</p>
                </div>

            </div>

            <div className='season-provisional-ranking'>

                <div className='season-team-ranking'>

                    <h4>Classement de {season.leagueName},
                    <br />
                saison {season.year}</h4>

                    <table>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="season-ranking-team-name">Club</th>
                                <th className="season-ranking-team-points">Pts</th>
                                <th>MJ</th>
                                <th>G</th>
                                <th>N</th>
                                <th>P</th>
                                <th>BP</th>
                                <th>BC</th>
                                <th>+/-</th>
                            </tr>
                            <tr className='table-row-spacer'></tr>
                        </thead>

                        <tbody>
                            {season.rankedTeams.map(team => <React.Fragment key={team._id}>
                                <tr>
                                    <td>{team.rank}</td>
                                    <td className="season-ranking-team-name">
                                        <img
                                            src={team.logo}
                                            alt='logo'
                                            className='team-ranking-logo'
                                        />
                                        <span>{team.name}</span></td>
                                    <td className="season-ranking-team-points">{team.points}</td>
                                    <td>{team.matchsPlayed}</td>
                                    <td>{team.win}</td>
                                    <td>{team.draw}</td>
                                    <td>{team.lose}</td>
                                    <td>{team.goalsFor}</td>
                                    <td>{team.goalsAgainst}</td>
                                    <td>{team.goalsDiff}</td>
                                </tr>
                                <tr className='table-row-spacer'></tr>
                            </React.Fragment>)}
                        </tbody>

                    </table>

                </div>

                <div className='user-provisional-ranking season-team-ranking'>

                    <h4>Classement prévisonnel</h4>

                    {infoProvRanking(provRankingOpen)}

                    {provRankingOpen && <button className='btn my-btn save-prono save-ranking-btn' onClick={saveRanking}>

                        {loadingGeek ? <Loader
                            tip=''
                            size='small'
                            fontSize='1.8rem'
                            container={false}
                        /> : <SaveIcon />}
                        {!loadingGeek && 'Enregistrer classement'}

                    </button>}

                    <DragDropContext onDragEnd={handleDragEnd}>

                        <Droppable droppableId='provisional-ranking'>

                            {provided => <ul {...provided.droppableProps} ref={provided.innerRef}>

                                {userProvRanking.length > 0 && <li className='provisional-ranking-header'>
                                    <div>
                                        <span>#</span>
                                        <span>-</span>
                                        <span>Club</span>
                                    </div>
                                </li>}

                                {userProvRanking.map((team, index) => <Draggable
                                    key={team._id}
                                    draggableId={team._id}
                                    index={index}
                                    isDragDisabled={!provRankingOpen}
                                >
                                    {provided => <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={index + 1 === team.rank ? 'correct-position' : ''}
                                    >
                                        <div>
                                            <span>{index + 1}</span>
                                            <span>-</span>
                                            <span>
                                                <img
                                                    src={team.logo}
                                                    alt='logo'
                                                    className='team-ranking-logo'
                                                />
                                                {team.name}
                                            </span>
                                        </div>
                                        {provRankingOpen && <span><DragIcon color={index + 1 === team.rank ? '#F0F7F4' : 'rgb(4, 78, 199)'} /></span>}
                                    </li>}

                                </Draggable>)}

                                {provided.placeholder}

                            </ul>}

                        </Droppable>

                    </DragDropContext>

                    {provRankingOpen && <button className='btn my-btn save-prono save-ranking-btn-bottom' onClick={saveRanking}>

                        {loadingGeek ? <Loader
                            tip=''
                            size='small'
                            fontSize='1.8rem'
                            container={false}
                        /> : <SaveIcon />}
                        {!loadingGeek && 'Enregistrer classement'}

                    </button>}

                </div>

            </div>

        </> : <Loader color='rgb(4, 78, 199)' />}

    </div>

}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    rankingSaved: state.geekReducer.rankingSaved,
    loadingGeek: state.geekReducer.loading,
    detailedSeasons: state.seasonReducer.detailedSeasons,
})

const mapDispatchToProps = {
    saveUserProvRanking,
    getSeason,
    closeProvRankings
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonRanking)
