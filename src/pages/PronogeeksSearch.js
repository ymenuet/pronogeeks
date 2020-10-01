import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { getSeasonData } from '../services/seasons'
import { updateProfileWithSeason, updateFavTeam } from '../services/user'
import { getProfile } from '../services/auth'
import { Space, Spin, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'
import { useInput } from '../customHooks'

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
            const fixturesToCome = season.fixtures.filter(fixture => (new Date(fixture.date).getTime() - Date.now()) > 0 - 1000 * 60 * 120)
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

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    return <div className='pronogeeks-bg'>
        {!seasonTeams || loading ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(4, 78, 199)', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'rgb(4, 78, 199)', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : newSeason ? (
            <div className='loader-container'>
                <div className='choose-favteam'>
                    <label htmlFor="favteam-select">Choisis une équipe de coeur pour cette saison.
                            <br />
                            NB : Chaque bon prono sur un match de ton équipe de coeur te rapporte un bonus de 30 pts.
                            <br />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(253, 0, 7)" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg> Réfléchis bien, tu ne pourras plus changer ensuite...
                        </label>
                    <br />
                    <select name="favTeam" id="favteam-select" {...favTeam} >
                        <option value="" disabled>Sélectionner une équipe</option>
                        {seasonTeams.map(team =>
                            <option key={team._id} value={team._id}>{team.name}</option>
                        )}
                    </select>
                    <br />
                    <button className='btn my-btn save-favteam-btn' onClick={saveFavTeam}>Confirmer</button>
                </div>
            </div>
        ) : !matchweek ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(4, 78, 199)', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'rgb(4, 78, 199)', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : (
                        <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />
                    )
        }
    </div>
}

export default PronogeeksSearch
