import React from 'react'
import { Loader, ErrorMessage } from '../'
import { useAllGeeks } from '../../utils/hooks'
import { Form, Select } from 'antd'

const { Option } = Select

const GeekSelector = ({ geekLeague, name }) => {

    const { geeks, loadingGeeks, errorGeeks } = useAllGeeks(geekLeague)

    return <Form.Item
        type='text'
        label={"Ajoute d'autres geeks :"}
        name={name}
        rules={!geekLeague && [
            {
                required: true,
                message: `Tu ne peux pas créer de ligue sans autres geeks.`,
            },
        ]}
    >

        {errorGeeks ? <ErrorMessage>
            {errorGeeks}
        </ErrorMessage>

            : loadingGeeks ? <Loader
                tip='Chargement des joueurs...'
                size='small'
                fontSize='2.4rem'
                tipSize='1rem'
                container={false}
            />

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

GeekSelector.defaultProps = {
    name: 'geeks',
}

export default GeekSelector
