import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPopupOpen(false);
    setSelectedCard({});
  }

  const handleCardClick = (evt) => {
    setSelectedCard({
      name: evt.target.getAttribute('alt'),
      link: evt.target.getAttribute('src')});

      setIsPreviewPopupOpen(true);
  }

  return (
    <>
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}/>
      <Footer/>
      <PopupWithForm 
        name="profile" 
        title="Редактировать профиль" 
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}>
        <input 
            id="author-name"
            type="text" 
            className="popup-edit__input popup-edit__input_type_name" 
            name="name"
            required
            minLength="2"
            maxLength="40"
            placeholder="Имя"/>
          <span className="popup-edit__error author-name-error"></span>
          <input 
            id="author-option"
            type="text" 
            className="popup-edit__input popup-edit__input_type_option" 
            name="about"
            required
            minLength="2"
            maxLength="200"
            placeholder="О себе"/>
          <span className="popup-edit__error author-option-error"></span>
      </PopupWithForm>
      <PopupWithForm 
        name="place" 
        title="Новое место" 
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}>
        <input
          id="place-name" 
          type="text" 
          className="popup-edit__input popup-edit__input_type_name" 
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"/>
        <span className="popup-edit__error place-name-error"></span>
        <input
          id="place-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option"  
          name="link"
          required
          placeholder="Ссылка на картинку"/>
        <span className="popup-edit__error place-option-error"></span>
      </PopupWithForm>
      <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}>
        <input
          id="avatar-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option-avatar"  
          name="link"
          required
          placeholder="Ссылка на картинку"/>
        <span className="popup-edit__error avatar-option-error"></span>
      </PopupWithForm>
      <PopupWithForm name="confirm" title="Вы уверены?" buttonTitle="Да"/>
      <ImagePopup card={selectedCard} isOpen={isPreviewPopupOpen}/>
    </>
  );
}

export default App;
