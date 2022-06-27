import {useState, useEffect, useContext} from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch(err => {console.log(err)});
      }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    
    api.handleLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch(err => {console.log(err)});
  }

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля пользователя."/>
          <button 
            className="profile__avatar-edit-button" 
            type="button" 
            aria-label="Редактировать"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__author-container">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button 
              className="profile__edit-button button" 
              type="button" 
              aria-label="Редактировать"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__bio">{currentUser.about}</p>       
        </div>
        <button 
          className="profile__add-button button" 
          type="button" 
          aria-label="Добавить"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements page__elements">
        <ul className="elements__list">
          {cards.map(item => {
            return <Card 
                    card={item} 
                    key={item._id} 
                    onClick={onCardClick} 
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}/>;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;