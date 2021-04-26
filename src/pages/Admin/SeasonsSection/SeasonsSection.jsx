import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Modal, Select, Input } from '../../../ui/components'
import { ErrorMessage } from '../../../components'
import { useUndergoingSeasons, useNotification } from '../../../utils/hooks'
import { Section, SubTitle, FormTitle, Label, ButtonWrapper, InputContainer } from '../Admin.styled'
import { SeasonForm } from './SeasonsSection.styled'

import {
    closeSeason, targetedResetSeasons
} from '../../../state/actions/seasonActions'

const SeasonsSection = () => {
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [showCloseSeason, setShowCloseSeason] = useState(false)

    const { t } = useTranslation()

    const dispatch = useDispatch()

    const {
        seasonClosed,
    } = useSelector(({
        seasonReducer
    }) => seasonReducer)

    const { seasons, errorSeasons } = useUndergoingSeasons()

    useNotification(seasonClosed, {
        title: t('admin.seasons.closeSeason.notifications.success.title'),
        message: t('admin.seasons.closeSeason.notifications.success.message', {
            seasonClosed
        })
    }, () => dispatch(targetedResetSeasons({ seasonClosed })))

    const handleSelectSeasonChange = e => {
        setSelectedSeason(e.target.value)
    }

    const handleButtonCloseSeason = e => {
        e.preventDefault()
        setShowCloseSeason(true)
    }

    const handleCloseSeasonEvent = () => {
        dispatch(closeSeason(selectedSeason))
        setShowCloseSeason(false)
    }

    const printSeason = season => season && `${season.leagueName} - ${season.year}`

    const mapSeasonsForSelect = seasons => seasons ? Object.values(seasons).map(season => ({
        value: season._id,
        name: printSeason(season)
    })) : []

    return (
        <Section>

            <SubTitle>{t('admin.seasons.title')}</SubTitle>

            <SeasonForm onSubmit={handleButtonCloseSeason}>

                <FormTitle>{t('admin.seasons.closeSeason.formTitle')}</FormTitle>

                <Label>{t('admin.seasons.closeSeason.label')}</Label>

                <InputContainer>
                    <Select
                        defaultValue={t('admin.seasons.closeSeason.placeholder')}
                        onChange={handleSelectSeasonChange}
                        options={mapSeasonsForSelect(seasons)}
                    />
                </InputContainer>

                {errorSeasons && <ErrorMessage>{errorSeasons}</ErrorMessage>}

                <ButtonWrapper>
                    <Button
                        type='submit'
                        disabled={!selectedSeason}
                        label={t('admin.seasons.closeSeason.button')}
                        level='primary'
                    />
                </ButtonWrapper>

            </SeasonForm>

            <SeasonForm>
                <FormTitle>{t('admin.seasons.addSeason.formTitle')}</FormTitle>
                <Label>{t('admin.seasons.addSeason.label')}</Label>
                <InputContainer>
                    <Input placeholder={t('admin.seasons.addSeason.placeholder')} />
                </InputContainer>
                <ButtonWrapper>
                    <Button
                        type='submit'
                        label={t('admin.seasons.addSeason.button')}
                        level='primary'
                    />
                </ButtonWrapper>
            </SeasonForm>

            <Modal
                title={t('admin.seasons.closeSeason.modal.title')}
                body={t('admin.seasons.closeSeason.modal.body', { season: seasons && printSeason(seasons[selectedSeason]) })}
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

        </Section>
    )
}

export default SeasonsSection
