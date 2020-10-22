import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Input } from 'antd'
import { signup } from '../services/auth'
import axios from 'axios'
import { Context } from '../context'
import { Loader } from '../components'
import { openNotification } from '../helpers'

const Signup = ({ confirm = false }) => {
    const { user } = useContext(Context)
    const [form] = Form.useForm()
    const [photo, setPhoto] = useState(null)
    const [fileName, setFileName] = useState('Charger une photo')
    const [signupDone, setSignupDone] = useState(false)
    const [confirmWait, setConfirmWait] = useState(confirm)

    const onFinish = async (values) => {
        const emailCorrect = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(values.email).toLowerCase())
        if (!emailCorrect) openNotification('warning', 'Attention', `Je crois qu'il y a une faute de frappe dans ton email...`)
        else {
            setSignupDone(true)
            let photoUrl = null
            if (photo) {
                const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, photo)
                photoUrl = secure_url
            }
            let error = false
            await signup({ ...values, photo: photoUrl }).catch(err => {
                openNotification('error', 'Erreur', err.response.data.message.fr)
                error = true
            })
            if (!error) setConfirmWait(true)
            setSignupDone(false)
        }
    }

    const uploadPhoto = e => {
        if (e.target.files.length > 0) {
            console.log('TEST')
            const file = e.target.files[0]
            if (file.size > 1000000) return openNotification('warning', 'Attention', 'La taille du fichier ne peux pas excéder 1Mo.')
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return openNotification('warning', 'Attention', 'La photo doit être au format JPG ou PNG.')
            setFileName(file.name)
            const data = new FormData()
            data.append('file', e.target.files[0])
            data.append('upload_preset', 'pronogeeks')
            setPhoto(data)
        }
    }

    return <div className='register-pages'>
        {signupDone ? (
            <Loader tip='Enregistrement du compte...' color='rgb(4, 78, 199)' />
        ) : confirmWait ? (
            <div className='row signup-form'>
                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>
                    <h3>Merci pour ton inscription ! Un mail t'a été envoyé pour confirmer ton adresse email.</h3>
                </div>
            </div>
        ) : user ? (
            <Redirect to='/profile' />
        ) : (

                        <div className='row signup-form'>
                            <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>
                                <h2>Créer un compte</h2>
                                <Form
                                    form={form}
                                    layout='vertical'
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        type='email'
                                        label="Email :"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: `L'email est nécessaire pour créer un compte.`,
                                            },
                                        ]}
                                    >
                                        <Input style={{ borderRadius: 15.8 }} placeholder='roi.geek@pronogeeks.fr' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Pseudo :"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Le pseudo est obligatoire et doit être unique.',
                                            },
                                        ]}
                                    >
                                        <Input style={{ borderRadius: 15.8 }} placeholder='RoiGeek' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mot de passe :"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Tu auras besoin d\'un mot de passe pour te connecter !',
                                            },
                                        ]}
                                    >
                                        <Input.Password style={{ borderRadius: 15.8 }} placeholder='********' />
                                    </Form.Item>

                                    <label className='first-file-label signup-file-label' htmlFor="profile-pic-input-signup">Photo de profil :</label>
                                    <br />
                                    <div className="custom-file custom-file-signup">
                                        <label className="profile-image custom-file-label" htmlFor="profile-pic-input-signup">
                                            {fileName}
                                            <input id="profile-pic-input-signup" type="file" name="image" className="custom-file-input" onChange={uploadPhoto} />
                                        </label>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button type='submit' className='btn my-btn submit-btn register-btn' style={{ marginTop: 10 }}>Créer mon compte</button>
                                    </div>
                                </Form>
                                <div className='social-logins'>
                                    <h4>Créer un compte avec :</h4>
                                    <div className='social-login-links'>
                                        <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/facebook`}><img src='/images/facebook-logo.png' alt='Facebook' /></a>
                                        <a href={`${process.env.REACT_APP_BACKENDPOINT}/auth/google`}><img src='/images/google-logo.png' alt='Google' /></a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 20, marginBottom: 20 }}>
                                    <p className='reset-pwd'>Tu as déjà un compte ?<br />
                            Connecte-toi <Link to='/login'>ici</Link>.</p>
                                </div>
                            </div>
                            <Link to='/privacy-policy' className='privacy-policy-link'>Politique de confidentialité</Link>
                        </div>
                    )
        }
    </div>
}

export default Signup
