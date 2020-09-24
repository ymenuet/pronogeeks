import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { logout } from '../services/auth'

const AppLayout = () => {
    const { user, logoutUser } = useContext(Context)

    const logoutButton = async () => {
        await logout()
        logoutUser()
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark my-navbar">
            <Link className="navbar-brand my-brand" to='/'><h1><img src={'/images/pronogeeks-logo.png'} alt='Logo pronogeeks' /></h1></Link>
            <button className="navbar-toggler my-navbar-btn" type="button" data-toggle="collapse" data-target="#my-navbar-toggle" aria-controls="my-navbar-toggle" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>

            <div className="collapse navbar-collapse" id="my-navbar-toggle">
                <ul className="navbar-nav mt-2 mt-lg-0">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profil</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-a" onClick={logoutButton}>Déconnexion</a>
                            </li>
                        </>
                    ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Se connecter</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Créer un compte</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"><svg width="1.6em" height="1.6em" viewBox="0 0 16 16" className="bi bi-house-fill my-home-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                    </svg> <span className="sr-only">(current)</span></Link>
                                </li>
                            </>
                        )}
                </ul>
            </div>
        </nav>
    )
}

export default AppLayout
