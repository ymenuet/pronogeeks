import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input } from 'antd'
import { changePwd } from '../services/auth'
import { Context } from '../context'
import { Loader } from '../components'
import { openNotification } from '../helpers'

const ResetPwd = ({ history }) => {

    const { user } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = async ({ email }) => {
        setLoading(true)
        const emailSent = await changePwd(email).catch(err => {
            openNotification('warning', 'Attention', err.response.data.message.fr)
            setLoading(false)
        })
        if (emailSent) {
            openNotification('success', 'Email envoyé', 'Un email a été envoyé à ton adresse mail pour renouveler ton mot de passe.')
            history.push('/login')
            setLoading(false)
        }
    }

    return user ? <Redirect to='/profile' /> :

        loading ? (

            <div className='register-pages'>
                <Loader
                    tip="Envoi de l'email..."
                    color='rgb(4, 78, 199)'
                />
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
                                onFinish={onFinish}
                                initialValues={{
                                    remember: true,
                                }}
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
                                    <Input
                                        style={{ borderRadius: 15.8 }}
                                        placeholder='roi.geek@pronogeeks.fr'
                                    />
                                </Form.Item>

                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                    <button
                                        type='submit'
                                        className='btn register-btn my-btn submit-btn'
                                    >
                                        Renouveler
                                    </button>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            )
}

export default ResetPwd
