import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateProfile, getProfile, updatePhoto } from '../services/auth'
import { fetchPlayers } from '../services/user'
import axios from 'axios'
import { Spin, Space, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'

const Profile = () => {
    const { user, loginUser } = useContext(Context)

    const [photoLoading, setPhotoLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [usernameChanged, setUsernameChanged] = useState(false)
    const [seasonID, setSeasonID] = useState(null)
    const [seasonRanking, setSeasonRanking] = useState(null)
    const [userRanking, setUserRanking] = useState(null)

    const uploadPhoto = async e => {
        const file = e.target.files[0]
        if (file.size > 1000000) return openNotification('warning', 'Attention', 'La taille du fichier ne peux pas excéder 1Mo. La photo de profil reste inchangée.')
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return openNotification('warning', 'Attention', 'Le fichier doit être au format JPG ou PNG. La photo de profil reste inchangée.')
        setPhotoLoading(true)
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset', 'pronogeeks')
        const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
        const user = await updatePhoto({ photo: secure_url })
        loginUser(user)
        setPhotoLoading(false)
    }

    const saveUsername = async () => {
        let saved = true
        setUsernameChanged(true)
        await updateProfile({ username: usernameInput }).catch(err => {
            setUsernameChanged(false)
            saved = false
            openNotification('warning', 'Attention', err.response.data.message.fr)
        })
        if (saved) {
            const user = await getProfile()
            loginUser(user)
            setShowModal(false)
            setUsernameChanged(false)
        }
    }

    useEffect(() => {
        setUsernameInput(user?.username)
        const getPlayers = async () => {
            if (user && user.seasons.length > 0) {
                const seasonID = user?.seasons[user.seasons.length - 1].season._id.toString()
                setSeasonID(user?.seasons[user.seasons.length - 1].season._id.toString())
                const players = await fetchPlayers(seasonID)
                const rankedPlayers = players.sort((a, b) => {
                    return b.seasons.filter(season => season.season.toString() === seasonID)[0].totalPoints - a.seasons.filter(season => season.season.toString() === seasonID)[0].totalPoints
                })
                const userRanking = rankedPlayers.map(player => player.username).indexOf(user.username) + 1
                const rankedPlayers20 = rankedPlayers.slice(0, 20)
                setUserRanking(userRanking)
                setSeasonRanking(rankedPlayers20)
            }
        }
        getPlayers()
    }, [user])

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er'
        else return `${num}ème`
    }

    return !user || usernameChanged ? (<div className='my-profile-page'>
        <div className='loader-container'>
            <Space size='large'>
                <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
            </Space>
        </div>
    </div>
    ) : (
            <div className='my-profile-page row'>
                <div className='my-profile col-10 offset-1 col-lg-4'>
                    <section className='about-section'>
                        <h2>Bonjour {user.username}
                            <button onClick={() => setShowModal(!showModal)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg></button>
                        </h2>
                        <div className='profile-details'>
                            <div className='profile-picture-container'>
                                {!photoLoading && <img src={user.photo} alt="Profile pic" className='profile-pic' />}
                                {photoLoading && <div className='profile-pic'>
                                    <Space size='medium'>
                                        <Spin size='medium' tip='Chargement de la photo...' style={{ color: 'rgb(26, 145, 254)' }} indicator={<LoadingOutlined spin style={{ color: 'rgb(26, 145, 254)', fontSize: '2rem', marginBottom: 8 }} />} />
                                    </Space>
                                </div>}
                                <label className='first-file-label' htmlFor="profile-pic-input">Changer de photo de profil :</label>
                                <div className="custom-file">
                                    <label className="profile-image custom-file-label" htmlFor="profile-pic-input">
                                        Charger une photo
                            <input id="profile-pic-input" type="file" name="image" className="custom-file-input" onChange={uploadPhoto} />
                                    </label>
                                </div>
                            </div>
                            {user.seasons.length > 0 && user.seasons[user.seasons.length - 1].favTeam && <div className='favteam-info'>
                                <div>
                                    <img src={user.seasons[user.seasons.length - 1].favTeam.logo} alt="Logo équipe de coeur" />
                                </div>
                                <h5>{user.seasons[user.seasons.length - 1].favTeam.name} est ton équipe de coeur<br />pour la saison {user.seasons[user.seasons.length - 1].season.year} de {user.seasons[user.seasons.length - 1].season.leagueName}.</h5>
                            </div>}
                        </div>
                    </section>
                    <section className='geekleagues-section'>
                        <h2>Ligues Geek</h2>
                        <Link to='/myGeekLeagues/new' className='btn my-btn new-league'>Nouvelle ligue</Link>
                        {user.geekLeagues.length > 0 && <ul>
                            {user.geekLeagues.map(league => <li>{league.name}</li>)}
                        </ul>}
                    </section>
                </div>
                <section className='my-profile-ranking col-10 offset-1 col-lg-4 offset-lg-2'>
                    {!seasonRanking && <div className='pt-4'>
                        <Space size='large'>
                            <Spin size='large' tip='Chargement du classement...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
                        </Space>
                    </div>}
                    {seasonRanking && <>
                        <h2>{user.seasons[user.seasons.length - 1].season.leagueName} saison {user.seasons[user.seasons.length - 1].season.year}
                            <br />
                    Classement général
                    </h2>
                        <ul className='list-group list-group-flush season-ranking'>
                            <li className='list-group-item d-flex justify-content-between align-items-center mb-2'><span><b>{setRank(userRanking)} : {user.username}</b></span><span className='badge badge-success badge-pill my-badge'>{user.seasons[user.seasons.length - 1].totalPoints} pts</span></li>
                            {seasonRanking.map((player, index) => <li key={player._id} className='list-group-item d-flex justify-content-between align-items-center'><span>{setRank(index + 1)} : {player.username}</span><span className='badge badge-success badge-pill my-badge'>{player.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].totalPoints} pts</span></li>

                            )}
                        </ul>
                    </>}
                </section>
                {showModal && <div id="update-username-modal" tabIndex="-1" role="dialog" aria-labelledby="update-username-modal-title" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Changer de pseudo :</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="pseudo-input-profile">Entrer un nouveau pseudo :</label>
                                <input type="text" id='pseudo-input-profile' name='username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="my-btn close" onClick={() => setShowModal(false)}>Fermer</button>
                                <button type="button" className=" my-btn save" onClick={saveUsername}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
}

export default Profile
