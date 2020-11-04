import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getUser, confirmEmail } from '../services/user'
import { getProfile } from '../services/auth'
import { openNotification } from '../helpers'
import { Context } from '../context'
import { Loader } from '../components'

const ConfirmUser = ({ match: { params: { userID, confirmToken } } }) => {
    const { user, loginUser } = useContext(Context)

    const [username, setUsername] = useState(null)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)


    useEffect(() => {
        const confirmNewUser = async () => {
            let result = false
            if (!error) {
                result = await confirmEmail(userID, confirmToken).catch(err => {
                    openNotification('error', 'Erreur', err.response.data.message.fr)
                    setError(true)
                })
            }
            return result
        }
        const confirmed = confirmNewUser()
        const fetchUser = async () => {
            const user = await getUser(userID)
            setUsername(user.username)
        }
        if (confirmed) {
            fetchUser()
            if (user && !updated) {
                const updateUser = async () => {
                    const user = await getProfile()
                    loginUser(user)
                    setUpdated(true)
                }
                updateUser()
            }
        } else if (!error) {
            openNotification('error', 'Erreur', 'Il y a eu une erreur lors de la confirmation de ton email. Merci de réessayer.')
            setError(true)
        }

    }, [userID, confirmToken, user, updated, error])

    return <div className='my-content-homepage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {!username ? (
            <Loader tip='Enregistrement du compte...' color='rgb(4, 78, 199)' />
        ) : error ?
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
