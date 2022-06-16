import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    document.querySelector('.profile__avatar-edit-button').addEventListener('click', props.onEditAvatar);
    document.querySelector('.profile__edit-button').addEventListener('click', props.onEditProfile);
    document.querySelector('.profile__add-button').addEventListener('click', props.onAddPlace);
    document.querySelectorAll('.popup__close-button').forEach((item) => {
      item.addEventListener('click', props.onClose);
    });

    api.batchFetch([api.getInitialCards(), api.getUserData()])
      .then(([initialCards, { name, about, avatar }]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);

        setCards(initialCards);
      })
      .catch(err => {console.log(err)});
      }, [
        props.onEditAvatar,
        props.onEditProfile,
        props.onAddPlace,
        props.onClose
      ]);

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Фото профиля пользователя."/>
          <button className="profile__avatar-edit-button" type="button" aria-label="Редактировать"></button>
        </div>
        <div className="profile__info">
          <div className="profile__author-container">
            <h1 className="profile__author">{userName}</h1>
            <button className="profile__edit-button button" type="button" aria-label="Редактировать"></button>
          </div>
          <p className="profile__bio">{userDescription}</p>       
        </div>
        <button className="profile__add-button button" type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements page__elements">
        <ul className="elements__list">
          {cards.map(item => {
            return <Card card={item} key={item._id} onClick={props.onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;