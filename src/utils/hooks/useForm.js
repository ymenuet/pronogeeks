import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { openNotification, uploadFile } from '../helpers';
import { valueRequired } from '../helpers/inputValidations';

export const useForm = ({
  initialValues = {},
  onSubmit = () => {},
  resetCondition,
  validations = {},
}) => {
  const { t } = useTranslation();

  const createInputsPropsObject = useCallback(() => {
    const inputsProps = {};
    Object.keys(initialValues).map((key) => {
      inputsProps[key] = {
        value: initialValues[key],
        name: key,
      };
      return key;
    });
    return inputsProps;
  }, [initialValues]);

  const [inputsProps, setInputsProps] = useState(createInputsPropsObject());
  const [initialValuesUpdated, setInitialValuesUpdated] = useState(false);

  useEffect(() => {
    if (resetCondition && !initialValuesUpdated) {
      setInputsProps(createInputsPropsObject());
      setInitialValuesUpdated(true);
    }
  }, [resetCondition, initialValuesUpdated, createInputsPropsObject]);

  const setInputProp = ({ inputName, prop, value }) =>
    setInputsProps((previousState) => ({
      ...previousState,
      [inputName]: {
        ...previousState[inputName],
        [prop]: value,
      },
    }));

  const setInputValue = useCallback((inputName, value) => {
    setInputProp({
      inputName,
      prop: 'value',
      value,
    });
  }, []);

  const setInputValidation = useCallback(
    (inputName, value) =>
      setInputProp({
        inputName,
        prop: 'validation',
        value,
      }),
    []
  );

  const resetValidation = useCallback(
    (inputName) => setInputValidation(inputName, undefined),
    [setInputValidation]
  );

  const handleInputChange = useCallback(
    (value, name, event) => {
      if (event) event.persist();
      setInputValue(name, value);
      resetValidation(name);
    },
    [setInputValue, resetValidation]
  );

  const inputNotValid = (inputName) =>
    validations[inputName].validation
      ? !validations[inputName].validation(inputsProps[inputName].value)
      : !valueRequired(inputsProps[inputName].value);

  const checkValidation = () => {
    let error = false;
    Object.keys(validations).map((inputName) => {
      if (inputNotValid(inputName)) {
        setInputValidation(
          inputName,
          validations[inputName].message || t('formValidations.defaultValidationMessage')
        );
        error = true;
      }
      return inputName;
    });
    return error;
  };

  const getValuesObject = async () => {
    const valuesObject = {};
    try {
      await Promise.all(
        Object.keys(inputsProps).map(async (key) => {
          const { value } = inputsProps[key];
          if (value instanceof File) valuesObject[key] = await uploadFile(value);
          else valuesObject[key] = value;
          return key;
        })
      );
    } catch (error) {
      openNotification('error', error);
    }
    return valuesObject;
  };

  const handleSubmit = async (e, setLoading) => {
    e.preventDefault();
    const validationError = checkValidation();
    if (validationError) return;
    if (setLoading) setLoading(true);
    const values = await getValuesObject();
    if (Object.keys(values).length) onSubmit(values);
    if (setLoading) setLoading(false);
  };

  const inputsPropsWithOnChange = () => {
    const result = { ...inputsProps };
    Object.keys(result).map((key) => {
      result[key].onChange = handleInputChange;
      return key;
    });
    return result;
  };

  return {
    // inputsProps contains name, value, validation and onChange props
    inputsProps: inputsPropsWithOnChange(),
    handleSubmit,
  };
};
