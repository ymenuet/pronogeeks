import React from 'react'
import '../styles/rulesPrivacyPolicy.css'
import { RulesProno } from '.'
import { CorrectIcon, ExactIcon, FavTeamIcon } from './Icons'

const Rules = () => {
    return (
        <div className='my-content-homepage'>
            <div className='row'>
                <div className='col-10 offset-1 col-md-8 offset-md-2'>
                    <div className='home-div' style={{ width: '100%' }}>
                        <div className='home-message rules-privacy-policy' style={{ width: '100%' }}>
                            <h2>Règles du jeu</h2>
                            <section id='rules-pronogeeks'>
                                <h4><span className='relative-links' id='link-to-pronogeeks'></span>Pronogeeks</h4>
                                <RulesProno />
                            </section>
                            <section id='rules-ranking'>
                                <h4><span className='relative-links' id='link-to-ranking'></span>Classements</h4>
                                <p>Les classements au sein de tes ligues ou le classement général sont calculés selon le total des points accumulés sur la saison (ou pendant la journée pour les classements par journée).</p>
                                <p>En cas d'égalité au total de points, le départage se fait selon l'ordre d'importance suivant :</p>
                                <ol>
                                    <li><CorrectIcon className='rules-icon' /> nombre de pronogeeks corrects</li>
                                    <li><ExactIcon className='rules-icon' /> nombre de pronogeeks exacts</li>
                                    <li><FavTeamIcon className='rules-icon' /> bonus équipe de coeur</li>
                                </ol>
                            </section>
                            <section id='rules-previsional-ranking'>
                                <h4><span className='relative-links' id='link-to-provisional-ranking'></span>Classement prévisionnel</h4>
                                <p>Fonctionnalité et détails à venir...</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rules
