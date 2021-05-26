import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Input } from '../../../../ui/components'
import { FormTitle, ButtonWrapper, InputContainer } from '../../Admin.styled'
import { SeasonForm } from '../SeasonsSection.styled'

const AddSeasonForm = () => {
    const { t } = useTranslation()

    // TODO: use useForm
    return (
        <SeasonForm>
            <FormTitle>{t('admin.seasons.addSeason.formTitle')}</FormTitle>
            <InputContainer>
                <Input
                    placeholder={t('admin.seasons.addSeason.placeholder')}
                    label={t('admin.seasons.addSeason.label')}
                />
            </InputContainer>
            <ButtonWrapper>
                <Button
                    type='submit'
                    label={t('admin.seasons.addSeason.button')}
                    level='primary'
                />
            </ButtonWrapper>
        </SeasonForm>
    )
}

export default AddSeasonForm
