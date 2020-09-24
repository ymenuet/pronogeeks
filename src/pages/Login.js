import React, { useState, useContext } from 'react'
import { Form, Input, Button, Col, Row, Typography, notification } from 'antd'
import { login } from '../services/auth'
import { Context } from '../context'
import { Redirect } from 'react-router-dom'
import useInput from '../customHooks/useInput'

const { Title } = Typography

const Login = () => {
    const [form] = Form.useForm()
    const { loginUser, user } = useContext(Context)

    const onFinish = async (values) => {
        const user = await login(values).catch(err => openNotification(err.response.data.message))
        loginUser(user)
    }

    const openNotification = message => {
        notification.warning({
            message: "Error",
            description: message,
            placement: 'bottomLeft'
        })
    }

    return !user ? (
        <div className='my-content register-pages'>
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
                </div>
            </div>
        </div>
    ) : (
            <Redirect to='/profile' />
        )
}

export default Login
