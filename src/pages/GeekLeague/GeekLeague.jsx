import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openNotification } from '../../utils/functions'
import { useGeekLeague, useUndergoingSeasons, useUser } from '../../utils/hooks'
import { Loader, RankGeeks, ErrorMessage, GeekSelector } from '../../components'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { EditIcon, DeleteIcon, RemoveIcon, WarningIcon } from '../../components/Icons'
import './detailGeekleague.css'

import { editLeague, deleteLeague, outLeague } from '../../actions/geekleagueActions'

const GeekLeague = ({ match: { params: { geekLeagueID } }, history, loading }) => {
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showOut, setShowOut] = useState(false)
    const [form] = Form.useForm()

    const { user } = useUser()

    const { geekLeague, errorGeekLeague } = useGeekLeague(geekLeagueID)

    const { seasons, errorSeasons } = useUndergoingSeasons()

    const { geekleagueEdited, geekleagueDeleted, geekleagueOut, loadingGeekleague } = useSelector(({ geekleagueReducer }) => ({
        geekleagueEdited: geekleagueReducer.geekleagueEdited,
        geekleagueDeleted: geekleagueReducer.geekleagueDeleted,
        geekleagueOut: geekleagueReducer.geekleagueOut,
        loadingGeekleague: geekleagueReducer.loading,
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        if (geekleagueEdited) {
            setShowModal(false)
            openNotification('success', 'Ligue actualisée.')
        }

    }, [geekleagueEdited])


    useEffect(() => {
        if (geekleagueDeleted) {
            setShowDelete(false)
            openNotification('success', 'Ligue supprimée.')
            history.push('/myGeekLeagues')
        }

    }, [geekleagueDeleted, history])


    useEffect(() => {
        if (geekleagueOut) {
            setShowOut(false)
            openNotification('success', `Tu as bien quitté la ligue "${geekLeague.name}".`)
            history.push('/myGeekLeagues')
        }

    }, [geekleagueOut, history, geekLeague])


    return <div className='geekleague-bg geekleague-details'>

        {errorGeekLeague || errorSeasons ? (

            <ErrorMessage>{errorGeekLeague || errorSeasons}</ErrorMessage>

        ) : !geekLeague || !seasons || loading || loadingGeekleague ? (

            <Loader />

        ) : (

            <div className='geekleague-page container'>

                <h2>
                    Ligue "{geekLeague.name}"{geekLeague.creator._id.toString() === user._id.toString() && <>

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

                    {geekLeague.creator._id.toString() !== user._id.toString() &&
                        geekLeague.geeks.map(({ _id }) => _id).includes(user._id.toString()) &&
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
                    {Object.values(seasons).map(season => <div
                        key={season._id}
                        className='ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3'
                    >
                        <div className='league-season-ranking'>

                            <h4>{season.leagueName} saison {season.year}<br />Classement général</h4>

                            <Link to={`/myGeekLeagues/${geekLeagueID}/season/${season._id}`}>
                                <button className='btn my-btn see-more-btn'>Détails par journée</button>
                            </Link>

                            <RankGeeks
                                players={geekLeague.geeks}
                                seasonID={season._id}
                            />

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
                            onFinish={({ name, geeks }) => dispatch(editLeague(geekLeagueID, { name, geeks }))}
                        >

                            <Form.Item
                                type='text'
                                label="Nom de la ligue :"
                                name="name"
                                color='black'
                                initialValue={geekLeague.name}
                            >
                                <Input
                                    style={{ borderRadius: 15.8 }}
                                    placeholder={geekLeague.name}
                                />
                            </Form.Item>

                            <GeekSelector geekLeague={geekLeague} />

                            <button
                                type="submit"
                                className=" my-btn save"
                                disabled={loadingGeekleague}
                            >
                                Enregistrer
                            </button>

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
                            onClick={() => dispatch(deleteLeague(geekLeagueID))}
                            disabled={loadingGeekleague}
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
                            onClick={() => dispatch(outLeague(geekLeagueID))}
                            disabled={loadingGeekleague}
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
