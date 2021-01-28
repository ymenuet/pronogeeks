import React, { useEffect, useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select } from 'antd'
import { createLeague } from '../services/geekLeague'
import { getProfile } from '../services/auth'
import { Context } from '../context'
import { ErrorMessage, Loader } from '../components'
import { openNotification, isEmpty } from '../helpers'
import '../styles/newGeekleague.css'

import * as geekActions from '../actions/geekActions'

const { Option } = Select

const NewGeekLeague = ({ history, loading, user, allGeeks, geekError, geekLoading, getAllGeeks }) => {
    const { loginUser } = useContext(Context)
    const [form] = Form.useForm()
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        if (isEmpty(allGeeks)) getAllGeeks()
    }, [allGeeks, getAllGeeks])

    const newLeague = async (values) => {
        if (!values.name || !values.geeks || values.geeks.length < 1) return openNotification('warning', 'Attention', 'Tous les champs sont requis.')
        setCreating(true)
        const geekLeague = await createLeague(values)
        openNotification('success', `Ligue "${values.name}" créée`)
        history.push(`/myGeekLeagues/${geekLeague._id}`)
        setCreating(false)
        const user = await getProfile()
        loginUser(user)
    }

    return <div className='geekleague-bg'>
        {creating || loading || geekLoading ? (

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

                                    {Object.values(allGeeks).filter(geek => geek._id !== user._id).map(geek => <Option
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

                                </Select> : <ErrorMessage>{geekError}</ErrorMessage>}

                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    type='submit'
                                    className='btn my-btn create-league-btn'
                                    style={{ marginTop: 10 }}
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
    geekError: state.geekReducer.error,
    geekLoading: state.geekReducer.loading
})

const mapDispatchToProps = { ...geekActions }

export default connect(mapStateToProps, mapDispatchToProps)(NewGeekLeague)