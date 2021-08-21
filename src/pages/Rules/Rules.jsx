import React from 'react';

import './rulesPrivacyPolicy.css';
import { RulesProno } from '../../components';
import { CorrectIcon, ExactIcon, FavTeamIcon } from '../../components/Icons';
import { PROV_RANKING_MATCHWEEK_LIMIT } from '../../utils/constants';

const Rules = () => {
  return (
    <div className="my-content-homepage">
      <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
          <div className="home-div" style={{ width: '100%' }}>
            <div className="home-message rules-privacy-policy" style={{ width: '100%' }}>
              <h2>Règles du jeu</h2>

              <section className="relative-links" id="link-to-pronogeeks" />
              <section id="rules-pronogeeks">
                <h4>Pronogeeks</h4>

                <RulesProno />
              </section>

              <section className="relative-links" id="link-to-provisional-ranking" />
              <section id="rules-provisional-ranking">
                <h4>Classement prévisionnel</h4>

                <p>
                  Le classement prévisionnel est modifiable jusqu'
                  <b>avant le début de la journée {PROV_RANKING_MATCHWEEK_LIMIT}</b>. Une fois la
                  journée {PROV_RANKING_MATCHWEEK_LIMIT} commencée, le classement prévisionnel ne
                  peut plus être changé. S'il n'a pas été fait avant cette date, les points bonus
                  éventuellement gagnés grâce au classement prévisionnel ne pourront pas être
                  cumulés sur cette saison.
                </p>

                <p className="no-margin-para">
                  Les points apportés par le classement prévisionnel sont calculés et ajoutés au
                  total de la saison une fois cette dernière terminée, sous le modèle suivant :
                </p>

                <ul>
                  <li>+300pts pour un bon prono sur le 1er club du classement</li>
                  <li>+200pts pour un bon prono sur le 2ème club du classement</li>
                  <li>+100pts pour un bon prono sur le 3ème club du classement</li>
                  <li>
                    +50pts pour chaque bon prono sur un des clubs situés de la 4ème à la 17ème place
                    du classement
                  </li>
                  <li>
                    +100pts pour chaque bon prono sur un des clubs situés de la 18ème à la 20ème
                    place du classement
                  </li>
                </ul>

                <p className="no-margin-para">
                  Un système de bonus combo s'applique de la manière suivante, en fonction du nombre
                  de clubs bien situés dans le classement prévisionnel :
                </p>

                <ul>
                  <li>Moins de 5 clubs bien pronogeekés : 0pt bonus</li>
                  <li>Entre 5 et 9 clubs bien pronogeekés : 100pts bonus</li>
                  <li>Entre 10 et 14 clubs bien pronogeekés : 300pts bonus</li>
                  <li>Entre 15 et 19 clubs bien pronogeekés : 500pts bonus</li>
                  <li>Pour un perfect au classement prévisonnel : 1000pts bonus</li>
                </ul>

                <p>
                  Si le classement de l'équipe de coeur <FavTeamIcon /> a été bien pronogeeké, 100
                  points bonus seront aussi ajoutés au total des points.
                </p>

                <p className="no-margin-para">
                  Pour résumer et donner un exemple, il y a potentiellement 2700pts bonus à prendre
                  en fin de saison sur le classement prévsionnel, en cas de perfect !
                </p>

                <ul>
                  <li>1600pts sur le classement en lui-même (300 + 200 + 100 + 14*50 + 3*100)</li>
                  <li>1000pts bonus pour un combo perfect 20/20</li>
                  <li>100pts bonus pour le bon prono sur l'équipe de coeur</li>
                </ul>
              </section>

              <section className="relative-links" id="link-to-ranking" />
              <section id="rules-ranking">
                <h4>Classements</h4>

                <p>
                  Les classements au sein de tes ligues ou le classement général sont calculés selon
                  le total des points accumulés sur la saison (ou pendant la journée pour les
                  classements par journée).
                </p>

                <p>
                  En cas d'égalité au total de points, le départage se fait selon l'ordre
                  d'importance suivant :
                </p>

                <ol>
                  <li>
                    <CorrectIcon className="rules-icon" /> nombre de pronogeeks corrects
                  </li>
                  <li>
                    <ExactIcon className="rules-icon" /> nombre de pronogeeks exacts
                  </li>
                  <li>
                    <FavTeamIcon className="rules-icon" /> bonus équipe de coeur
                  </li>
                </ol>

                <p>
                  Si deux geeks ont le même nombre de points, l'avantage sera donc donné à celui qui
                  a le plus grand nombre de pronogeeks corrects. S'ils sont encore à égalité, on
                  regardera le nombre de pronogeeks exacts. Enfin, en cas d'égalité encore au niveau
                  des pronogeeks exacts, le bonus équipe de coeur aura le dernier mot.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
