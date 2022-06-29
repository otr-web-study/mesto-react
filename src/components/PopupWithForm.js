function PopupWithForm({name, title, isOpen, children, onMouseDown}) {
  return (
    <div 
      className={`popup popup-edit popup-edit_type_${name} ${isOpen && 'popup_opened'}`}
      onMouseDown={onMouseDown}>
      <section className="popup-edit__container">
        <button 
          className="popup__close-button button" 
          type="button" 
          aria-label="Закрыть"/>
        <form className="popup-edit__form" name={`${name}Form`} id="profileForm" noValidate>
          <h2 className="popup-edit__title">{title}</h2>
          {children}
        </form>
      </section>
    </div>
  );
}

export default PopupWithForm;