function PopupWithForm({name, title, buttonTitle, isOpen, children, onClose, onSubmit}) {
  return (
    <div className={`popup popup-edit popup-edit_type_${name} ${isOpen && 'popup_opened'}`}>
      <section className="popup-edit__container">
        <button 
          className="popup__close-button button" 
          type="button" 
          aria-label="Закрыть"
          onClick={onClose}></button>
        <form className="popup-edit__form" name={`${name}Form`} id="profileForm" noValidate>
          <h2 className="popup-edit__title">{title}</h2>
          {children}
          <button className="popup-edit__button-save" type="submit" onClick={onSubmit}>
            {buttonTitle}
          </button>
        </form>
      </section>
    </div>
  );
}

export default PopupWithForm;