import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Button, Modal } from '../../../../ui/components'
import { SeasonSelector } from '../../../../utils/components'
import { useUndergoingSeasons, useNotification, useForm } from '../../../../utils/hooks'
import { SeasonForm } from '../SeasonsSection.styled'
import { FormTitle, ButtonWrapper, InputContainer } from '../../Admin.styled'

import {
    closeSeason, targetedResetSeasons
} from '../../../../state/actions/seasonActions'

const printSeason = season => season && `${season.leagueName} - ${season.year}`

const formNames = {
    season: 'season'
}

const CloseSeasonForm = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const {
        seasonClosed,
        loading
    } = useSelector(({
        seasonReducer
    }) => seasonReducer)

    const { seasons, errorSeasons } = useUndergoingSeasons()

    const [showCloseSeason, setShowCloseSeason] = useState(false)

    const { inputsProps, handleSubmit } = useForm({
        initialValues: {
            [formNames.season]: ''
        },
        onSubmit: () => setShowCloseSeason(true),
        resetCondition: seasonClosed
    })

    const handleCloseSeasonEvent = () => {
        dispatch(closeSeason(inputsProps[formNames.season].value))
        setShowCloseSeason(false)
    }

    useNotification(seasonClosed, {
        title: t('admin.seasons.closeSeason.notifications.success.title'),
        message: t('admin.seasons.closeSeason.notifications.success.message', {
            seasonClosed
        })
    }, () => dispatch(targetedResetSeasons({ seasonClosed })))

    return (
        <>
            <SeasonForm onSubmit={handleSubmit}>

                <FormTitle>{t('admin.seasons.closeSeason.formTitle')}</FormTitle>

                <InputContainer>
                    <SeasonSelector
                        {...inputsProps[formNames.season]}
                        placeholder={t('admin.seasons.closeSeason.placeholder')}
                        seasons={seasons}
                        label={t('admin.seasons.closeSeason.label')}
                        error={errorSeasons}
                        noOptionMessage={t('admin.seasons.closeSeason.noUndergoingSeason')}
                    />
                </InputContainer>

                <ButtonWrapper>
                    <Button
                        type='submit'
                        disabled={!inputsProps[formNames.season].value || loading}
                        label={t('admin.seasons.closeSeason.button')}
                        level='primary'
                    />
                </ButtonWrapper>

            </SeasonForm>

            <Modal
                title={t('admin.seasons.closeSeason.modal.title')}
                body={t('admin.seasons.closeSeason.modal.body', { season: seasons && printSeason(seasons[inputsProps[formNames.season].value]) })}
                isVisible={showCloseSeason}
                onClose={() => setShowCloseSeason(false)}
                buttons={[
                    <Button
                        key={1}
                        label={t('admin.seasons.closeSeason.modal.cancel')}
                        level='secondary'
                        type='button'
                        kind='error'
                        onClick={() => setShowCloseSeason(false)}
                    />,
                    <Button
                        key={2}
                        label={t('admin.seasons.closeSeason.modal.confirm')}
                        level='primary'
                        type='button'
                        onClick={handleCloseSeasonEvent}
                    />,
                ]}
            />
        </>
    )
}

export default CloseSeasonForm
