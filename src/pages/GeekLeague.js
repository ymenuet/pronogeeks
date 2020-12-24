import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { fetchLeague, editGeekLeague, deleteGeekLeague, outGeekLeague } from '../services/geekLeague'
import { getProfile } from '../services/auth'
import { getSeasons } from '../services/seasons'
import { getUsers } from '../services/user'
import { rankGeeks } from '../helpers'
import { Loader, RankingGeek } from '../components'
import { Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import { EditIcon, DeleteIcon, RemoveIcon, WarningIcon } from '../components/Icons'
import '../styles/detailGeekleague.css'

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
                    geekLeague.geeks.map(geek => {
                        if (geek._id.toString() === oneUser._id.toString()) result = false
                        return geek
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

    return <div className='geekleague-bg geekleague-details'>
        {!geekLeague || !seasons || loading ? (

            <Loader />

        ) : (

                <div className='geekleague-page container'>

                    <h2>
                        Ligue "{geekLeague.name}"{geekLeague.creator.toString() === user._id.toString() && <>

                            <button onClick={() => {
                                setShowModal(!showModal)
                                setShowDelete(false)
                            }}>
                                <EditIcon />
                            </button>

                            <button onClick={() => {
                                setShowDelete(!showDelete)
                                setShowModal(false)
                            }}>
                                <DeleteIcon />
                            </button>

                        </>}

                        {geekLeague.creator.toString() !== user._id.toString() &&
                            <button onClick={() => setShowOut(!showOut)}>
                                <RemoveIcon />
                            </button>
                        }

                    </h2>

                    <div
                        className='row geekleague-seasons'
                        onClick={() => {
                            setShowModal(false)
                            setShowDelete(false)
                            setShowOut(false)
                        }}
                    >
                        {seasons.map(season => <div
                            key={season._id}
                            className='ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3'
                        >
                            <div className='league-season-ranking'>

                                <h4>{season.leagueName} saison {season.year}<br />Classement général</h4>

                                <Link to={`/myGeekLeagues/${geekLeagueID}/season/${season._id}`}>
                                    <button className='btn my-btn see-more-btn'>Détails par journée</button>
                                </Link>

                                <ul className='list-group list-group-flush geekleague-ranking-detail'>

                                    {rankGeeks(geekLeague.geeks, season._id).map((geek, index) => <RankingGeek
                                        key={geek._id}
                                        user={user}
                                        geek={geek}
                                        index={index}
                                        seasonID={season._id}
                                    />)
                                    }
                                </ul>

                                <Link to={`/myGeekLeagues/${geekLeagueID}/season/${season._id}`}>
                                    <button className='btn my-btn see-more-btn'>Détails par journée</button>
                                </Link>

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
                                onFinish={editLeague}
                                initialValues={{
                                    remember: true,
                                }}
                            >

                                <Form.Item
                                    type='text'
                                    label="Nom de la ligue :"
                                    name="name"
                                    color='black'
                                >
                                    <Input
                                        style={{ borderRadius: 15.8 }}
                                        placeholder={geekLeague.name}
                                    />
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

                                        {users?.map(user => <Option
                                            key={user._id}
                                            value={user._id}
                                            label={user.username}
                                        >

                                            <div className="demo-option-label-item">
                                                <span role="img" aria-label={user.username}>
                                                    <img
                                                        src={user.photo}
                                                        alt="profile"
                                                        className='profile-pic-preview'
                                                    />
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

                            <span
                                className='close-delete-modal'
                                onClick={() => setShowDelete(false)}
                            >
                                X
                            </span>

                            <h5 className="modal-title">
                                <WarningIcon />
                                &nbsp;
                                Es-tu sûr de vouloir supprimer "{geekLeague.name}" ?
                            </h5>

                            <hr />

                            <button
                                type="button"
                                className="my-btn delete"
                                onClick={deleteLeague}
                            >
                                Oui, supprimer
                            </button>

                            <button
                                type="button"
                                className="my-btn return"
                                onClick={() => setShowDelete(false)}
                            >
                                Non ! Annuler
                            </button>

                        </div>

                    </div>}

                    {showOut && <div className='my-modal-delete-geekleague'>

                        <div className="my-modal-body">

                            <span
                                className='close-delete-modal'
                                onClick={() => setShowOut(false)}
                            >
                                X
                            </span>

                            <h5 className="modal-title">
                                <WarningIcon />
                                &nbsp;
                                Es-tu sûr de vouloir sortir de "{geekLeague.name}" ?
                            </h5>

                            <hr />

                            <button
                                type="button"
                                className="my-btn delete"
                                onClick={outLeague}
                            >
                                Oui, sortir
                            </button>

                            <button
                                type="button"
                                className="my-btn return"
                                onClick={() => setShowOut(false)}
                            >
                                Non ! Annuler
                            </button>

                        </div>

                    </div>}

                </div>
            )}
    </div>
}

export default GeekLeague
