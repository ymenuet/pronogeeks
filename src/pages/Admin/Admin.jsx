import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorMessage, Loader } from '../../components'
import { useUndergoingSeasons } from '../../utils/hooks'
import { Background, Container, PageTitle, Section, SubTitle, Form, FormTitle, Label, Select, Option, Input, Button } from './Admin.styled'

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

    return <Background>
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
                            >{season.leagueName} - {season.year}</Option>)}
                        </Select>}
                        {errorSeasons && <ErrorMessage>{errorSeasons}</ErrorMessage>}
                        <Button
                            type='submit'
                            disabled={!selectedSeason}
                        >
                            {t('admin.seasons.closeSeason.button')}
                        </Button>
                    </Form>

                    <Form>
                        <FormTitle>{t('admin.seasons.addSeason.formTitle')}</FormTitle>
                        <Label>{t('admin.seasons.addSeason.label')}</Label>
                        <Input placeholder={t('admin.seasons.addSeason.placeholder')} />
                        <Button type='submit'>{t('admin.seasons.addSeason.button')}</Button>
                    </Form>

                </Section>
            </Container>
        }

        {showCloseSeason && <h3>ARE YOU SURE?</h3>} {/* TODO */}
    </Background>
}

export default Admin
