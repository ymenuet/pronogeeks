import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { getSeasonData } from '../services/seasons'
import { updateProfileWithSeason, updateFavTeam } from '../services/user'
import { getProfile } from '../services/auth'
import { Context } from '../context'
import { useInput } from '../customHooks'
import { Loader } from '../components'
import { openNotification } from '../helpers'
import { WarningIcon } from '../components/Icons'

const PronogeeksSearch = ({ match: { params: { seasonID } }, loading }) => {

    const { loginUser } = useContext(Context)

    const [seasonTeams, setSeasonTeams] = useState(null)
    const [newSeason, setNewSeason] = useState(false)
    const [matchweek, setMatchweek] = useState(null)
    const favTeam = useInput('')

    useEffect(() => {
        const updateProfile = async (seasonID) => {
            return await updateProfileWithSeason(seasonID)
        }
        const setNewUser = async () => {
            const newSeason = await updateProfile(seasonID)
            setNewSeason(newSeason)
            const user = await getProfile()
            loginUser(user)
        }
        setNewUser()

        const fetchSeason = async (seasonID) => {
            const season = await getSeasonData(seasonID)
            setSeasonTeams(season.rankedTeams)
            const fixturesToCome = season.fixtures.filter(fixture => (new Date(fixture.date).getTime() + 1000 * 60 * 120) > Date.now())
            let nextMatchweek = fixturesToCome[0].matchweek;
            let nextDate = fixturesToCome[0].date
            fixturesToCome.forEach(fixture => nextMatchweek = fixture.matchweek < nextMatchweek && new Date(fixture.date).getTime() < new Date(nextDate).getTime() ? fixture.matchweek : nextMatchweek)
            setMatchweek(nextMatchweek)
        }
        fetchSeason(seasonID)

    }, [seasonID, loginUser])

    const saveFavTeam = async () => {
        if (favTeam.value === '') return openNotification('warning', 'Attention', 'Tu dois choisir une équipe de coeur avant de continuer.')
        else {
            await updateFavTeam(seasonID, { favTeam: favTeam.value })
            openNotification('success', 'Équipe de coeur enregistrée.')
            const user = await getProfile()
            loginUser(user)
            setNewSeason(false)
        }
    }

    return <div className='pronogeeks-bg'>
        {!seasonTeams || loading || !matchweek ? (

            <Loader color='rgb(4, 78, 199)' />

        ) : newSeason ? (

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
                        onClick={saveFavTeam}
                    >
                        Confirmer
                    </button>

                </div>

            </div>

        ) : <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />

        }

    </div>
}

export default PronogeeksSearch
