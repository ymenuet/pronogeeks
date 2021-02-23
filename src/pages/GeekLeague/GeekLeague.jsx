import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { openNotification } from '../../helpers'
import { handleStateWithId, handleStateWithoutId } from '../../stateHandlers'
import { Loader, RankGeeks, ErrorMessage, GeekSelector } from '../../components'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { EditIcon, DeleteIcon, RemoveIcon, WarningIcon } from '../../components/Icons'
import './detailGeekleague.css'

import * as geekleagueActions from '../../actions/geekleagueActions'
import { getUndergoingSeasons } from '../../actions/seasonActions'

const GeekLeague = ({ match: { params: { geekLeagueID } }, history, loading, loadingGeekleague, user, geekleagues, geekleagueEdited, geekleagueDeleted, geekleagueOut, undergoingSeasons, getLeague, editLeague, deleteLeague, outLeague, getUndergoingSeasons }) => {
    const [geekLeague, setGeekLeague] = useState(null)
    const [seasons, setSeasons] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showOut, setShowOut] = useState(false)
    const [errorGeekLeague, setErrorGeekLeague] = useState(false)
    const [errorSeasons, setErrorSeasons] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        if (!geekleagueDeleted && !geekleagueOut) {
            handleStateWithId({
                id: geekLeagueID,
                reducerData: geekleagues,
                action: getLeague,
                setResult: setGeekLeague,
                setError: setErrorGeekLeague
            })
        }
    }, [geekLeagueID, geekleagues, getLeague, geekleagueDeleted, geekleagueOut])


    useEffect(() => {
        handleStateWithoutId({
            reducerData: undergoingSeasons,
            action: getUndergoingSeasons,
            setResult: setSeasons,
            setError: setErrorSeasons
        })
    }, [undergoingSeasons, getUndergoingSeasons])


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
                                        user={user}
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
                                    onFinish={({ name, geeks }) => editLeague(geekLeagueID, { name, geeks })}
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
                                    onClick={() => deleteLeague(geekLeagueID)}
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
                                    onClick={() => outLeague(geekLeagueID)}
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

const mapStateToProps = state => ({
    user: state.authReducer.user,
    geekleagues: state.geekleagueReducer.geekleagues,
    geekleagueEdited: state.geekleagueReducer.geekleagueEdited,
    geekleagueDeleted: state.geekleagueReducer.geekleagueDeleted,
    geekleagueOut: state.geekleagueReducer.geekleagueOut,
    loadingGeekleague: state.geekleagueReducer.loading,
    allGeeks: state.geekReducer.allGeeks,
    undergoingSeasons: state.seasonReducer.undergoingSeasons,
})

const mapDispatchToProps = {
    ...geekleagueActions,
    getUndergoingSeasons
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeague)
