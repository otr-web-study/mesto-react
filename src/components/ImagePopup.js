function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup-preview ${isOpen && 'popup_opened'}`}>
      <div className="popup-preview__container">
        <img className="popup-preview__image" src={card.link} alt={card.name}/>
        <button 
          className="popup__close-button button" 
          type="button" 
          aria-label="Закрыть"
          onClick={onClose}></button>
        <p className="popup-preview__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;