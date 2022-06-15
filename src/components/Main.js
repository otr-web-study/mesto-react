import React from "react";

function Main() {
  React.useEffect(() => {
    function handleEditAvatarClick() {
      document.querySelector('.popup-edit_type_avatar').classList.add('popup_opened');

      return () => {
        document.querySelector('.popup-edit_type_avatar').classList.remove('popup_opened');
      }
    }

    function handleEditProfileClick() {
      document.querySelector('.popup-edit_type_profile').classList.add('popup_opened');

      return () => {
        document.querySelector('.popup-edit_type_profile').classList.remove('popup_opened');
      }
    }

    function handleAddPlaceClick() {
      document.querySelector('.popup-edit_type_place').classList.add('popup_opened');

      return () => {
        document.querySelector('.popup-edit_type_place').classList.remove('popup_opened');
      }
    }

    document.querySelector('.profile__avatar-edit-button').addEventListener('click', handleEditAvatarClick);
    document.querySelector('.profile__edit-button').addEventListener('click', handleEditProfileClick);
    document.querySelector('.profile__add-button').addEventListener('click', handleAddPlaceClick);
  });

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="#" alt="Фото профиля пользователя."/>
          <button className="profile__avatar-edit-button" type="button" aria-label="Редактировать"></button>
        </div>
        <div className="profile__info">
          <div className="profile__author-container">
            <h1 className="profile__author">Жак-Ив Кусто</h1>
            <button className="profile__edit-button button" type="button" aria-label="Редактировать"></button>
          </div>
          <p className="profile__bio">Исследователь океана</p>       
        </div>
        <button className="profile__add-button button" type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements page__elements">
        <ul className="elements__list">
        </ul>
      </section>
    </main>
  );
}

export default Main;