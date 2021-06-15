import styles from "./Card.css";
import "./Card.css";
const Card = (props) => {
  const beerList = props.beerCard;
  return (
    <div className="Card">
      {beerList.map((beer) => {
        return (
          <ul className="card-elements">
            <h1>{beer.name}</h1>
            <li>{beer.tagline}</li>
            <img src={beer.image_url} width="100px" height="200px" />
          </ul>
        );
      })}
    </div>
  );
};
export default Card;
