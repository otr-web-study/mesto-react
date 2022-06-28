import PopupWithForm from "./PopupWithForm";
import {useState,  useContext, useEffect} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, isInAction, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('1');
  const [description, setDescription] = useState('2');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name="profile" 
      title="Редактировать профиль" 
      buttonTitle="Сохранить"
      buttonTitleInAction="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input 
          id="author-name"
          type="text" 
          className="popup-edit__input popup-edit__input_type_name" 
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange} />
        <span className="popup-edit__error author-name-error"></span>
        <input 
          id="author-option"
          type="text" 
          className="popup-edit__input popup-edit__input_type_option" 
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={description}
          onChange={handleDescriptionChange} />
      <span className="popup-edit__error author-option-error"></span>
      <button className="popup-edit__button-save" type="submit" onClick={handleSubmit}>
        {isInAction ? "Сохранение...": "Сохранить"}
      </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;