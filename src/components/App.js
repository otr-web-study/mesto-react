import {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isPopupInAction, setIsPopupInAction] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.batchFetch([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
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
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  const handlePopupMouseDown = (evt) => {
    if (evt.target.classList.contains('popup__close-button')
        || evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    
    setIsPreviewPopupOpen(true);
  }

  const handleUpdateUser = (userData) => {
    setIsPopupInAction(true);

    api.updateUserData(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditProfilePopupOpen(false);
        setIsPopupInAction(false);
      })
      .catch(err => {console.log(err)});
  }

  const handleUpdateAvatar = (avatarData) => {
    setIsPopupInAction(true);

    api.updateUserAvatar(avatarData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPopupInAction(false)});
  }

  const handleAddPlaceSubmit = (placeData) => {
    setIsPopupInAction(true);

    api.addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPopupInAction(false)});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    
    api.handleLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  const handleConfirmCardDelete = (evt) => {
    evt.preventDefault();
    setIsPopupInAction(true);

    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== selectedCard._id));
        setIsConfirmPopupOpen(false);
        setIsPopupInAction(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => { setSelectedCard({})});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        cards={cards} 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}/>
      <Footer/>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        isInAction={isPopupInAction}
        onMouseDown={handlePopupMouseDown}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        isInAction={isPopupInAction}
        onMouseDown={handlePopupMouseDown}
        onAddPlaceSubmit={handleAddPlaceSubmit}/>
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        isInAction={isPopupInAction}
        onMouseDown={handlePopupMouseDown} 
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm 
        name="confirm" 
        title="Вы уверены?"  
        isOpen={isConfirmPopupOpen} 
        onMouseDown={handlePopupMouseDown}>
          <button className="popup-edit__button-save" type="submit" onClick={handleConfirmCardDelete}>
            {isPopupInAction ? "Удаление...": "Да"}
          </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isPreviewPopupOpen} onMouseDown={handlePopupMouseDown}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
