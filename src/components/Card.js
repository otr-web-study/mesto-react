function Card(props) {
  return (
    <li className="card">
      <img src={props.card.link} className="card__image" alt={props.card.name} onClick={props.onClick}/>
      <button className="card__delete-button button" type="button" aria-label="Удалить"></button>
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" aria-label="Лайк"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;