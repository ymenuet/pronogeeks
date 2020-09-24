import React, { useContext } from 'react'
import { Context } from '../context'
import { Redirect, Link } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(Context)

    return user ? <Redirect to='/profile' /> : (
        <div className='my-content-homepage'>
            <div className='row'>
                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
                    <div className='home-div'>
                        <div>
                            <h2>Bienvenue sur<br />
                                <img className='logo-homepage' src='/images/logo-blue-home.png' alt='Logo' /></h2>
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
            </div>
        </div>
    )
}

export default Home
