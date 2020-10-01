import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { fetchLeague, editGeekLeague, deleteGeekLeague, outGeekLeague } from '../services/geekLeague'
import { getProfile } from '../services/auth'
import { getSeasons } from '../services/seasons'
import { getUsers } from '../services/user'
import { Spin, Space, Form, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Option } = Select

const GeekLeague = ({ match: { params: { geekLeagueID } }, history, loading }) => {
    const { user, loginUser } = useContext(Context)
    const [geekLeague, setGeekLeague] = useState(null)
    const [seasons, setSeasons] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showOut, setShowOut] = useState(false)
    const [users, setUsers] = useState(null)
    const [form] = Form.useForm()

    useEffect(() => {
        const getLeague = async () => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getLeague()
    }, [geekLeagueID])

    useEffect(() => {
        const getAllSeasons = async () => {
            const seasons = await getSeasons()
            setSeasons(seasons)
        }
        getAllSeasons()
        const fetchUsers = async () => {
            if (geekLeague) {
                const allUsers = await getUsers()
                const users = allUsers.filter(oneUser => {
                    let result = true
                    geekLeague.geeks.forEach(geek => {
                        if (geek._id.toString() === oneUser._id.toString()) result = false
                    })
                    return result
                })
                setUsers(users)
            }
        }
        fetchUsers()
    }, [geekLeague])

    const editLeague = async values => {
        const geekLeague = await editGeekLeague(geekLeagueID, values.name, values.geeks)
        setShowModal(false)
        setGeekLeague(geekLeague)
        const user = await getProfile()
        loginUser(user)
    }

    const deleteLeague = async () => {
        await deleteGeekLeague(geekLeagueID)
        const user = await getProfile()
        loginUser(user)
        history.push('/myGeekLeagues')
    }

    const outLeague = async () => {
        await outGeekLeague(geekLeagueID)
        const user = await getProfile()
        loginUser(user)
        history.push('/myGeekLeagues')
    }

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er(e)'
        else return `${num}ème`
    }

    return <div className='geekleague-bg geekleague-details'>
        {!geekLeague || !seasons || loading ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : (
                <div className='geekleague-page container'>
                    <h2>Ligue "{geekLeague.name}"
                            {geekLeague.creator.toString() === user._id.toString() && <>
                            <button onClick={() => {
                                setShowModal(!showModal)
                                setShowDelete(false)
                            }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg></button>
                            <button onClick={() => {
                                setShowDelete(!showDelete)
                                setShowModal(false)
                            }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                        </>}
                        {geekLeague.creator.toString() !== user._id.toString() &&
                            <button onClick={() => setShowOut(!showOut)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M0 0h24v24H0z" fill="none" /><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg></button>
                        }
                    </h2>
                    <div className='row geekleague-seasons' onClick={() => {
                        setShowModal(false)
                        setShowDelete(false)
                        setShowOut(false)
                    }}>
                        {seasons.map(season => <div key={season._id} className='league-season-ranking-container col-12 col-lg-6'>
                            <div className='league-season-ranking'>
                                <h4>{season.leagueName} saison {season.year}</h4>
                                <ul className='list-group list-group-flush geekleague-ranking-detail mt-2'>
                                    {geekLeague.geeks.sort((a, b) => {
                                        let result;
                                        if (!a.seasons && !b.seasons) result = -1
                                        else if (!a.seasons) result = 1
                                        else if (!b.seasons) result = -1
                                        else if (a.seasons.length > 0 && b.seasons.length > 0) {
                                            result = b.seasons.filter(seas => seas.season.toString() === season._id.toString())[0].totalPoints - a.seasons.filter(seas => seas.season.toString() === season._id.toString())[0].totalPoints
                                        } else if (a.seasons.length > 0 && b.seasons.length < 1) result = -1
                                        else if (a.seasons.length < 1 && b.seasons.length > 0) result = 1
                                        else if (a.seasons.length < 1 && b.seasons.length < 1) result = -1
                                        return result
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
                    {showModal && <div className='my-modal-edit-geekleague'>
                        <div className="my-modal-body">
                            <span className='close-edit-modal' onClick={() => setShowModal(false)}>X</span>
                            <h5 className="modal-title">Modifier "{geekLeague.name}" :</h5>
                            <hr />
                            <Form
                                form={form}
                                layout='vertical'
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={editLeague}
                            >
                                <Form.Item
                                    type='text'
                                    label="Nom de la ligue :"
                                    name="name"
                                    color='black'
                                >
                                    <Input style={{ borderRadius: 15.8 }} placeholder={geekLeague.name} />
                                </Form.Item>
                                <Form.Item
                                    type='text'
                                    label="Ajoute d'autres geeks :"
                                    name="geeks"

                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left', outline: 'none' }}
                                        placeholder="Ajoute des geeks à ta ligue !"
                                        optionLabelProp="label"
                                        optionFilterProp='label'
                                    >
                                        {users?.map(user => <Option key={user._id} value={user._id} label={user.username}>
                                            <div className="demo-option-label-item">
                                                <span role="img" aria-label={user.username}>
                                                    <img src={user.photo} alt="profile" className='profile-pic-preview' />
                                                </span>
                                        &nbsp;&nbsp;{user.username}
                                            </div>
                                        </Option>)}
                                    </Select>
                                </Form.Item>
                                <button type="submit" className=" my-btn save">Enregistrer</button>
                            </Form>
                        </div>
                    </div>}
                    {showDelete && <div className='my-modal-delete-geekleague'>
                        <div className="my-modal-body">
                            <span className='close-delete-modal' onClick={() => setShowDelete(false)}>X</span>
                            <h5 className="modal-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(253, 0, 7)" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>&nbsp;
                                Es-tu sûr de vouloir supprimer "{geekLeague.name}" ?
                                </h5>
                            <hr />
                            <button type="button" className=" my-btn delete" onClick={deleteLeague}>Oui, supprimer</button>
                            <button type="button" className=" my-btn return" onClick={() => setShowDelete(false)}>Non ! Annuler</button>
                        </div>
                    </div>}
                    {showOut && <div className='my-modal-delete-geekleague'>
                        <div className="my-modal-body">
                            <span className='close-delete-modal' onClick={() => setShowOut(false)}>X</span>
                            <h5 className="modal-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(253, 0, 7)" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>&nbsp;
                                Es-tu sûr de vouloir sortir de "{geekLeague.name}" ?
                                </h5>
                            <hr />
                            <button type="button" className=" my-btn delete" onClick={outLeague}>Oui, sortir</button>
                            <button type="button" className=" my-btn return" onClick={() => setShowOut(false)}>Non ! Annuler</button>
                        </div>
                    </div>}
                </div>
            )}
    </div>
}

export default GeekLeague
