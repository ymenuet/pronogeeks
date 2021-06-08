import React from 'react'
import PropTypes from 'prop-types'

import i18n from '../../i18n'
import { Loader, ErrorMessage } from '../'
import { useAllGeeks } from '../../utils/hooks'
import { MultipleSelect } from '../../ui/components'

const GeekSelector = ({ geekLeague, name, onChange, validation, label, value }) => {

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

            : <MultipleSelect
                onChange={onChange}
                name={name}
                value={value}
                label={label}
                validation={validation}
                options={geeks.map(geek => ({
                    ...geek,
                    value: geek._id,
                    label: geek.username
                }))}
            />
}

GeekSelector.defaultProps = {
    name: i18n.t('forms.geekSelector.defaultName'),
    label: i18n.t('forms.geekSelector.defaultLabel'),
    validation: undefined,
    geekLeague: null,
}

GeekSelector.propTypes = {
    name: PropTypes.string,
    value: PropTypes.array.isRequired,
    label: PropTypes.string,
    validation: PropTypes.string,
    geekLeague: PropTypes.shape({}), // TODO: create GeekLeagueModel
    onChange: PropTypes.func.isRequired
}

export default GeekSelector
