import React, { useContext, useState, useEffect } from 'react'
// import { Redirect } from 'react-router-dom'
import { Spin, Space } from 'antd'
import { Context } from '../context'

const Profile = () => {
    const { user } = useContext(Context)
    // const [myUser, setMyUser] = useState(user)

    useEffect(() => {
        console.log(user)
        // console.log(myUser)
    }, [user])

    return user == null ? <Space size='large'>
        <Spin size='large' />
    </Space> :
        (
            <div className='my-content my-profile-page'>
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
