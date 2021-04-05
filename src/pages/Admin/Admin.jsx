import React from 'react'
import { Loader } from '../../components'

const Admin = ({ loading }) => {
    return loading
        ? <Loader />
        : <div>Hello admin</div>
}

export default Admin
