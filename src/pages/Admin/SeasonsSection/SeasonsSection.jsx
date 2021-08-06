import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section, SubTitle } from '../Admin.styled';
import CloseSeasonForm from './CloseSeasonForm';
import AddSeasonForm from './AddSeasonForm';

const SeasonsSection = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <SubTitle>{t('admin.seasons.title')}</SubTitle>

      <CloseSeasonForm />

      <AddSeasonForm />
    </Section>
  );
};

export default SeasonsSection;
