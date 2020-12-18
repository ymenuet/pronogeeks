import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateProfile, getProfile, updatePhoto } from '../services/auth'
import { fetchPlayers, deleteUserAccount } from '../services/user'
import axios from 'axios'
import { Loader, RankingGeek } from '../components'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'
import { openNotification } from '../helpers'
import { EditIcon, WarningIcon } from '../components/Icons'

const Profile = ({ loading, history }) => {
    const { user, loginUser, logoutUser } = useContext(Context)
    const [photoLoading, setPhotoLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [usernameChanged, setUsernameChanged] = useState(false)
    const [seasonID, setSeasonID] = useState(null)
    const [seasonRankingFull, setSeasonRankingFull] = useState(null)
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
        await updateProfile({ username: usernameInput }).catch(err => {
            saved = false
            openNotification('warning', 'Attention', err.response.data.message.fr)
        })
        if (saved) {
            setUsernameChanged(true)
            const user = await getProfile()
            loginUser(user)
            setShowModal(false)
            setUsernameChanged(false)
        }
    }

    const removeAccount = async () => {
        const userID = user._id
        logoutUser()
        history.push('/')
        await deleteUserAccount(userID)
    }

    useEffect(() => {
        setUsernameInput(user?.username)
        const getPlayers = async () => {
            if (user?.seasons.length > 0) {
                const seasonID = user.seasons[user.seasons.length - 1].season._id.toString()
                setSeasonID(user.seasons[user.seasons.length - 1].season._id.toString())
                const players = await fetchPlayers(seasonID)
                const rankedPlayers = players.sort((a, b) => {
                    return b.seasons.filter(season => season.season.toString() === seasonID)[0].totalPoints - a.seasons.filter(season => season.season.toString() === seasonID)[0].totalPoints
                })
                const userRanking = rankedPlayers.map(player => player.username).indexOf(user.username) + 1
                const rankedPlayers20 = rankedPlayers.slice(0, 20)
                setUserRanking(userRanking)
                setSeasonRankingFull(rankedPlayers)
                setSeasonRanking(rankedPlayers20)
            }
        }
        getPlayers()
    }, [user])

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er(e)'
        else return `${num}ème`
    }

    return usernameChanged || loading ? (<div className='my-profile-page'>
        <Loader />
    </div>
    ) : (
            <div className='my-profile-page row'>

                <div className='my-profile col-10 offset-1 col-lg-4'>

                    <section className='about-section'>

                        <h2>Bonjour {user.username}
                            <button onClick={() => setShowModal(!showModal)}>
                                <EditIcon />
                            </button>
                        </h2>

                        <div className='profile-details'>

                            <div className='profile-picture-container'>

                                {!photoLoading && <img
                                    src={user.photo}
                                    alt="Profile pic"
                                    className='profile-pic'
                                />}

                                {photoLoading && <div className='profile-pic'>

                                    <Space size='medium'>
                                        <Spin
                                            size='medium'
                                            tip='Chargement de la photo...'
                                            style={{ color: 'rgb(26, 145, 254)' }}
                                            indicator={<LoadingOutlined
                                                style={{ color: 'rgb(26, 145, 254)', fontSize: '2rem', marginBottom: 8 }}
                                                spin
                                            />}
                                        />
                                    </Space>

                                </div>}

                                <label
                                    className='first-file-label'
                                    htmlFor="profile-pic-input"
                                >
                                    Changer de photo de profil :
                                </label>

                                <div className="custom-file">

                                    <label
                                        className="profile-image custom-file-label"
                                        htmlFor="profile-pic-input"
                                    >
                                        Charger une photo

                                        <input
                                            id="profile-pic-input"
                                            type="file"
                                            name="image"
                                            className="custom-file-input"
                                            onChange={uploadPhoto}
                                        />

                                    </label>

                                </div>
                            </div>

                            {user.seasons.length > 0 && user.seasons[user.seasons.length - 1].favTeam && <div className='favteam-info'>

                                <div>
                                    <img
                                        src={user.seasons[user.seasons.length - 1].favTeam.logo}
                                        alt="Logo équipe de coeur"
                                    />
                                </div>

                                <h5>{user.seasons[user.seasons.length - 1].favTeam.name} est ton équipe de coeur<br />pour la saison {user.seasons[user.seasons.length - 1].season.year} de {user.seasons[user.seasons.length - 1].season.leagueName}.</h5>

                            </div>}

                        </div>

                    </section>

                    <section className='geekleagues-section'>

                        <h2>Ligues Geek</h2>

                        <Link to='/myGeekLeagues/new' className='btn my-btn new-league'>Nouvelle ligue</Link>

                        {user.geekLeagues.length > 0 && <ul className='list-group list-group-flush geekleagues-list-profile mt-4'>

                            {seasonID && !seasonRankingFull && <div className='pt-4'>

                                <Space size='large'>
                                    <Spin
                                        size='large'
                                        tip='Chargement des ligues...'
                                        style={{ color: 'white', fontSize: '1.2rem' }}
                                        indicator={<LoadingOutlined
                                            style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }}
                                            spin
                                        />}
                                    />
                                </Space>

                            </div>}

                            {seasonRankingFull && <li className='list-group-item d-flex justify-content-between align-items-center mb-2'>
                                <span className='username-ranking'><b>Ligues</b></span>
                                <span className='username-ranking'><b>Classement</b></span>
                            </li>}

                            {seasonRankingFull && user.geekLeagues.map(league => <Link
                                to={`/myGeekLeagues/${league._id}`}
                                key={league._id}
                            >
                                <li className='list-group-item d-flex justify-content-between align-items-center'>

                                    <span className='username-ranking' style={{ color: 'rgb(4, 78, 199)' }}>{league.name}</span>
                                    <span className='badge badge-success badge-pill my-badge my-badge-ranking my-badge-ranking-header'>{setRank(seasonRankingFull.filter(player => {
                                        let result = false
                                        league.geeks.forEach(geek => {
                                            if (geek._id === player._id) result = true
                                        })
                                        return result
                                    }).map(player => player._id).indexOf(user._id) + 1)} / {league.geeks.length}</span>

                                </li>
                            </Link>)}

                        </ul>}

                    </section>

                </div>

                <div
                    className='col-10 offset-1 col-lg-4 offset-lg-2'
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                >

                    {seasonID && <section className='my-profile-ranking pt-4'>

                        {!seasonRanking && <div>

                            <Space size='large'>
                                <Spin
                                    size='large'
                                    tip='Chargement du classement...'
                                    style={{ color: 'white', fontSize: '1.2rem' }}
                                    indicator={<LoadingOutlined
                                        style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }}
                                        spin
                                    />}
                                />
                            </Space>

                        </div>}

                        {seasonRanking && <>

                            <h2 style={{ marginTop: 0 }}>{user.seasons[user.seasons.length - 1].season.leagueName} saison {user.seasons[user.seasons.length - 1].season.year}<br />Classement général</h2>

                            <ul className='list-group list-group-flush season-ranking'>

                                <li className='list-group-item d-flex justify-content-between align-items-center mb-2'>
                                    <span className='username-ranking'><b>{setRank(userRanking)} : {user.username}</b></span>
                                    <span className='badge badge-success badge-pill my-badge my-badge-ranking my-badge-ranking-header'>{user.seasons[user.seasons.length - 1].totalPoints} pts</span>
                                </li>

                                {seasonRanking.map((player, index) => <RankingGeek
                                    key={player._id}
                                    user={user}
                                    geek={player}
                                    index={index}
                                    seasonID={seasonID}
                                />

                                )}

                            </ul>

                        </>}

                    </section>}

                    <div className='delete-account'>
                        <button
                            onClick={() => setDeleteAccount(!deleteAccount)}
                            className='btn my-btn delete-account-btn'
                        >
                            Supprimer compte
                        </button>
                    </div>

                </div>

                {showModal && <div
                    id="update-username-modal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="update-username-modal-title"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Changer de pseudo :</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <label htmlFor="pseudo-input-profile">Entrer un nouveau pseudo :</label>
                                <input
                                    type="text"
                                    id='pseudo-input-profile'
                                    name='username'
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                />
                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="my-btn close"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fermer
                                </button>

                                <button
                                    type="button"
                                    className="my-btn save"
                                    onClick={saveUsername}
                                >
                                    Enregistrer
                                </button>

                            </div>

                        </div>

                    </div>

                </div>}

                {deleteAccount && <div
                    id="delete-account-modal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="delete-account-modal-title"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Supprimer mon compte</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setDeleteAccount(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <p>
                                    <WarningIcon />
                                Es-tu sûr de vouloir supprimer ton compte ? Toutes tes données seront perdues...
                                </p>
                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="my-btn close-delete"
                                    onClick={() => setDeleteAccount(false)}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="button"
                                    className="my-btn delete-account-btn"
                                    onClick={removeAccount}
                                >
                                    Supprimer
                                </button>
                            </div>

                        </div>

                    </div>

                </div>}

            </div>
        )
}

export default Profile
