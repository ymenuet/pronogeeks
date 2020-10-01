import React, { useContext } from 'react'
import { Form, Input, notification } from 'antd'
import { login } from '../services/auth'
import { Context } from '../context'
import { Redirect } from 'react-router-dom'

const Login = ({ history }) => {
    const [form] = Form.useForm()
    const { loginUser, user } = useContext(Context)

    const onFinish = async (values) => {
        const user = await login(values).catch(err => openNotification(err.response.data.message))
        loginUser(user)
        history.push('/profile')
    }

    const openNotification = message => {
        notification.warning({
            message: "Error",
            description: message,
            placement: 'bottomRight',
            className: 'notification-box'
        })
    }

    return user ? <Redirect to='/profile' /> : (
        <div className='register-pages'>
            <div className='row signup-form'>
                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
                    <h2>Se connecter</h2>
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
                            type='email'
                            label="Email :"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: `L'email est nécessaire pour te connecter à ton compte`,
                                },
                            ]}
                        >
                            <Input style={{ borderRadius: 15.8 }} placeholder='roi.geek@pronogeeks.fr' />
                        </Form.Item>

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

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type='submit' className='btn register-btn my-btn submit-btn'>Me connecter</button>
                        </div>
                    </Form>
                    <div className='social-logins'>
                        <h4>Se connecter avec :</h4>
                        <div className='social-login-links'>
                            <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/facebook`}><img src='/images/facebook-logo.png' alt='Facebook' /></a>
                            <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/google`}><img src='/images/google-logo.png' alt='Google' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
