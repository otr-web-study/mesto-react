import {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => {console.log(err)});
      }, []);
  
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

  const handleUpdateUser = (userData) => {
    api.updateUserData(userData)
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch(err => {console.log(err)});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}/>
      <Footer/>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
