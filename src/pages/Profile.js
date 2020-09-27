import React, { useContext, useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { updateProfile, getProfile, updatePhoto } from '../services/auth'
import axios from 'axios'
import { Spin, Space, notification } from 'antd'
import { Context } from '../context'

const Profile = () => {
    const { user, loginUser } = useContext(Context)

    const uploadPhoto = async e => {
        const file = e.target.files[0]
        if (file.size > 1000000) return openNotification('warning', 'Attention', 'La taille du fichier ne peux pas excéder 1Mo. La photo de profil reste inchangée.')
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return openNotification('warning', 'Attention', 'Le fichier doit être au format JPG ou PNG. La photo de profil reste inchangée.')
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset', 'pronogeeks')
        const { data: { secure_url } } = await axios.post('https://api.cloudinary.com/v1_1/dlyw9xi3k/image/upload', data)
        const user = await updatePhoto({ photo: secure_url })
        loginUser(user)
    }

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    return !user ? (<div className='my-profile-page'>
        <div className='loader-container'>
            <Space size='large'>
                <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(26, 145, 254)', fontSize: '1.2rem' }} />
            </Space>
        </div>
    </div>
    ) : (
            <div className='my-profile-page row'>
                <div className='my-profile col-10 offset-1 col-lg-4'>
                    <section className='about-section'>
                        <img src={user.photo} alt="Profile pic" className='profile-pic' />
                        <p>{user.username}</p>
                        <label className='first-file-label' htmlFor="profile-pic-input">Changer de photo de profil :</label>
                        <div className="custom-file">
                            <label className="profile-image custom-file-label" htmlFor="profile-pic-input">
                                Charger une photo
                            <input id="profile-pic-input" type="file" name="image" className="custom-file-input" onChange={uploadPhoto} />
                            </label>
                        </div>
                    </section>
                    <section className='geek-section'></section>
                </div>
            </div>
        )
}

export default Profile
