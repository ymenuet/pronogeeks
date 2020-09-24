import React, { useContext } from 'react'
import { Context } from '../context'
import { Redirect, Link } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(Context)

    return user ? <Redirect to='/profile' /> : (
        <div className='my-content-homepage'>
            <div className='home-div'>
                <div>
                    <h2>Bienvenue sur<br />
                        <img className='logo-homepage' src='/images/logo-blue-home.png' /></h2>
                    <p className='home-message'>Mesure-toi aux maîtres geeks des pronostics de Ligue 1
                <br />
                et deviens expert pronogeekeur !
                </p>
                </div>
                <div className='home-register'>
                    <Link className='btn my-btn login-btn' to='/login'>Se connecter</Link>
                    <Link className='btn my-btn signup-btn' to='/signup'>Créer un compte</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
