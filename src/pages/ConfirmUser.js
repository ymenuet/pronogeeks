import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getUser, confirmEmail } from '../services/user'
import { getProfile } from '../services/auth'
import { Spin, Space, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'

const ConfirmUser = ({ match: { params: { userID } } }) => {
    const { user, loginUser } = useContext(Context)

    const [username, setUsername] = useState(null)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        const confirmNewUser = async () => {
            const result = await confirmEmail(userID)
            return result
        }
        const fetchUser = async () => {
            const user = await getUser(userID)
            setUsername(user.username)
        }
        if (confirmNewUser()) {
            fetchUser()
            if (user && !updated) {
                const updateUser = async () => {
                    const user = await getProfile()
                    loginUser(user)
                    setUpdated(true)
                }
                updateUser()
            }
        } else {
            openNotification('error', 'Erreur', 'Il y a eu une erreur lors de la confirmation de ton email. Merci de réessayer.')
            setError(true)
        }
    }, [userID, user])

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight',
            className: 'notification-box'
        })
    }

    return <div className='my-content-homepage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {!username ? <div className='loader-container'>
            <Space size='large'>
                <Spin size='large' tip='Enregistrement du compte...' style={{ color: ' rgb(4, 78, 199)', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: ' rgb(4, 78, 199)', fontSize: '3rem', marginBottom: 8 }} />} />
            </Space>
        </div> : error ?
                <Redirect to='/' />
                : <div style={{ padding: 30, background: 'rgba(4, 78, 199, 0.8)', borderRadius: 10, width: '80%' }}>
                    <h4 style={{ color: 'white' }}>Merci {username}, ton email est confirmé !<br />
            Tu peux maintenant te connecter.</h4>
                    <div className='home-register'>
                        <Link className='btn my-btn login-btn' to='/login'>Se connecter</Link>
                    </div>
                </div>
        }
    </div>
}

export default ConfirmUser
