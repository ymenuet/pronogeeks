import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loader, ErrorMessage } from '.'
import { isEmpty, sortByUsername } from '../helpers'
import { Form, Select } from 'antd'

import { getAllGeeks } from '../actions/geekActions'

const { Option } = Select

const GeekSelector = ({ user, allGeeks, getAllGeeks, geekLeague }) => {

    const [geeks, setGeeks] = useState([])

    useEffect(() => {
        if (isEmpty(allGeeks)) getAllGeeks()

        else if (
            !allGeeks.loading &&
            !allGeeks.error &&
            !geekLeague
        ) {
            const geeks = sortByUsername(Object.values(allGeeks))
                .filter(geek => geek._id !== user._id)
            setGeeks(geeks)
        }

        else if (
            geekLeague &&
            !geekLeague.error &&
            !allGeeks.loading &&
            !allGeeks.error
        ) {
            let geeks = Object.values(allGeeks)
                .filter(geek => {
                    let result = true
                    geekLeague.geeks.map(leagueGeek => {
                        if (leagueGeek._id.toString() === geek._id.toString()) result = false
                        return leagueGeek
                    })
                    return result
                })
            geeks = sortByUsername(geeks)
            setGeeks(geeks)
        }

    }, [allGeeks, getAllGeeks, geekLeague, user._id])

    return <Form.Item
        type='text'
        label={"Ajoute d'autres geeks :"}
        name="geeks"
        rules={!geekLeague && [
            {
                required: true,
                message: `Tu ne peux pas créer de ligue sans autres geeks.`,
            },
        ]}
    >

        {allGeeks.loading ? <Loader
            tip='Chargement des joueurs...'
            size='small'
            fontSize='2.4rem'
            tipSize='1rem'
            container={false}
        />

            : allGeeks.error ? <ErrorMessage>
                {allGeeks.error}
            </ErrorMessage>

                : <Select
                    mode="multiple"
                    style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left' }}
                    placeholder="Ajoute des geeks à ta ligue !"
                    optionLabelProp="label"
                    optionFilterProp='label'
                >

                    {geeks.map(geek => <Option
                        key={geek._id}
                        value={geek._id}
                        label={geek.username}
                    >

                        <div className="demo-option-label-item">

                            <span role="img" aria-label={geek.username}>
                                <img
                                    src={geek.photo}
                                    alt="profile"
                                    className='profile-pic-preview'
                                />
                            </span>
                            &nbsp;&nbsp;{geek.username}

                        </div>

                    </Option>)}

                </Select>}

    </Form.Item>
}

const mapStateToProps = ({ geekReducer, authReducer }) => ({
    allGeeks: geekReducer.allGeeks,
    user: authReducer.user
})

const mapDispatchToProps = { getAllGeeks }

export default connect(mapStateToProps, mapDispatchToProps)(GeekSelector)
