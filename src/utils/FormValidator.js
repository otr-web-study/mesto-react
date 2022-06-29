import {useState} from 'react';

export const useInputWithValidation = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  const onChange = (evt) => {
    setValue(evt.target.value);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  return {
    value,
    isValid,
    validationMessage,
    onChange,
    setValue
  }

}
