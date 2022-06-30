import PopupWithForm from "./PopupWithForm";
import {useInputWithValidation, useFormValid} from "../utils/FormValidators";

function AddPlacePopup({isOpen, isInAction, onMouseDown, onAddPlaceSubmit}) {
  const link = useInputWithValidation('', isOpen);
  const name = useInputWithValidation('', isOpen);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlaceSubmit({
      link: link.value,
      name: name.value,
    });
  }

  const [isFormValid] = useFormValid([link, name]);

  return (
    <PopupWithForm 
        name="place" 
        title="Новое место" 
        isOpen={isOpen}
        onMouseDown={onMouseDown}>
        <input
          id="place-name" 
          type="text" 
          className="popup-edit__input popup-edit__input_type_name" 
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={name.value}
          onChange={name.onChange}/>
        <span className={`popup-edit__error place-name-error ${!name.isValid && 'popup-edit__error_active'}`}>
          {!name.isValid && name.validationMessage}
        </span>
        <input
          id="place-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option"  
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link.value}
          onChange={link.onChange}/>
        <span className={`popup-edit__error place-option-error ${!link.isValid && 'popup-edit__error_active'}`}>
          {!link.isValid && link.validationMessage}
        </span>
        <button 
          className={`popup-edit__button-save ${!isFormValid && 'popup-edit__button-save_inactive'}`}
          type="submit" 
          onClick={handleSubmit}
          disabled={!isFormValid}>
          {isInAction ? "Добавление...": "Создать"}
        </button>
      </PopupWithForm>
  );
}

export default AddPlacePopup;