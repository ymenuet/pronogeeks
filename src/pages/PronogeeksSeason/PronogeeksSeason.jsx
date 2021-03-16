import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ErrorMessage, Loader } from '../../components'
import { openNotification } from '../../utils/functions'
import { useInput, useSeason, useOpenSeason } from '../../utils/hooks'
import { WarningIcon } from '../../components/Icons'
import './pronogeeks.css'

import { saveFavTeam } from '../../actions/geekActions'

const PronogeeksSeason = ({ match: { params: { seasonID } }, loading }) => {

    const favTeam = useInput('')

    const { season, errorSeason } = useSeason(seasonID)

    const { newSeason, seasonTeams, matchweek, loadingSeason, setNewSeason } = useOpenSeason(season)

    const { favTeamAdded, loading: loadingGeek } = useSelector(({ geekReducer }) => geekReducer)

    const dispatch = useDispatch()


    useEffect(() => {
        if (favTeamAdded) {
            openNotification('success', 'Équipe de coeur enregistrée.')
            setNewSeason(false)
        }
    }, [favTeamAdded, setNewSeason])


    const saveNewFavTeam = () => {
        if (favTeam.value === '') return openNotification('warning', 'Attention', 'Tu dois choisir une équipe de coeur avant de continuer.')

        else dispatch(saveFavTeam(seasonID, favTeam.value))
    }

    return <div className='pronogeeks-bg'>

        {errorSeason ?

            <ErrorMessage>{errorSeason}</ErrorMessage>

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

                : loading || loadingGeek || loadingSeason || !matchweek || newSeason === null ?

                    <Loader color='rgb(4, 78, 199)' />

                    : <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />}

    </div>
}

export default PronogeeksSeason
