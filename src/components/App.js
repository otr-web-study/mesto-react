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
  const [isPendingServerResponse, setIsPendingServerResponse] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
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
    setSelectedCard(null);
    setDeletedCard(null);
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }

  const handleUpdateUser = (userData) => {
    setIsPendingServerResponse(true);

    api.updateUserData(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)})
  }

  const handleUpdateAvatar = (avatarData) => {
    setIsPendingServerResponse(true);

    api.updateUserAvatar(avatarData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleAddPlaceSubmit = (placeData) => {
    setIsPendingServerResponse(true);

    api.addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
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
    setDeletedCard(card);
  }

  const handleConfirmCardDelete = (evt) => {
    evt.preventDefault();
    setIsPendingServerResponse(true);

    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== deletedCard._id));
        setDeletedCard(null);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} />
      <Footer/>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit} />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm 
        name="confirm" 
        title="Вы уверены?"  
        isOpen={deletedCard !== null}
        onClose={closeAllPopups}>
        <button className="popup-edit__button-save" type="submit" onClick={handleConfirmCardDelete}>
          {isPendingServerResponse ? "Удаление...": "Да"}
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
