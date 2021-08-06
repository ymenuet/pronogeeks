import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import './connectPages.css';
import { SocialLogins, Loader } from '../../components';

import { login } from '../../state/actions/authActions';

const Login = ({ loadingUser }) => {
  const [form] = Form.useForm();

  const { loading } = useSelector(({ authReducer }) => authReducer);

  const dispatch = useDispatch();

  return (
    <div className="register-pages">
      {loadingUser || loading ? (
        <Loader tip="Chargement..." color="rgb(4, 78, 199)" />
      ) : (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <h2>Se connecter</h2>

            <Form
              form={form}
              onFinish={({ email, password }) => dispatch(login({ email, password }))}
              layout="vertical"
              name="basic"
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
                    message: `L'email est nécessaire pour te connecter à ton compte`,
                  },
                ]}
              >
                <Input placeholder="roi.geek@pronogeeks.fr" />
              </Form.Item>

              <Form.Item
                label="Mot de passe :"
                name="password"
                rules={[
                  {
                    required: true,
                    message: `N'oublie pas ton mot de passe !`,
                  },
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button type="submit" className="btn register-btn my-btn submit-btn">
                  Me connecter
                </button>

                <p className="reset-pwd">
                  Tu as encore oublié ton mot de passe ?<br />
                  Clique <Link to="/reset-pwd">ici</Link> pour le renouveler.
                </p>
              </div>
            </Form>

            <SocialLogins login />
          </div>

          <Link to="/privacy-policy" className="privacy-policy-link">
            Politique de confidentialité
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
