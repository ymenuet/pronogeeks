import React, { useState } from 'react'
import { Form, Input, notification } from 'antd'
import { signup } from '../services/auth'
import axios from 'axios'

const Signup = ({ history }) => {
    const [form] = Form.useForm()
    const [photo, setPhoto] = useState(null)
    const [fileName, setFileName] = useState('Charger une photo')

    const onFinish = async (values) => {
        const emailCorrect = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(values.email).toLowerCase())
        if (!emailCorrect) openNotification(`Je crois qu'il y a une faute de frappe dans ton email...`)
        else {
            const { data: { secure_url } } = await axios.post('https://api.cloudinary.com/v1_1/dlyw9xi3k/image/upload', photo)
            await signup({ ...values, photo: secure_url }).catch(err => {
                openNotification(err.response.data.message.fr)
            })
            history.push('/login')
        }
    }

    const uploadPhoto = e => {
        if (e.target.files.length > 0) {
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

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    return (
        <div className='register-pages'>
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
                                    message: `L'email est nécessaire pour créer un compte`,
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
                </div>
            </div>
        </div>
    );
}

export default Signup
