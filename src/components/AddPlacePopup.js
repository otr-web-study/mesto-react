import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup({isOpen, isInAction, onClose, onAddPlaceSubmit}) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlaceSubmit({
      link,
      name,
    })
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  return (
    <PopupWithForm 
        name="place" 
        title="Новое место" 
        isOpen={isOpen}
        onClose={onClose}>
        <input
          id="place-name" 
          type="text" 
          className="popup-edit__input popup-edit__input_type_name" 
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={name}
          onChange={handleNameChange}/>
        <span className="popup-edit__error place-name-error"></span>
        <input
          id="place-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option"  
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}/>
        <span className="popup-edit__error place-option-error"></span>
        <button className="popup-edit__button-save" type="submit" onClick={handleSubmit}>
          {isInAction ? "Добавление...": "Создать"}
        </button>
      </PopupWithForm>
  );
}

export default AddPlacePopup;