import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n';
import { Loader, ErrorMessage } from '..';
import { useAllGeeks } from '../../utils/hooks';
import { Avatar, MultipleSelect } from '../../ui/components';

import { OptionContainer, Username } from './GeekSelector.styled';
import { GeekLeagueModel } from '../../utils/models';

const Option = ({ username, photo, onMouseDown, onMouseEnter, onClick, preSelected }) => {
  return (
    <OptionContainer
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      preSelected={preSelected}
    >
      <Avatar url={photo} remSize={2} alt={username} />
      <Username>{username}</Username>
    </OptionContainer>
  );
};

Option.defaultProps = {
  username: undefined,
  photo: undefined,
  preSelected: false,
};

Option.propTypes = {
  username: PropTypes.string,
  photo: PropTypes.string,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  preSelected: PropTypes.bool,
};

const GeekSelector = ({ geekLeague, name, onChange, validation, label, labelColor, value }) => {
  const { geeks, loadingGeeks, errorGeeks } = useAllGeeks(geekLeague);

  if (errorGeeks) return <ErrorMessage>{errorGeeks}</ErrorMessage>;

  if (loadingGeeks)
    return (
      <Loader
        tip="Chargement des joueurs..."
        size="small"
        fontSize="2.4rem"
        tipSize="1rem"
        container={false}
      />
    );

  return (
    <MultipleSelect
      onChange={onChange}
      name={name}
      value={value}
      label={label}
      labelColor={labelColor}
      validation={validation}
      options={geeks.map((geek) => ({
        ...geek,
        value: geek._id,
        label: geek.username,
      }))}
      optionComponent={Option}
    />
  );
};

GeekSelector.defaultProps = {
  label: i18n.t('forms.geekSelector.defaultLabel'),
  labelColor: undefined,
  validation: undefined,
  geekLeague: null,
};

GeekSelector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  validation: PropTypes.string,
  geekLeague: GeekLeagueModel,
  onChange: PropTypes.func.isRequired,
};

export default GeekSelector;
