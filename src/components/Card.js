function Card({card, onClick}) {

  const handleCardClick = () => {
    onClick({name: card.name, link: card.link});
  };

  return (
    <li className="card">
      <img src={card.link} className="card__image" alt={card.name} onClick={handleCardClick}/>
      <button className="card__delete-button button" type="button" aria-label="Удалить"></button>
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" aria-label="Лайк"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;