import React, { useContext } from 'react'
import { Context } from '../context'
import { Redirect } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(Context)

    return user ? <Redirect to='/profile' /> : (
        <div className='home-div'>
            <div>
                <h2>Bienvenue sur PRONOGEEKS</h2>
                <p>Mesure-toi aux maîtres geeks des pronostics de Ligue 1,
                    <br />
                    et à tes potes dans une ligue fermée,
                    <br />
                    et deviens expert pronogeekeur !
                    </p>
            </div>
            <div className='home-register'>
                <button>Se connecter</button>
                <button>Créer un compte</button>
            </div>
        </div>
    )
}

export default Home
