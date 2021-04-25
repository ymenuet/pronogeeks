import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import { Loader, GeekSelector } from '../../components'
import { openNotification } from '../../utils/helpers'
import { useRedirectNewLeague } from '../../utils/hooks'
import './createGeekleague.css'

import { createLeague } from '../../actions/geekleagueActions'

const CreateGeekLeague = ({ loading }) => {
    const [form] = Form.useForm()

    useRedirectNewLeague()

    const dispatch = useDispatch()
    const newLeague = async ({ name, geeks }) => {
        if (!name || !geeks || !geeks.length) return openNotification('warning', 'Attention', 'Tous les champs sont requis.')
        dispatch(createLeague({ name, geeks }))
    }

    const creatingLeague = useSelector(({ geekleagueReducer }) => geekleagueReducer.loading)

    return <div className='geekleague-bg'>
        {creatingLeague || loading ? (

            <Loader />

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

                            <Input
                                style={{ borderRadius: 15.8 }}
                                placeholder='Ma Ligue Geek'
                            />

                        </Form.Item>


                        <GeekSelector />


                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                type='submit'
                                className='btn my-btn create-league-btn'
                                style={{ marginTop: 10 }}
                                disabled={creatingLeague}
                            >
                                Créer ligue
                                </button>
                        </div>

                    </Form>

                </div>

            </div>
        )
        }

    </div>
}

export default CreateGeekLeague