import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { logout } from '../services/auth'
import { HomeIcon } from './Icons'
import '../styles/appLayout.css'

const AppLayout = ({ children }) => {
    const { user, logoutUser } = useContext(Context)
    const history = useHistory()

    const logoutButton = async () => {
        await logout()
        logoutUser()
        history.push('/')
    }

    return <>

        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark my-navbar">

            <Link
                className="navbar-brand my-brand"
                to='/'
            >
                <h1>pronogeeks</h1>
            </Link>

            <button
                className="navbar-toggler my-navbar-btn"
                type="button"
                data-toggle="collapse"
                data-target="#my-navbar-toggle"
                aria-controls="my-navbar-toggle"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div
                className="collapse navbar-collapse"
                id="my-navbar-toggle"
            >
                <ul className="navbar-nav mt-2 mt-lg-0">

                    {user ? <>

                        <li className="nav-item  mobile-list-item">
                            <button
                                className="nav-link navbar-btns"
                                onClick={logoutButton}
                            >
                                Déconnexion
                            </button>
                        </li>

                        <li className="nav-item mobile-list-item">
                            <Link
                                className="nav-link"
                                to='/rules'
                            >
                                Règles du jeu
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to='/myGeekLeagues'
                            >
                                Mes ligues Geek
                                    </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to='/pronogeeks/5f67f525d7b14148997ee3eb'
                            >
                                Mes pronogeeks
                                    </Link>
                        </li>

                        <li className="nav-item profile-pic-navbar-list-item">
                            <Link
                                className="nav-link"
                                to="/profile"
                            >
                                <img
                                    className='profile-pic-navbar'
                                    src={user.photo}
                                    alt='Profile'
                                />
                            </Link>
                            <div className='profile-submenu'>
                                <ul>
                                    <li className="nav-item">
                                        <Link to="/profile">Profil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to='/rules'
                                        >
                                            Règles
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link navbar-btns"
                                            onClick={logoutButton}
                                        >
                                            Déconnexion
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>

                    </> : <>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Se connecter
                                        </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/signup"
                                >
                                    Créer un compte
                                        </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/"
                                >
                                    <HomeIcon className="bi bi-house-fill my-home-icon" />
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>

                        </>

                    }

                </ul>

            </div>

        </nav>

        <div className='my-content'>
            {children}
        </div>

        {window.addEventListener('click', () => {
            if (document.querySelector('.navbar-collapse').classList.contains('show')) document.querySelector('.navbar-collapse').classList.remove('show')
        })}

    </>
}

export default AppLayout
