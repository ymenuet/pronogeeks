import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../context'
import { fetchLeague } from '../services/geekLeague'
import { getSeasons } from '../services/seasons'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const GeekLeague = ({ match: { params: { geekLeagueID } } }) => {
    const { user } = useContext(Context)
    const [geekLeague, setGeekLeague] = useState(null)
    const [seasons, setSeasons] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getLeague = async () => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getLeague()
        const getAllSeasons = async () => {
            const seasons = await getSeasons()
            setSeasons(seasons)
        }
        getAllSeasons()
    }, [geekLeagueID])

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er(e)'
        else return `${num}ème`
    }

    return <div className='geekleague-bg geekleague-details'>
        {!geekLeague || !seasons ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : !user ? (
            <Redirect to='/login' />
        ) : (
                    <div className='geekleague-page container'>
                        <h2>Ligue {geekLeague.name}
                            {geekLeague.creator.toString() === user._id.toString() && <button onClick={() => setShowModal(!showModal)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg></button>}
                        </h2>
                        <div className='row geekleague-seasons'>
                            {seasons.map(season => <div key={season._id} className='league-season-ranking-container col-12 col-lg-6'>
                                <div className='league-season-ranking'>
                                    <h4>{season.leagueName} saison {season.year}</h4>
                                    <ul className='list-group list-group-flush geekleague-ranking-detail mt-2'>
                                        {geekLeague.geeks.sort((a, b) => {
                                            if (a.seasons.length > 0 && b.seasons.length > 0) {
                                                return b.seasons.filter(seas => seas.season.toString() === season._id.toString())[0].totalPoints - a.seasons.filter(seas => seas.season.toString() === season._id.toString())[0].totalPoints
                                            } else if (a.seasons.length > 0 && b.seasons.length < 1) return -1
                                            else if (a.seasons.length < 1 && b.seasons.length > 0) return 1
                                            else if (a.seasons.length < 1 && b.seasons.length < 1) return -1
                                        })
                                            .map((geek, index) => <li className='list-group-item d-flex justify-content-between align-items-center' key={geek._id}>
                                                {geek._id === user._id && <span><b>{setRank(index + 1)} : {geek.username}</b></span>}
                                                {geek._id !== user._id && <span>{setRank(index + 1)} : {geek.username}</span>}
                                                {geek.seasons.length > 0 && <span className='badge badge-success badge-pill my-badge'>{geek.seasons.filter(seas => seas.season.toString() === season._id.toString())[0]?.totalPoints} pts</span>}
                                                {geek.seasons.length < 1 && <span className='badge badge-success badge-pill my-badge'>0 pts</span>}
                                            </li>)
                                        }
                                    </ul>
                                </div>
                            </div>)}
                        </div>
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
                                        <input type="text" id='pseudo-input-profile' name='username' />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="my-btn close" onClick={() => setShowModal(false)}>Fermer</button>
                                        <button type="button" className=" my-btn save">Enregistrer</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                )}
    </div>
}

export default GeekLeague
