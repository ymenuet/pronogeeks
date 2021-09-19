/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Loader, SocialLogins } from '../../components';
import { openNotification, appendPhoto } from '../../utils/helpers';
import { USERNAME_MAX_LENGTH } from '../../utils/constants/general';
import './connectPages.css';

import { signup } from '../../state/actions/authActions';

const Signup = ({ loadingUser, emailToConfirm }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
  const [cloudinaryError, setCloudinaryError] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [fileName, setFileName] = useState('Charger une photo');

  const { loading, signedup } = useSelector(({ authReducer }) => authReducer);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (values.username.length > USERNAME_MAX_LENGTH)
      return openNotification(
        'warning',
        t('notifications.formValidations.usernameTooLong.title'),
        t('notifications.formValidations.usernameTooLong.message')
      );
    const emailCorrect =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(values.email).toLowerCase()
      );
    if (!emailCorrect)
      openNotification(
        'warning',
        'Attention',
        `Je crois qu'il y a une faute de frappe dans ton email...`
      );
    else {
      let photoUrl = null;
      if (photo) {
        setCloudinaryLoading(true);
        const {
          data: { secure_url },
        } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, photo).catch(() => {
          setCloudinaryError(true);
          setCloudinaryLoading(false);
          openNotification(
            'error',
            "Une erreur a eu lieu lors de l'import de la photo. Merci de réessayer."
          );
        });
        photoUrl = secure_url;
      }
      if (!cloudinaryError) {
        dispatch(signup({ ...values, photo: photoUrl }));
        setCloudinaryLoading(false);
      }
    }
  };

  const uploadPhoto = (e) => {
    if (e.target.files.length > 0) {
      setPhotoUploading(true);
      const picture = appendPhoto(e, setFileName);
      setPhoto(picture);
      setPhotoUploading(false);
    }
  };

  return (
    <div className="register-pages">
      {loadingUser && <Loader tip="Chargement..." color="rgb(4, 78, 199)" />}

      {!loadingUser && (loading || cloudinaryLoading) && (
        <Loader tip="Enregistrement du compte..." color="rgb(4, 78, 199)" />
      )}

      {!loadingUser && !loading && !cloudinaryLoading && (signedup || emailToConfirm) && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3">
            <h3>
              Merci pour ton inscription ! Un mail t&apos;a été envoyé pour confirmer ton adresse
              email.
            </h3>
          </div>
        </div>
      )}

      {!loadingUser && !loading && !cloudinaryLoading && !signedup && !emailToConfirm && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3">
            <h2>Créer un compte</h2>

            <Form
              form={form}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                type="email"
                label="Email :"
                name="email"
                rules={[
                  {
                    required: true,
                    message: `L'email est nécessaire pour créer un compte.`,
                  },
                ]}
              >
                <Input placeholder="roi.geek@pronogeeks.fr" />
              </Form.Item>

              <Form.Item
                label={`Pseudo (${USERNAME_MAX_LENGTH} caractères max) :`}
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Le pseudo est obligatoire et doit être unique.',
                  },
                ]}
              >
                <Input placeholder="RoiGeek" maxLength={USERNAME_MAX_LENGTH} />
              </Form.Item>

              <Form.Item
                label="Mot de passe :"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Tu auras besoin d'un mot de passe pour te connecter !",
                  },
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="first-file-label signup-file-label"
                htmlFor="profile-pic-input-signup"
              >
                Photo de profil :
              </label>

              <br />

              <div className="custom-file custom-file-signup">
                <label
                  className="profile-image custom-file-label"
                  htmlFor="profile-pic-input-signup"
                >
                  {fileName}
                  <input
                    id="profile-pic-input-signup"
                    type="file"
                    name="image"
                    className="custom-file-input"
                    onChange={uploadPhoto}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  className="btn my-btn submit-btn register-btn"
                  style={{ marginTop: 10 }}
                  disabled={photoUploading}
                >
                  Créer mon compte
                </button>
              </div>
            </Form>

            <SocialLogins />
          </div>

          <Link to="/privacy-policy" className="privacy-policy-link">
            Politique de confidentialité
          </Link>
        </div>
      )}
    </div>
  );
};

Signup.defaultProps = {
  loadingUser: false,
  emailToConfirm: false,
};

Signup.propTypes = {
  loadingUser: PropTypes.bool,
  emailToConfirm: PropTypes.bool,
};

export default Signup;
