import React from 'react'
import { useTranslation } from 'react-i18next'
import { Loader } from '../../components'
import { Background, Container, PageTitle } from './Admin.styled'
import SeasonsSection from './SeasonsSection'

const Admin = ({ loading }) => {
    const { t } = useTranslation()

    return <>
        <Background>

            {loading ? <Loader />

                : <Container>

                    <PageTitle>{t('admin.pageTitle')}</PageTitle>

                    <SeasonsSection />

                </Container>
            }
        </Background>
    </>
}

export default Admin
