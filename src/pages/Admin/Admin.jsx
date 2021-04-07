import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from '../../ui/components'
import { ErrorMessage, Loader } from '../../components'
import { useUndergoingSeasons } from '../../utils/hooks'
import { Background, Container, PageTitle, Section, SubTitle, Form, FormTitle, Label, Select, Option, Input } from './Admin.styled'

const Admin = ({ loading }) => {
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [showCloseSeason, setShowCloseSeason] = useState(false)

    const { t } = useTranslation()

    const selectDefault = useRef(t('admin.seasons.closeSeason.placeholder'))

    const { seasons, errorSeasons } = useUndergoingSeasons()

    const handleSelectSeasonChange = e => {
        setSelectedSeason(e.target.value)
    }

    const handleButtonCloseSeason = e => {
        e.preventDefault()
        setShowCloseSeason(true)
    }

    const printSeason = season => season && `${season.leagueName} - ${season.year}`

    return <>
        <Background>

            {loading
                ? <Loader />

                : <Container>

                    <PageTitle>{t('admin.pageTitle')}</PageTitle>

                    <Section>

                        <SubTitle>{t('admin.seasons.title')}</SubTitle>

                        <Form onSubmit={handleButtonCloseSeason}>

                            <FormTitle>{t('admin.seasons.closeSeason.formTitle')}</FormTitle>

                            <Label>{t('admin.seasons.closeSeason.label')}</Label>

                            {seasons && <Select defaultValue={selectDefault.current} onChange={handleSelectSeasonChange}>

                                <Option value={selectDefault.current} disabled>{selectDefault.current}</Option>
                                {Object.values(seasons).map(season => <Option
                                    key={season._id}
                                    value={season._id}
                                >
                                    {printSeason(season)}
                                </Option>)}

                            </Select>}

                            {errorSeasons && <ErrorMessage>{errorSeasons}</ErrorMessage>}

                            <Button
                                type='submit'
                                disabled={!selectedSeason}
                                label={t('admin.seasons.closeSeason.button')}
                            />

                        </Form>

                        <Form>
                            <FormTitle>{t('admin.seasons.addSeason.formTitle')}</FormTitle>
                            <Label>{t('admin.seasons.addSeason.label')}</Label>
                            <Input placeholder={t('admin.seasons.addSeason.placeholder')} />
                            <Button type='submit' label={t('admin.seasons.addSeason.button')} />
                        </Form>

                    </Section>
                </Container>
            }
        </Background>
        <Modal
            title={t('admin.seasons.closeSeason.modal.title')}
            body={t('admin.seasons.closeSeason.modal.body', { season: seasons && printSeason(seasons[selectedSeason]) })}
            isVisible={true}
            onClose={() => setShowCloseSeason(false)}
            buttons={[
                <Button key={1} label={t('admin.seasons.closeSeason.modal.cancel')} />,
                <Button key={2} label={t('admin.seasons.closeSeason.modal.confirm')} />,
            ]}
        />
    </>
}

export default Admin
