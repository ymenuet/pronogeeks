import React, { useState, useEffect, createContext } from 'react'
import { getProfile } from '../services/auth'

export const Context = createContext()

const CtxProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const getSession = async () => {
        const user = await getProfile()
        if (user.email) loginUser(user)
    }

    useEffect(() => {
        getSession()
    }, [])

    const loginUser = user => setUser(user)

    const logoutUser = () => setUser(null)

    return (
        <Context.Provider
            value={{
                user,
                loginUser,
                logoutUser
            }}>
            {children}
        </Context.Provider>
    )
}

export default CtxProvider
