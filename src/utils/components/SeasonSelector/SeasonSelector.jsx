import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import i18n from '../../../i18n';
import { SeasonModel } from '../../models';
import { Select } from '../../../ui/components';
import { ErrorMessage } from '../../../components';

const SeasonSelector = ({
  seasons,
  error,
  name,
  onChange,
  label,
  labelColor,
  validation,
  noOptionMessage,
}) => {
  const { t } = useTranslation();

  let options = [];

  if (seasons && !seasons.empty)
    options = Object.values(seasons).map((season) => ({
      value: season._id,
      label: `${season.leagueName} - ${season.year}`,
    }));

  return error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <Select
      name={name}
      placeholder={t('forms.seasonSelector.placeholder')}
      options={options}
      onChange={onChange}
      label={label}
      labelColor={labelColor}
      noOptionMessage={noOptionMessage}
      validation={validation}
    />
  );
};

SeasonSelector.defaultProps = {
  label: i18n.t('forms.seasonSelector.defaultLabel'),
  labelColor: undefined,
  error: null,
  validation: undefined,
  seasons: [],
  noOptionMessage: undefined,
};

SeasonSelector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  validation: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  seasons: PropTypes.objectOf(SeasonModel),
  noOptionMessage: PropTypes.string,
};

export default SeasonSelector;
