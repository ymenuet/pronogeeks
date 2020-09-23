import React, { useState, createContext } from 'react'

export const Context = createContext()

const CtxProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    function loginUser(user) {
        setUser(user)
    }

    function logoutUser() {
        setUser(null)
    }

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
