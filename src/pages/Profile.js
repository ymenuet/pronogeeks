import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { updatePhoto } from '../services/auth'
import { fetchPlayers, deleteUserAccount } from '../services/user'
import axios from 'axios'
import { Loader, RankGeeks, ErrorNotification } from '../components'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'
import { isConnected, openNotification, rankGeeks } from '../helpers'
import { EditIcon, WarningIcon } from '../components/Icons'
import '../styles/profile.css'

import * as authActions from '../actions/authActions'

const Profile = ({ loading, history, user, usernameLoading, updateUsername }) => {
    const { loginUser, logoutUser } = useContext(Context)
    const [photoLoading, setPhotoLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [seasonID, setSeasonID] = useState(null)
    const [seasonRankingFull, setSeasonRankingFull] = useState(null)
    const [seasonRanking, setSeasonRanking] = useState(null)
    const [userRanking, setUserRanking] = useState(null)

    useEffect(() => {
        if (isConnected(user)) {
            const getPlayers = async () => {
                if (user.seasons.length > 0) {
                    const seasonID = user.seasons[user.seasons.length - 1].season._id.toString()
                    setSeasonID(user.seasons[user.seasons.length - 1].season._id.toString())
                    const players = await fetchPlayers(seasonID)
                    const rankedPlayers = rankGeeks(players, seasonID)
                    const userRanking = rankedPlayers.map(player => player._id).indexOf(user._id)
                    const rankedPlayers20 = rankedPlayers.slice(0, 20)
                    setUserRanking(userRanking)
                    setSeasonRankingFull(rankedPlayers)
                    setSeasonRanking(rankedPlayers20)
                }
            }
            getPlayers()
        }
    }, [user])

    useEffect(() => {
        if (isConnected(user)) {
            setUsernameInput(user.username)
        }
    }, [user])

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

    const saveUsername = () => {
        setShowModal(false)
        updateUsername(usernameInput)
    }

    const removeAccount = async () => {
        const userID = user._id
        logoutUser()
        history.push('/')
        await deleteUserAccount(userID)
    }

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er(e)'
        else return `${num}ème`
    }

    const defineUserRank = (seasonRanking, league) => {
        return seasonRanking.filter(player => {
            let result = false
            league.geeks.map(geek => {
                if (geek._id === player._id) result = true
                return geek
            })
            return result
        }).map(player => player._id).indexOf(user._id) + 1
    }

    const printEditIcon = () => usernameLoading ? <Loader
        container={false}
        tip=''
        fontSize='2.5rem'
    /> : <button onClick={() => setShowModal(!showModal)}>
            <EditIcon />
        </button>

    return loading ? (<div className='my-profile-page'>
        <Loader />
    </div>
    ) : (
            <div className='my-profile-page row'>

                <div className='my-profile col-10 offset-1 col-lg-4'>

                    <section className='about-section'>

                        <h2>Bonjour {user.username}
                            {printEditIcon()}
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
                                    <span className='badge badge-success badge-pill my-badge my-badge-ranking my-badge-ranking-header'>{setRank(defineUserRank(seasonRankingFull, league))} / {league.geeks.length}</span>

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

                            <RankGeeks
                                user={user}
                                userRanking={userRanking}
                                players={seasonRanking}
                                seasonID={seasonID}
                                generalRanking
                            />

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

                <ErrorNotification types={['auth']} />

            </div>
        )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    usernameLoading: state.authReducer.usernameLoading,
    authError: state.authReducer.error,
})

const mapDispatchToProps = authActions

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
