import {useState, useEffect, useRef} from 'react';

export const useInputWithValidation = (initialValue, isOpen) => {
  const [value, setValue] = useState(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setValue(initialValue);
      setIsRedacted(false);
      setIsValid(true);
    }
  }, [isOpen]);

  const onChange = (evt) => {
    setValue(evt.target.value);
    setIsRedacted(true);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  return {
    value,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    setValue,
    setIsRedacted,
  }
}

export const useInputRefWithValidation = (initialValue, isOpen) => {
  const ref = useRef(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      ref.current.value = initialValue;
      setIsRedacted(false);
      setIsValid(true);
    }
  }, [isOpen]);

  const onChange = (evt) => {
    setIsRedacted(true);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  return {
    ref,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    setIsRedacted,
  }

}

export const useFormValid = (inputs) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(inputs.filter((input) => !input.isRedacted || !input.isValid).length === 0);
  }, inputs);

  return [isFormValid, setIsFormValid];
}
