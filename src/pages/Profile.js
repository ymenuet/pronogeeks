import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../context'

const Profile = () => {
    const { user } = useContext(Context)

    useEffect(() => console.log(user), [])

    return !user ? <Redirect to='/' /> :
        (
            <div className='my-content my-profile-page'>
                <div className='my-profile'>
                    <section className='about-section'>
                        {user.photo && <img src={user.photo} alt="Profile picture" className='profile-pic' />}
                        <input type="file" className='profile-pic-input' />
                    </section>
                    <section className='geek-section'></section>
                </div>
            </div>
        )
}

export default Profile
