import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { isEmpty, openNotification, sortByUsername } from '../helpers'
import { readGeekLeagueState } from '../stateReaders/geekLeague'
import { Loader, RankGeeks, ErrorMessage, ErrorNotification } from '../components'
import { Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import { EditIcon, DeleteIcon, RemoveIcon, WarningIcon } from '../components/Icons'
import '../styles/detailGeekleague.css'

import { getAllGeeks } from '../actions/geekActions'
import * as geekleagueActions from '../actions/geekleagueActions'
import { getUndergoingSeasons } from '../actions/seasonActions'

const { Option } = Select

const GeekLeague = ({ match: { params: { geekLeagueID } }, history, loading, loadingGeek, loadingSeason, loadingGeekleague, user, allGeeks, geekleagues, geekleagueEdited, geekleagueDeleted, geekleagueOut, undergoingSeasons, errorGeek, errorSeason, getAllGeeks, getLeague, editLeague, deleteLeague, outLeague, getUndergoingSeasons }) => {
    const [geekLeague, setGeekLeague] = useState(null)
    const [seasons, setSeasons] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showOut, setShowOut] = useState(false)
    const [filteredGeeks, setFilteredGeeks] = useState(null)
    const [form] = Form.useForm()

    useEffect(() => {
        if (!geekleagueDeleted && !geekleagueOut) {
            readGeekLeagueState({
                geekleagues,
                getLeague,
                geekLeagueID,
                setGeekLeague
            })
        }

    }, [geekLeagueID, geekleagues, getLeague, geekleagueDeleted, geekleagueOut])


    useEffect(() => {
        if (
            isEmpty(allGeeks) &&
            !loadingGeek &&
            !errorGeek
        ) getAllGeeks()

    }, [allGeeks, getAllGeeks, loadingGeek, errorGeek])


    useEffect(() => {
        if (!isEmpty(allGeeks) && geekLeague && !geekLeague.error) {
            let filteredGeeks = Object.values(allGeeks)
                .filter(geek => {
                    let result = true
                    geekLeague.geeks.map(leagueGeek => {
                        if (leagueGeek._id.toString() === geek._id.toString()) result = false
                        return leagueGeek
                    })
                    return result
                })
            filteredGeeks = sortByUsername(filteredGeeks)
            setFilteredGeeks(filteredGeeks)
        }
    }, [allGeeks, geekLeague])


    useEffect(() => {
        if (
            !undergoingSeasons.length &&
            !loadingSeason &&
            !errorSeason
        ) getUndergoingSeasons()

        else setSeasons(undergoingSeasons)

    }, [undergoingSeasons, loadingSeason, errorSeason, getUndergoingSeasons])


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
        {!geekLeague || !seasons || loading || loadingGeekleague ? (

            <Loader />

        ) : geekLeague.error ? <ErrorMessage>{geekLeague.error}</ErrorMessage> : (

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
                    {seasons.map(season => <div
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

                            <Form.Item
                                type='text'
                                label="Ajoute d'autres geeks :"
                                name="geeks"
                            >
                                {filteredGeeks ? <Select
                                    mode="multiple"
                                    style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left', outline: 'none' }}
                                    placeholder="Ajoute des geeks à ta ligue !"
                                    optionLabelProp="label"
                                    optionFilterProp='label'
                                >

                                    {filteredGeeks.map(geek => <Option
                                        key={geek._id}
                                        value={geek._id}
                                        label={geek.username}
                                    >

                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label={geek.username}>
                                                <img
                                                    src={geek.photo}
                                                    alt="profile"
                                                    className='profile-pic-preview'
                                                />
                                            </span>
                                                &nbsp;&nbsp;{geek.username}
                                        </div>

                                    </Option>)}

                                </Select> : <ErrorMessage>{errorGeek}</ErrorMessage>}
                            </Form.Item>

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

        <ErrorNotification types={['geekleague']} />

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
    loadingGeek: state.geekReducer.loading,
    errorGeek: state.geekReducer.error,
    undergoingSeasons: state.seasonReducer.undergoingSeasons,
    loadingSeason: state.seasonReducer.loading,
    errorSeason: state.seasonReducer.error
})

const mapDispatchToProps = {
    ...geekleagueActions,
    getAllGeeks,
    getUndergoingSeasons
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeague)
