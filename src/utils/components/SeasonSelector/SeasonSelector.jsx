import React from 'react'
import { useTranslation } from 'react-i18next'

import { Select } from '../../../ui/components'

const SeasonSelector = ({ seasons }) => {
    const { t } = useTranslation()

    const options = seasons && Object.values(seasons).map(season => ({ value: season._id, name: `${season.leagueName} - ${season.year}` }))

    return (
        <Select options={options} placeholder={t('forms.seasonSelector.placeholder')} onChange={() => { }} />
    )
}

export default SeasonSelector
