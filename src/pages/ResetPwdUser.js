import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, notification } from 'antd'
import { updatePwd } from '../services/auth'
import { Context } from '../context'
import { Loader } from '../components'

const ResetPwd = ({ match: { params: { userID, renewToken } }, history }) => {

    const { user } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight',
            className: 'notification-box'
        })
    }

    const onFinish = async ({ password, passwordCopy }) => {
        if (password !== passwordCopy) return openNotification('warning', 'Les mots de passe sont différents.')
        setLoading(true)
        const passwordUpdated = await updatePwd(userID, renewToken, password).catch(err => {
            openNotification('error', 'Erreur', err.response.data.message.fr)
            setLoading(false)
        })
        if (passwordUpdated) {
            openNotification('success', 'Mot de passe actualisé.')
            history.push('/login')
            setLoading(false)
        }
    }

    return user ? <Redirect to='/profile' /> : loading ? (
        <div className='register-pages'>
            <Loader tip="Enregistrement du mot de passe..." color='rgb(4, 78, 199)' />
        </div>
    ) : (
            <div className='register-pages'>
                <div className='row signup-form'>
                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
                        <h2>Renouvelle ton mot de passe</h2>
                        <Form
                            form={form}
                            layout='vertical'
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Mot de passe :"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: `N'oublie pas ton mot de passe !`,
                                    },
                                ]}
                            >
                                <Input.Password style={{ borderRadius: 15.8 }} placeholder='********' />
                            </Form.Item>

                            <Form.Item
                                label="Répéter le mot de passe :"
                                name="passwordCopy"
                                rules={[
                                    {
                                        required: true,
                                        message: `N'oublie pas ton mot de passe !`,
                                    },
                                ]}
                            >
                                <Input.Password style={{ borderRadius: 15.8 }} placeholder='********' />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <button type='submit' className='btn register-btn my-btn submit-btn'>Confirmer</button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        )
}

export default ResetPwd
