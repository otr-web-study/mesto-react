import {useState, useEffect} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.batchFetch([api.getInitialCards(), api.getUserData()])
      .then(([initialCards, { name, about, avatar }]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);

        setCards(initialCards);
      })
      .catch(err => {console.log(err)});
      }, []);

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Фото профиля пользователя."/>
          <button 
            className="profile__avatar-edit-button" 
            type="button" 
            aria-label="Редактировать"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__author-container">
            <h1 className="profile__author">{userName}</h1>
            <button 
              className="profile__edit-button button" 
              type="button" 
              aria-label="Редактировать"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__bio">{userDescription}</p>       
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
            return <Card card={item} key={item._id} onClick={onCardClick}/>;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;