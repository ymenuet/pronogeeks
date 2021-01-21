import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input } from 'antd'
import axios from 'axios'
import { Loader, SocialLogins, ErrorNotification } from '../components'
import { openNotification, isConnected, appendPhoto } from '../helpers'
import '../styles/connectPages.css'

import * as mapDispatchToProps from '../actions/authActions'

const Signup = ({ signup, loading, user, signedup, emailToConfirm }) => {
    const [form] = Form.useForm()
    const [cloudinaryLoading, setCloudinaryLoading] = useState(false)
    const [cloudinaryError, setCloudinaryError] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [photoUploading, setPhotoUploading] = useState(false)
    const [fileName, setFileName] = useState('Charger une photo')

    const onFinish = async (values) => {
        const emailCorrect = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(values.email).toLowerCase())
        if (!emailCorrect) openNotification('warning', 'Attention', `Je crois qu'il y a une faute de frappe dans ton email...`)
        else {
            setCloudinaryLoading(true)
            let photoUrl = null
            if (photo) {
                const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, photo)
                    .catch(error => {
                        setCloudinaryError(true)
                        setCloudinaryLoading(false)
                        openNotification('error', "Une erreur a eu lieu lors de l'import de la photo. Merci de réessayer.")
                    })
                photoUrl = secure_url
            }
            if (!cloudinaryError) {
                signup({ ...values, photo: photoUrl })
                setCloudinaryLoading(false)
            }
        }
    }

    const uploadPhoto = e => {
        if (e.target.files.length > 0) {
            setPhotoUploading(true)
            const photo = appendPhoto(e, setFileName)
            setPhoto(photo)
            setPhotoUploading(false)
        }
    }

    return <div className='register-pages'>
        {loading || cloudinaryLoading ? (

            <Loader
                tip='Enregistrement du compte...'
                color='rgb(4, 78, 199)'
            />

        ) : signedup || emailToConfirm ? (

            <div className='row signup-form'>
                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>
                    <h3>Merci pour ton inscription ! Un mail t'a été envoyé pour confirmer ton adresse email.</h3>
                </div>
            </div>

        ) : isConnected(user) ? (

            <Redirect to='/profile' />

        ) : <div className='row signup-form'>

                        <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>

                            <h2>Créer un compte</h2>

                            <Form
                                form={form}
                                layout='vertical'
                                name="basic"
                                onFinish={onFinish}
                                initialValues={{
                                    remember: true,
                                }}
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
                                    <Input placeholder='roi.geek@pronogeeks.fr' />
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
                                    <Input placeholder='RoiGeek' />
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
                                    <Input.Password placeholder='********' />
                                </Form.Item>

                                <label
                                    className='first-file-label signup-file-label'
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
                                        type='submit'
                                        className='btn my-btn submit-btn register-btn'
                                        style={{ marginTop: 10 }}
                                        disabled={photoUploading}
                                    >
                                        Créer mon compte
                                    </button>
                                </div>

                            </Form>

                            <SocialLogins />

                        </div>

                        <Link
                            to='/privacy-policy'
                            className='privacy-policy-link'
                        >
                            Politique de confidentialité
                        </Link>

                    </div>}

        <ErrorNotification types={['auth']} />

    </div>
}

const mapStateToProps = ({ authReducer }) => authReducer

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
