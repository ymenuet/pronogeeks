import React from 'react';
import './rulesPrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="my-content-homepage">
      <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
          <div className="home-div" style={{ width: '100%' }}>
            <div className="home-message rules-privacy-policy" style={{ width: '100%' }}>
              <h2>Politique de confidentialité</h2>
              <section id="data-collection">
                <h4>1. Collecte de l&apos;information</h4>
                <p>
                  Nous recueillons des informations lorsque vous vous inscrivez sur notre site,
                  lorsque vous vous connectez à votre compte et lorsque vous vous déconnectez. Les
                  informations recueillies incluent votre adresse e-mail.
                </p>
              </section>
              <section id="data-use">
                <h4>2. Utilisation des informations</h4>
                <p>
                  Toutes les informations que nous recueillons auprès de vous peuvent être utilisées
                  pour :
                </p>
                <ul>
                  <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                  <li>Améliorer le service utilisateur et vos besoins de prise en charge</li>
                  <li>Vous contacter par e-mail</li>
                  <li>Administrer un concours, une promotion, ou une enquête</li>
                </ul>
              </section>
              <section id="data-confidentiality">
                <h4>3. Confidentialité</h4>
                <p>
                  Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos
                  informations personnelles ne seront pas vendues, échangées, transférées, ou
                  données à une autre société pour n&apos;importe quelle raison, sans votre
                  consentement.
                </p>
              </section>
              <section id="data-protection">
                <h4>4. Protection des informations</h4>
                <p>
                  Nous mettons en œuvre une variété de mesures de sécurité pour préserver la
                  sécurité de vos informations personnelles. Nous utilisons un cryptage pour
                  protéger votre mot de passe. Nous protégeons également vos informations hors
                  ligne. Seuls les employés qui ont besoin d&apos;effectuer un travail spécifique
                  (par exemple le service à l&apos;utilisateur) ont accès aux informations
                  personnelles identifiables comme les emails. Les ordinateurs et serveurs utilisés
                  pour stocker des informations personnelles identifiables sont conservés dans un
                  environnement sécurisé.
                </p>
              </section>
              <section id="cookie-use">
                <h4>5. Utilisation des cookies</h4>
                <p>
                  Nos cookies améliorent l&apos;accès à notre site et identifient les visiteurs
                  réguliers. Cependant, cette utilisation des cookies n&apos;est en aucune façon
                  liée à des informations personnelles identifiables sur notre site.
                </p>
              </section>
              <section id="email-use">
                <h4>6. Emails</h4>
                <p>
                  Nous utilisons l&apos;adresse e-mail que vous nous fournissez pour confirmer votre
                  compte et pour vous permettre d&apos;actualiser votre mot de passe, le cas
                  échéant.
                </p>
              </section>
              <section id="policy-consent">
                <h4>7. Consentement</h4>
                <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
