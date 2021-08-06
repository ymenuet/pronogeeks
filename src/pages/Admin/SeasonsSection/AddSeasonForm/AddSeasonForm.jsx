import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '../../../../ui/components';
import { useForm, useNotification } from '../../../../utils/hooks';
import { FormTitle, ButtonWrapper, InputContainer } from '../../Admin.styled';
import { SeasonForm } from '../SeasonsSection.styled';

import { downloadNewSeason } from '../../../../state/actions/apiFootballActions';

const formNames = {
  seasonApiID: 'seasonApiID',
};

const AddSeasonForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { newSeasonDownloaded, loading } = useSelector(
    ({ apiFootballReducer }) => apiFootballReducer
  );

  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.seasonApiID]: '',
    },
    onSubmit: (values) => dispatch(downloadNewSeason(values)),
    resetCondition: newSeasonDownloaded,
  });

  useNotification(newSeasonDownloaded, {
    title: t('admin.seasons.addSeason.notifications.success.title'),
  });

  return (
    <SeasonForm onSubmit={handleSubmit}>
      <FormTitle>{t('admin.seasons.addSeason.formTitle')}</FormTitle>
      <InputContainer>
        <Input
          {...inputsProps[formNames.seasonApiID]}
          placeholder={t('admin.seasons.addSeason.placeholder')}
          label={t('admin.seasons.addSeason.label')}
        />
      </InputContainer>
      <ButtonWrapper>
        <Button
          type="submit"
          label={t('admin.seasons.addSeason.button')}
          level="primary"
          disabled={!inputsProps[formNames.seasonApiID].value || loading}
        />
      </ButtonWrapper>
    </SeasonForm>
  );
};

export default AddSeasonForm;
