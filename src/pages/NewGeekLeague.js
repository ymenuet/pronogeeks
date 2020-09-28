import React, { useEffect, useState } from 'react'
import { Spin, Space, Form, Input, notification, Select } from 'antd'
import { createLeague } from '../services/geekLeague'
import { getUsers } from '../services/user'
import { LoadingOutlined } from '@ant-design/icons'
import { useInput } from '../customHooks'

const { Option } = Select

const NewGeekLeague = () => {
    const [form] = Form.useForm()
    const [users, setUsers] = useState(null)

    // const { leagueName } = useInput('')

    const createLeague = (values) => {
        console.log(values)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers()
            setUsers(users)
        }
        fetchUsers()
    }, [])

    return (
        <div className='geekleague-bg row'>
            {/* <form onSubmit={createLeague} className='geekleague-form'>
                <h2>Créer une nouvelle ligue geek</h2>
                <div className='geekleague-input-group'>
                    <label htmlFor="geekleague-name-input">Nom de la ligue geek :</label>
                    <br />
                    <input type="text" id='geekleague-name-input' {...leagueName} placeholder='Ma ligue geek' />
                </div>
            </form> */}
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
                        onFinish={createLeague}
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
                                    message: `Tu ne peux pas créer de ligue avec un seul geek.`,
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left' }}
                                placeholder="Ajoute des geeks à ta ligue !"
                                optionLabelProp="label"
                            >
                                {users?.map(user => <Option key={user._id} value={user._id} label={user.username}>
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">
                                            🇨🇳
                                    </span>
                                        {user.username}
                                    </div>
                                </Option>)}
                                <Option value="china" label="China">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">
                                            🇨🇳
                                    </span>
                                    China (中国)
                                </div>
                                </Option>
                                <Option value="usa" label="USA">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="USA">
                                            🇺🇸
                                    </span>
                                    USA (美国)
                                </div>
                                </Option>
                                <Option value="japan" label="Japan">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="Japan">
                                            🇯🇵
                                    </span>
                                    Japan (日本)
                                </div>
                                </Option>
                                <Option value="korea" label="Korea">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="Korea">
                                            🇰🇷
                                    </span>
                                    Korea (韩国)
                                </div>
                                </Option>
                            </Select>
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type='submit' className='btn my-btn create-league-btn' style={{ marginTop: 10 }}>Créer ligue</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NewGeekLeague