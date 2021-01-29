import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useInput } from '../customHooks'
import { ErrorMessage, Loader } from '../components'
import { openNotification, getUserSeasonFromProfile, isConnected } from '../helpers'
import { WarningIcon } from '../components/Icons'
import '../styles/pronogeeks.css'

import * as geekActions from '../actions/geekActions'

const MILLISECONDS_IN_3_HOURS = 1000 * 60 * 60 * 3

const PronogeeksSearch = ({ match: { params: { seasonID } }, loading, loadingGeek, user, favTeamAdded, errorGeek, createGeekSeason, saveFavTeam, resetFavTeamAdded }) => {

    const [seasonTeams, setSeasonTeams] = useState(null)
    const [newSeason, setNewSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(null)
    const favTeam = useInput('')

    useEffect(() => {
        if (favTeamAdded) {
            openNotification('success', 'Équipe de coeur enregistrée.')
            setNewSeason(false)
            resetFavTeamAdded()
        }
    }, [favTeamAdded, resetFavTeamAdded])

    useEffect(() => {
        if (isConnected(user)) {
            const userSeason = getUserSeasonFromProfile(user, seasonID)
            if (!userSeason) {
                setNewSeason(true)
                createGeekSeason(seasonID)
            } else if (!userSeason.favTeam) {
                const seasonTeams = userSeason.season.rankedTeams.sort((a, b) => {
                    if (a.name > b.name) return 1
                    else return -1
                })
                setSeasonTeams(seasonTeams)
                setNewSeason(true)
            } else {
                setNewSeason(false)
                const fixturesToCome = userSeason.season.fixtures.filter(fixture => new Date(fixture.date).getTime() > (Date.now() - MILLISECONDS_IN_3_HOURS))
                const nextFixture = fixturesToCome.reduce((earliestFixture, fixture) => {
                    if (fixture.date < earliestFixture.date) return fixture
                    else return earliestFixture
                })
                setMatchweek(nextFixture.matchweek)
            }
        }
    }, [user, seasonID, createGeekSeason])

    const saveNewFavTeam = async () => {
        if (favTeam.value === '') return openNotification('warning', 'Attention', 'Tu dois choisir une équipe de coeur avant de continuer.')
        else {
            saveFavTeam(seasonID, favTeam.value)
        }
    }

    return <div className='pronogeeks-bg'>

        {errorGeek ?

            <ErrorMessage>{errorGeek}</ErrorMessage>

            : newSeason && seasonTeams ?

                <div>

                    <div className='choose-favteam'>

                        <label htmlFor="favteam-select">Choisis une équipe de coeur pour cette saison.
                        <br />
                        NB : Chaque bon prono sur un match de ton équipe de coeur te rapporte un bonus de 30 pts.
                        <br />
                            <WarningIcon />&nbsp;
                        Réfléchis bien, tu ne pourras plus changer ensuite...
                    </label>

                        <br />

                        <select name="favTeam" id="favteam-select" {...favTeam} >
                            <option value="" disabled>Sélectionner une équipe</option>
                            {seasonTeams.map(team =>
                                <option
                                    key={team._id}
                                    value={team._id}
                                >
                                    {team.name}
                                </option>
                            )}
                        </select>

                        <br />

                        <button
                            className='btn my-btn save-favteam-btn'
                            onClick={saveNewFavTeam}
                        >
                            Confirmer
                    </button>

                    </div>

                </div>

                : loading || loadingGeek || !matchweek || newSeason === null ?

                    <Loader color='rgb(4, 78, 199)' />

                    : <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />}

    </div>
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    favTeamAdded: state.geekReducer.favTeamAdded,
    loadingGeek: state.geekReducer.loading,
    errorGeek: state.geekReducer.error
})

const mapDispatchToProps = {
    ...geekActions
}

export default connect(mapStateToProps, mapDispatchToProps)(PronogeeksSearch)
