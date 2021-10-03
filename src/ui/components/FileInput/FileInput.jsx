import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import i18n from '../../../i18n';
import { appendPhoto } from '../../../utils/helpers';
import { StyledFileInput, InputContainer, BrowseButton } from './FileInput.styled';
import Input from '../Input';

const FileInput = ({
  label,
  labelColor,
  buttonLabel,
  value,
  onChange,
  placeholder,
  validation,
  disabled,
  name,
}) => {
  const fileInputRef = useRef();
  const textInputRef = useRef();

  const uploadPhoto = (_, inputName, event) => {
    if (event.target.files.length > 0) {
      onChange(appendPhoto(event), inputName, event);
    }
  };

  const onTextInputFocus = () => {
    textInputRef.current.blur();
    fileInputRef.current.click();
  };

  const onChangeFileInput = (e) => {
    if (e.target.files[0]) onChange(e.target.files[0], name, e);
  };

  return (
    <>
      <StyledFileInput ref={fileInputRef} type="file" onChange={onChangeFileInput} />
      <InputContainer>
        <Input
          label={label}
          labelColor={labelColor}
          value={value?.name || ''}
          placeholder={placeholder}
          validation={validation}
          disabled={disabled}
          name={name}
          onChange={uploadPhoto}
          cursor="pointer"
          ref={textInputRef}
          onFocus={onTextInputFocus}
        />
        <BrowseButton onClick={onTextInputFocus}>{buttonLabel}</BrowseButton>
      </InputContainer>
    </>
  );
};

FileInput.defaultProps = {
  value: undefined,
  label: null,
  labelColor: 'label',
  placeholder: i18n.t('ui.components.fileInput.placeholder'),
  buttonLabel: i18n.t('ui.components.fileInput.selectFile'),
  validation: undefined,
  disabled: false,
  name: '',
};

FileInput.propTypes = {
  value: PropTypes.instanceOf(File),
  label: PropTypes.string,
  labelColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default FileInput;
