import React from 'react'
import { Form, Input, Button, Col, Row, Typography, notification } from 'antd'
import { signup } from '../services/auth'

const { Title } = Typography

const Signup = ({ history }) => {
    const [form] = Form.useForm()

    const onFinish = async ({ email, username, password }) => {
        const emailCorrect = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLowerCase())
        const signedup = await signup({ email, username, password })

        if (!emailCorrect) openNotification(`Je crois qu'il y a une faute de frappe dans ton email...`)
        else if (signedup.status === 'OK') history.push('/login')
        else openNotification(signedup.message.fr)
    }

    const openNotification = message => {
        notification.warning({
            message: "Erreur",
            description: message,
            placement: 'bottomLeft'
        })
    }

    return (
        <Row>
            <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 12, offset: 6 }} >
                <Title level={1} style={{ textAlign: 'center', color: 'rgb(0,37,0)', marginBottom: 20 }}>Créer un compte</Title>
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
                                message: `L'email est nécessaire pour créer un compte`,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Pseudo :"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Le pseudo est obligatoire et doit être unique.',
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
                                message: 'Tu auras besoin d\'un mot de passe pour te connecter !',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='primary' style={{ backgroundColor: 'rgb(73,56,67)', border: 'none', margin: '10px 0 20px 0' }} htmlType="submit">Créer un compte</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
}

export default Signup
