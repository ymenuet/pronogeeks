import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select } from 'antd'
import { ErrorMessage, Loader, ErrorNotification } from '../components'
import { openNotification, isEmpty, sortByUsername } from '../helpers'
import '../styles/newGeekleague.css'

import { getAllGeeks } from '../actions/geekActions'
import { createLeague } from '../actions/geekleagueActions'

const { Option } = Select

const NewGeekLeague = ({ history, loading, loadingGeek, creatingLeague, user, allGeeks, geekleagues, errorGeek, getAllGeeks, createLeague }) => {
    const [form] = Form.useForm()
    const [existingLeagues, setExistingLeagues] = useState(null)
    const [newLeagueID, setNewLeagueID] = useState(null)

    useEffect(() => {
        if (isEmpty(allGeeks) && !loadingGeek) getAllGeeks()
    }, [allGeeks, getAllGeeks, loadingGeek])

    useEffect(() => {
        if (!existingLeagues) setExistingLeagues(Object.keys(geekleagues))

        else if (Object.keys(geekleagues).length > existingLeagues.length) {
            const newLeagueID = Object.keys(geekleagues).filter(id => !existingLeagues.includes(id))[0]
            setNewLeagueID(newLeagueID)
        }

    }, [geekleagues, existingLeagues])

    useEffect(() => {
        if (newLeagueID) {
            openNotification('success', `Nouvelle ligue créée !`)
            history.push(`/myGeekLeagues/${newLeagueID}`)
        }

    }, [history, newLeagueID])


    const newLeague = async ({ name, geeks }) => {
        if (!name || !geeks || !geeks.length) return openNotification('warning', 'Attention', 'Tous les champs sont requis.')
        createLeague({ name, geeks })
    }


    return <div className='geekleague-bg'>
        {creatingLeague || loading || loadingGeek ? (

            <Loader />

        ) : (

                <div className='geekleague-form'>

                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>

                        <h2>Créer une ligue</h2>

                        <Form
                            form={form}
                            layout='vertical'
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={newLeague}
                        >

                            <Form.Item
                                type='text'
                                label="Nom de la ligue :"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: `Le nom de ligue est nécessaire.`,
                                    },
                                ]}
                            >

                                <Input
                                    style={{ borderRadius: 15.8 }}
                                    placeholder='Ma Ligue Geek'
                                />

                            </Form.Item>

                            <Form.Item
                                type='text'
                                label="Sélectionne d'autres geeks :"
                                name="geeks"
                                rules={[
                                    {
                                        required: true,
                                        message: `Tu ne peux pas créer de ligue sans autres geeks.`,
                                    },
                                ]}
                            >

                                {!isEmpty(allGeeks) ? <Select
                                    mode="multiple"
                                    style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left' }}
                                    placeholder="Ajoute des geeks à ta ligue !"
                                    optionLabelProp="label"
                                    optionFilterProp='label'
                                >

                                    {sortByUsername(Object.values(allGeeks)).filter(geek => geek._id !== user._id).map(geek => <Option
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

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    type='submit'
                                    className='btn my-btn create-league-btn'
                                    style={{ marginTop: 10 }}
                                    disabled={creatingLeague}
                                >
                                    Créer ligue
                                </button>
                            </div>

                        </Form>

                    </div>

                </div>
            )
        }

        <ErrorNotification types={['geekleague']} />

    </div>
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    allGeeks: state.geekReducer.allGeeks,
    errorGeek: state.geekReducer.error,
    loadingGeek: state.geekReducer.loading,
    geekleagues: state.geekleagueReducer.geekleagues,
    creatingLeague: state.geekleagueReducer.loading,
})

const mapDispatchToProps = {
    getAllGeeks,
    createLeague
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGeekLeague)