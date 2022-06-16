function PopupWithForm(props) {
  return (
    <div className={`popup popup-edit popup-edit_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <section className="popup-edit__container">
        <button className="popup__close-button button" type="button" aria-label="Закрыть"></button>
        <form className="popup-edit__form" name={`${props.name}Form`} id="profileForm" noValidate>
          <h2 className="popup-edit__title">{props.title}</h2>
          {props.children}
          <button className="popup-edit__button-save" type="submit">{props.buttonTitle}</button>
        </form>
      </section>
    </div>
  );
}

export default PopupWithForm;