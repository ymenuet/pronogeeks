import React, { useState, useEffect, useContext } from 'react'
import { getSeasonData } from '../services/seasons'
import { Context } from '../context'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../styles/seasonRanking.css'

const SeasonRanking = ({ match: { params: { seasonID } } }) => {

    const [season, setSeason] = useState(null)
    const [userProvRanking, setUserProvRanking] = useState(null)
    const { user } = useContext(Context)

    useEffect(() => {
        const fetchSeasonData = async () => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
        }
        fetchSeasonData()
    }, [seasonID])

    useEffect(() => {
        if (user && season) {
            const seasonUser = user.seasons.filter(season => season.season._id === seasonID)
            if (seasonUser.length) {
                const userProvRanking = seasonUser[0].provisionalRanking
                if (userProvRanking.length) setUserProvRanking(userProvRanking)
                else setUserProvRanking(season.rankedTeams)
            }
        }
    }, [user, season, seasonID])

    const handleDragEnd = result => {
        if (!result.destination) return
        const newRanking = Array.from(userProvRanking)
        const [reorderedItem] = newRanking.splice(result.source.index, 1)
        newRanking.splice(result.destination.index, 0, reorderedItem)
        setUserProvRanking(newRanking)
    }

    return season && userProvRanking ? <div className="pronogeeks-bg">
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
                <h4>Ton classement prévisonnel</h4>
                <p>Tu as jusqu'avant le début de la <b>journée 7</b> pour modifier ton classement prévisionnel. Il pourra te rapporter des points bonus à la fin de la saison.
                <br />
                Les équipes bien classées par rapport au classement actuel apparaissent en vert. Mais tout le monde sait que le classement peut beaucoup bouger d'ici à la fin de la saison, donc réfléchis bien !</p>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId='provisional-ranking'>
                        {provided => <ul {...provided.droppableProps} ref={provided.innerRef}>
                            <li className='provisional-ranking-header'>
                                <span>#</span>
                                <span>-</span>
                                <span>Club</span>
                            </li>
                            {userProvRanking.map((team, index) => <Draggable key={team._id} draggableId={team._id} index={index}>
                                {provided => <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={index + 1 === team.rank ? 'correct-position' : ''}
                                >
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
                                </li>}
                            </Draggable>)}
                            {provided.placeholder}
                        </ul>}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    </div> : null
}

export default SeasonRanking
