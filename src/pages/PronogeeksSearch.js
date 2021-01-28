import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSeasonData } from '../services/seasons'
import { Context } from '../context'
import { useInput } from '../customHooks'
import { ErrorMessage, Loader } from '../components'
import { openNotification, getUserSeasonFromProfile, isConnected } from '../helpers'
import { WarningIcon } from '../components/Icons'
import '../styles/pronogeeks.css'

import * as geekActions from '../actions/geekActions'

const PronogeeksSearch = ({ match: { params: { seasonID } }, loading, loadingGeek, user, favTeamAdded, errorGeek, createGeekSeason, saveFavTeam, resetFavTeamAdded }) => {

    const { loginUser } = useContext(Context)

    const [seasonTeams, setSeasonTeams] = useState(null)
    const [newSeason, setNewSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(null)
    const favTeam = useInput('')

    useEffect(() => {
        if (isConnected(user) && !getUserSeasonFromProfile(user, seasonID)) {
            setNewSeason(true)
            createGeekSeason(seasonID)
        }
    }, [user, seasonID, createGeekSeason])

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
            if (userSeason && !userSeason.favTeam) setNewSeason(true)
            else setNewSeason(false)
        }
    }, [user, seasonID])

    useEffect(() => {

        const fetchSeason = async (seasonID) => {
            const season = await getSeasonData(seasonID)
            const seasonTeams = season.rankedTeams.sort((a, b) => {
                if (a.name > b.name) return 1
                else return -1
            })
            setSeasonTeams(seasonTeams)
            const fixturesToCome = season.fixtures.filter(fixture => (new Date(fixture.date).getTime() + 1000 * 60 * 120) > Date.now())
            let nextMatchweek = fixturesToCome[0].matchweek;
            let nextDate = fixturesToCome[0].date
            fixturesToCome.map(fixture => nextMatchweek = fixture.matchweek < nextMatchweek && new Date(fixture.date).getTime() < new Date(nextDate).getTime() ? fixture.matchweek : nextMatchweek)
            setMatchweek(nextMatchweek)
        }
        fetchSeason(seasonID)

    }, [seasonID, loginUser])

    const saveNewFavTeam = async () => {
        if (favTeam.value === '') return openNotification('warning', 'Attention', 'Tu dois choisir une équipe de coeur avant de continuer.')
        else {
            saveFavTeam(seasonID, favTeam.value)
        }
    }

    return <div className='pronogeeks-bg'>
        {!seasonTeams || loading || loadingGeek || !matchweek || newSeason === null ? (

            <Loader color='rgb(4, 78, 199)' />

        ) : errorGeek ? <ErrorMessage>{errorGeek}</ErrorMessage> : newSeason ? (

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

        ) : <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />

        }

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
