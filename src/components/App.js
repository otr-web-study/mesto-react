import {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
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

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    
    setIsPreviewPopupOpen(true);
  }

  return (
    <>
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}/>
      <Footer/>
      <PopupWithForm 
        name="profile" 
        title="Редактировать профиль" 
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
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
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
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
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          id="avatar-option" 
          type="url" 
          className="popup-edit__input popup-edit__input_type_option-avatar"  
          name="link"
          required
          placeholder="Ссылка на картинку"/>
        <span className="popup-edit__error avatar-option-error"></span>
      </PopupWithForm>
      <PopupWithForm name="confirm" title="Вы уверены?" buttonTitle="Да" onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} isOpen={isPreviewPopupOpen} onClose={closeAllPopups}/>
    </>
  );
}

export default App;
