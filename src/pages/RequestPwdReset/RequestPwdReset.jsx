import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { Loader } from '../../components';
import { openNotification } from '../../utils/helpers';

import { resetPwd } from '../../state/actions/authActions';

const RequestPwdReset = ({ history, loadingUser }) => {
  const [form] = Form.useForm();

  const { loading, pwdToReset } = useSelector(({ authReducer }) => authReducer);

  const dispatch = useDispatch();

  const onFinish = ({ email }) => {
    dispatch(resetPwd(email));
  };

  useEffect(() => {
    if (pwdToReset) {
      openNotification(
        'success',
        'Email envoyé',
        'Un email a été envoyé à ton adresse mail pour renouveler ton mot de passe.'
      );
      history.push('/login');
    }
  }, [pwdToReset, history]);

  return (
    <div className="register-pages">
      {loadingUser ? (
        <Loader tip="Chargement..." color="rgb(4, 78, 199)" />
      ) : loading ? (
        <Loader tip="Envoi de l'email..." color="rgb(4, 78, 199)" />
      ) : (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <h2>Renouvelle ton mot de passe</h2>

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
                    message: `L'email est nécessaire pour te connecter à ton compte`,
                  },
                ]}
              >
                <Input style={{ borderRadius: 15.8 }} placeholder="roi.geek@pronogeeks.fr" />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button type="submit" className="btn register-btn my-btn submit-btn">
                  Renouveler
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPwdReset;
