import React, { useState, useContext } from 'react'
import { Form, Input, Button, Col, Row, Typography, notification } from 'antd'
import { login } from '../services/auth'
import { Context } from '../context'
import { Redirect } from 'react-router-dom'

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
        <Row>
            <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 12, offset: 6 }} >
                <Title level={1} style={{ textAlign: 'center', color: 'rgb(0,37,0)', marginBottom: 20 }}>Se connecter</Title>
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
                        label="Email :"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: `L'email est nécessaire pour te connecter à ton compte`,
                            },
                        ]}
                    >
                        <Input />
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
                        <Input.Password />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='primary' style={{ backgroundColor: 'rgb(73,56,67)', border: 'none', marginTop: 10 }} htmlType="submit">Connexion</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    ) : (
            <Redirect to='/profile' />
        )
}

export default Login
