import React from 'react'
import '../styles/rulesPrivacyPolicy.css'
import { RulesProno } from '../components'
import { CorrectIcon, ExactIcon, FavTeamIcon } from '../components/Icons'

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
                                <p>Si deux geeks ont le même nombre de points, l'avantage sera donc donné à celui qui a le plus grand nombre de pronogeeks corrects. S'ils sont encore à égalité, on regardera le nombre de pronogeeks exacts. Enfin, en cas d'égalité encore au niveau des pronogeeks exacts, le bonus équipe de coeur aura le dernier mot.</p>
                            </section>
                            <section id='rules-provisional-ranking'>
                                <h4><span className='relative-links' id='link-to-provisional-ranking'></span>Classement prévisionnel</h4>
                                <p>Les points apportés par le classement prévisionnel sont calculés et ajoutés au total de la saison une fois cette dernière terminée, sous le modèle suivant :
                                    <ul style={{ paddingLeft: 40 }}>
                                        <li>+300pts pour un bon prono sur le 1er club du classement</li>
                                        <li>+200pts pour un bon prono sur le 2ème club du classement</li>
                                        <li>+100pts pour un bon prono sur le 3ème club du classement</li>
                                        <li>+50pts pour chaque bon prono sur un des clubs situés de la 4ème à la 17ème place du classement</li>
                                        <li>+100pts pour chaque bon prono sur un des clubs situés de la 18ème à la 20ème place du classement</li>
                                    </ul>
                                </p>
                                <p>Un système de bonus combo s'applique de la manière suivante, en fonction du nombre de clubs bien situés dans le classement prévisionnel :
                                    <ul style={{ paddingLeft: 40 }}>
                                        <li>Moins de 5 clubs bien pronogeekés : 0pt bonus</li>
                                        <li>Entre 5 et 9 clubs bien pronogeekés : 100pts bonus</li>
                                        <li>Entre 10 et 14 clubs bien pronogeekés : 300pts bonus</li>
                                        <li>Entre 15 et 19 clubs bien pronogeekés : 500pts bonus</li>
                                        <li>Pour un perfect au classement prévisonnel : 1000pts bonus</li>
                                    </ul>
                                </p>
                                <p>Si le classement de l'équipe de coeur <FavTeamIcon /> a été bien pronogeeké, 100 points bonus seront aussi ajoutés au total des points.</p>
                                <p>Pour résumer et donner un exemple, il y a potentiellement 2700pts bonus à prendre en fin de saison sur le classement prévsionnel, en cas de perfect !
                                    <ul style={{ paddingLeft: 40 }}>
                                        <li>1600pts sur le classement en lui-même (300 + 200 + 100 + 14*50 + 3*100)</li>
                                        <li>1000pts bonus pour un combo perfect 20/20</li>
                                        <li>100pts bonus pour le bon prono sur l'équipe de coeur</li>
                                    </ul>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rules
