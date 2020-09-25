import React from 'react'
import { Form, Input, notification } from 'antd'
import { signup } from '../services/auth'

const Signup = ({ history }) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        const emailCorrect = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(values.email).toLowerCase())
        if (!emailCorrect) openNotification(`Je crois qu'il y a une faute de frappe dans ton email...`)
        else {
            await signup(values).catch(err => {
                openNotification(err.response.data.message.fr)
            })
            history.push('login')
        }
    }

    const openNotification = message => {
        notification.warning({
            message: "Erreur",
            description: message,
            placement: 'bottomLeft'
        })
    }

    return (
        <div className='register-pages'>
            <div className='row signup-form'>
                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>
                    <h2>Créer un compte</h2>
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
                            <Input style={{ borderRadius: 15.8 }} placeholder='roi.geek@pronogeeks.fr' />
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
                            <Input style={{ borderRadius: 15.8 }} placeholder='RoiGeek' />
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
                            <Input.Password style={{ borderRadius: 15.8 }} placeholder='********' />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type='submit' className='btn my-btn submit-btn register-btn' style={{ marginTop: 10 }}>Créer mon compte</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Signup
