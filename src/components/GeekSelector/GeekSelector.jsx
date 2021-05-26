import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

import i18n from '../../i18n'
import { Loader, ErrorMessage } from '../'
import { useAllGeeks } from '../../utils/hooks'
import { InputValidation } from '../../ui/components'
import { Container, Label } from './GeekSelector.styled'

const { Option } = Select

const GeekSelector = ({ geekLeague, name, onChange, validation, label }) => {

    const { geeks, loadingGeeks, errorGeeks } = useAllGeeks(geekLeague)

    return errorGeeks ? <ErrorMessage>
        {errorGeeks}
    </ErrorMessage>

        : loadingGeeks ? <Loader
            tip='Chargement des joueurs...'
            size='small'
            fontSize='2.4rem'
            tipSize='1rem'
            container={false}
        />

            : <Container>

                <Label>{label}</Label>

                <Select // TODO: create own multiple select component
                    mode="multiple"
                    name={name}
                    style={{ width: '100%', borderRadius: 15.8, overflow: 'hidden', textAlign: 'left' }}
                    placeholder="Ajoute des geeks à ta ligue !"
                    optionLabelProp="label"
                    optionFilterProp='label'
                    onChange={onChange}
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

                </Select>

                {validation && <InputValidation validation={validation} />}

            </Container>
}

GeekSelector.defaultProps = {
    name: i18n.t('forms.geekSelector.defaultName'),
    label: i18n.t('forms.geekSelector.defaultLabel'),
    validation: undefined,
    geekLeague: null,
}

GeekSelector.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    validation: PropTypes.string,
    geekLeague: PropTypes.shape({}), // TODO: create GeekLeagueModel
    onChange: PropTypes.func.isRequired
}

export default GeekSelector
