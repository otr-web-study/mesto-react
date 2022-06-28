import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup({isOpen, isInAction, onClose, onUpdateAvatar}) {
  const urlRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }
  
  return (
    <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        <input
          ref={urlRef}
          id="avatar-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option-avatar"  
          name="link"
          required
          placeholder="Ссылка на картинку"/>
        <span className="popup-edit__error avatar-option-error"></span>
        <button className="popup-edit__button-save" type="submit" onClick={handleSubmit}>
          {isInAction ? "Сохранение...": "Сохранить"}
        </button>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;