import React, { useEffect, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Spin, Space, Form, Input, notification, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { createLeague } from '../services/geekLeague'
import { getUsers } from '../services/user'
import { Context } from '../context'

const { Option } = Select

const NewGeekLeague = ({ history }) => {
    const { user } = useContext(Context)
    const [form] = Form.useForm()
    const [users, setUsers] = useState(null)
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getUsers()
            const users = allUsers.filter(oneUser => oneUser._id !== user?._id)
            setUsers(users)
        }
        fetchUsers()
    }, [user])

    const newLeague = async (values) => {
        if (!values.name || !values.geeks || values.geeks.length < 1) return openNotification('warning', 'Attention', 'Tous les champs sont requis.')
        setCreating(true)
        const geekLeague = await createLeague(values)
        openNotification('success', `Ligue "${values.name}" créée`)
        history.push(`/myGeekLeagues/${geekLeague._id}`)
        setCreating(false)
    }

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    return <div className='geekleague-bg'>
        {!users || creating ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : !user ? (
            <Redirect to='/login' />
        ) : (
                    <div className='geekleague-form'>
                        <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>
                            <h2>Créer une ligue</h2>
                            <Form
                                form={form}
                                layout='vertical'
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={newLeague}
                            >
                                <Form.Item
                                    type='text'
                                    label="Nom de la ligue :"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Le nom de ligue est nécessaire.`,
                                        },
                                    ]}
                                >
                                    <Input style={{ borderRadius: 15.8 }} placeholder='Ma Ligue Geek' />
                                </Form.Item>
                                <Form.Item
                                    type='text'
                                    label="Sélectionne d'autres geeks :"
                                    name="geeks"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Tu ne peux pas créer de ligue sans autres geeks.`,
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left' }}
                                        placeholder="Ajoute des geeks à ta ligue !"
                                        optionLabelProp="label"
                                        optionFilterProp='label'
                                    >
                                        {users?.map(user => <Option key={user._id} value={user._id} label={user.username}>
                                            <div className="demo-option-label-item">
                                                <span role="img" aria-label={user.username}>
                                                    <img src={user.photo} alt="profile" className='profile-pic-preview' />
                                                </span>
                                        &nbsp;&nbsp;{user.username}
                                            </div>
                                        </Option>)}
                                    </Select>
                                </Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type='submit' className='btn my-btn create-league-btn' style={{ marginTop: 10 }}>Créer ligue</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )
        }
    </div>
}

export default NewGeekLeague