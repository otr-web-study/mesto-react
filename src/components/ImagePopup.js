function ImagePopup(props) {
  return (
    <div className={`popup popup-preview ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-preview__container">
        <img className="popup-preview__image" src={props.card.link} alt={props.card.name}/>
        <button className="popup__close-button button" type="button" aria-label="Закрыть"></button>
        <p className="popup-preview__caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;