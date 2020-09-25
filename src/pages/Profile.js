import React, { useContext } from 'react'
// import { Redirect } from 'react-router-dom'
import { Spin, Space } from 'antd'
import { Context } from '../context'

const Profile = () => {
    const { user } = useContext(Context)

    return !user ? <div className='pronogeeks-bg'><Space size='large'>
        <Spin size='large' />
    </Space>
    </div> :
        (
            <div className='my-profile-page'>
                <div className='my-profile'>
                    <section className='about-section'>
                        <img src={user.photo} alt="Profile pic" className='profile-pic' />
                        <p>{user.username}</p>
                        <input type="file" className='profile-pic-input' />
                    </section>
                    <section className='geek-section'></section>
                </div>
            </div>
        )
}

export default Profile
