import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import i18n from '../../../i18n'
import { SeasonModel } from '../../models/PropTypes'
import { Select } from '../../../ui/components'
import { ErrorMessage, Loader } from '../../../components'

const SeasonSelector = ({ seasons, error, name, onChange, label, validation, noOptionMessage }) => {
    const { t } = useTranslation()

    let options = []

    if (seasons && !seasons.empty) options = Object.values(seasons).map(season => ({ value: season._id, label: `${season.leagueName} - ${season.year}` }))

    return error ? <ErrorMessage>
        {error}
    </ErrorMessage>

        : options ? <Select
            name={name}
            placeholder={t('forms.seasonSelector.placeholder')}
            options={options}
            onChange={onChange}
            label={label}
            noOptionMessage={noOptionMessage}
            validation={validation}
        />

            : <Loader
                tip='Chargement des saisons...'
                size='small'
                fontSize='2.4rem'
                tipSize='1rem'
                container={false}
            />
}

SeasonSelector.defaultProps = {
    name: i18n.t('forms.seasonSelector.defaultName'),
    label: i18n.t('forms.seasonSelector.defaultLabel'),
    error: null,
    validation: undefined,
    seasons: [],
    noOptionMessage: undefined,
}

SeasonSelector.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    validation: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    seasons: PropTypes.objectOf(SeasonModel),
    noOptionMessage: PropTypes.string,
}

export default SeasonSelector
