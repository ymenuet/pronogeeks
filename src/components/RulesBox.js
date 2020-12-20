import React from 'react'
import { dateFormatterForRulesPanel } from '../helpers'
import '../styles/rulesBox.css'

const RulesBox = ({ setShowRules, lastScoresUpdated, lastOddsUpdated, season }) => {
    return (
        <div className='rules-box'>

            <span onClick={(() => setShowRules(false))}>X</span>
            <h4>Règles des pronogeeks :</h4>
            <hr />
            <ul>
                <li>Les statuts et résultats des matchs sont actualisés en moyenne toutes les 30 minutes (à partir de 7 jours avant le début de la journée) et les points de pronogeeks avec. (dernière mise à jour le {dateFormatterForRulesPanel(lastScoresUpdated)})</li><br />
                <li>Les cotes sont actualisées une fois par jour (à partir de 7 jours avant le début de la journée). À partir de 30 minutes avant le début d'un match, ses cotes ne changent plus. (dernière mise à jour le {dateFormatterForRulesPanel(lastOddsUpdated)})</li><br />
                <li>Il n'est plus possible de changer son pronogeek après le coup d'envoi.</li><br />
                <li>Un pronogeek <b>correct</b> (bon vainqueur ou match nul) rapporte le nombre de points indiqués dans les cotes de la rencontre.</li><br />
                <li>Un pronogeek <b>exact</b> (score exact bien pronogeeké) rapporte le double de la cote correspondante.</li><br />
                <li>Un pronogeek correct sur un match de son <b>équipe de coeur</b> (qu'elle soit gagnante ou perdante) rapporte 30 points bonus.</li><br />
                <li>Détail des bonus par journée de {season.leagueName} :
                        <table className='bonus-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pronos corrects</th>
                                <th>Pronos exacts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'< 3'}</td>
                                <td>+0pt</td>
                                <td>+0pt</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>+0pt</td>
                                <td>+50pts</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>+0pt</td>
                                <td>+100pts</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>+50pts</td>
                                <td>+200pts</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>+100pts</td>
                                <td>+300pts</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>+200pts</td>
                                <td>+500pts</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>+300pts</td>
                                <td>+700pts</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>+500pts</td>
                                <td>+1000pts</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>+700pts</td>
                                <td>+1500pts</td>
                            </tr>
                        </tbody>
                    </table>
                            Exemple : Si un geek a 7 pronos corrects (+200pts) dont 4 pronos exacts (+100pts) sur une même journée, il prend 300 points bonus sur cette journée.
                </li>
            </ul>

        </div>
    )
}

export default RulesBox
