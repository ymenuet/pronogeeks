import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'antd'
import { Loader, GeekSelector } from '../../components'
import { openNotification } from '../../utils/functions'
import './createGeekleague.css'

import { createLeague } from '../../actions/geekleagueActions'

const CreateGeekLeague = ({ history, loading, creatingLeague, geekleagues, createLeague }) => {
    const [form] = Form.useForm()
    const [existingLeagues, setExistingLeagues] = useState(null)
    const [newLeagueID, setNewLeagueID] = useState(null)


    useEffect(() => {
        const leaguesArray = Object.keys(geekleagues).filter(key => key !== 'empty')

        if (!existingLeagues) setExistingLeagues(leaguesArray)

        else if (leaguesArray.length > existingLeagues.length) {
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
        {creatingLeague || loading ? (

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


                            <GeekSelector />


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

    </div>
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    allGeeks: state.geekReducer.allGeeks,
    errorGeek: state.geekReducer.error,
    geekleagues: state.geekleagueReducer.geekleagues,
    creatingLeague: state.geekleagueReducer.loading,
})

const mapDispatchToProps = {
    createLeague
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGeekLeague)