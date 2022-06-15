function ImagePopup() {
  return (
    <div className="popup popup-preview">
      <div className="popup-preview__container">
        <img className="popup-preview__image" src="#" alt="#"/>
        <button className="popup__close-button button" type="button" aria-label="Закрыть"></button>
        <p className="popup-preview__caption">caption</p>
      </div>
    </div>
  );
}

export default ImagePopup;