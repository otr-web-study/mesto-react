import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      <PopupWithForm name="profile" title="Редактировать профиль" buttonTitle="Сохранить">
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
      <PopupWithForm name="place" title="Новое место" buttonTitle="Создать">
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
      <PopupWithForm name="avatar" title="Обновить аватар" buttonTitle="Сохранить">
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
      <ImagePopup/>
      
      <template id="card-template">
        <li className="card">
          <img src="#" className="card__image" alt="#"/>
          <button className="card__delete-button button" type="button" aria-label="Удалить"></button>
          <div className="card__content">
            <h2 className="card__title">#</h2>
            <div className="card__like-container">
              <button className="card__like-button" type="button" aria-label="Лайк"></button>
              <span className="card__like-count">0</span>
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
