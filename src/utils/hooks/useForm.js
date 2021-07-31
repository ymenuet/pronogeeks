import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { valueRequired } from "../../utils/helpers/inputValidations";

export const useForm = ({
  initialValues = {},
  onSubmit = () => {},
  resetCondition,
  validations = {},
}) => {
  const { t } = useTranslation();

  const createInputsPropsObject = useCallback(() => {
    const inputsProps = {};
    Object.keys(initialValues).map(
      (key) =>
        (inputsProps[key] = {
          value: initialValues[key],
          name: key,
        })
    );
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
      prop: "value",
      value,
    });
  }, []);

  const setInputValidation = useCallback(
    (inputName, value) =>
      setInputProp({
        inputName,
        prop: "validation",
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
      event && event.persist();
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
          validations[inputName].message ||
            t("formValidations.defaultValidationMessage")
        );
        error = true;
      }
      return inputName;
    });
    return error;
  };

  const getValuesObject = () => {
    const valuesObject = {};
    Object.keys(inputsProps).map(
      (key) => (valuesObject[key] = inputsProps[key].value)
    );
    return valuesObject;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = checkValidation();
    if (validationError) return;
    onSubmit(getValuesObject());
  };

  const inputsPropsWithOnChange = (inputsProps) => {
    Object.keys(inputsProps).map((key) => {
      inputsProps[key].onChange = handleInputChange;
      return key;
    });
    return inputsProps;
  };

  return {
    // inputsProps contains name, value, validation and onChange props
    inputsProps: inputsPropsWithOnChange(inputsProps),
    handleSubmit,
  };
};
