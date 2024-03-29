import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import { Loader } from '../../components'
import { openNotification } from '../../utils/helpers'

import { updatePwd } from '../../state/actions/authActions'

const SetNewPwd = ({ match: { params: { userID, renewToken } }, history, loadingUser }) => {

    const [form] = Form.useForm()

    const { loading, pwdUpdated } = useSelector(({ authReducer }) => authReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if (pwdUpdated) {
            openNotification('success', 'Mot de passe actualisé.')
            history.push('/login')
        }
    }, [pwdUpdated, history])

    const onFinish = async ({ password, passwordCopy }) => {
        if (password !== passwordCopy) return openNotification('warning', 'Les mots de passe sont différents.')
        dispatch(updatePwd(userID, renewToken, password))
    }

    return <div className='register-pages'>
        {loadingUser ? (

            <Loader
                tip="Chargement..."
                color='rgb(4, 78, 199)'
            />

        ) : loading ? (

            <Loader
                tip="Enregistrement du mot de passe..."
                color='rgb(4, 78, 199)'
            />

        ) : (
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
                            label="Mot de passe :"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: `N'oublie pas ton mot de passe !`,
                                },
                            ]}
                        >
                            <Input.Password
                                style={{ borderRadius: 15.8 }}
                                placeholder='********'
                            />
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
                            <Input.Password
                                style={{ borderRadius: 15.8 }}
                                placeholder='********'
                            />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <button
                                type='submit'
                                className='btn register-btn my-btn submit-btn'
                            >
                                Confirmer
                                    </button>
                        </div>

                    </Form>

                </div>

            </div>

        )}
    </div>
}

export default SetNewPwd
