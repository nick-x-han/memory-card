import { useEffect, useState } from "react";
import { getPokemon, getRandomList, shuffle } from "./utils";
import "./App.css";
// import { CARDS_PER_GAME } from "./constants";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    let ignore = false;
    async function fetchPokemon() {
      try {
        let responses = await Promise.all(
          getRandomList().map((id) => getPokemon(id)),
        );
        if (!ignore) setPokemon(responses);
      } catch (e) {
        console.log(e);
      }
    }

    fetchPokemon();
    
    return () => {
      ignore = true;
    }
  }, [attempts]);

  function onClick(e) {
    const card = e.target.closest("div.card");
    if (!card) return;
    const id = card.dataset.id;
    const newScore = score + 1;
    if (!selected.find((i) => i === id)) {
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setSelected([...selected, id]);
      // if (score === CARDS_PER_GAME) {

      // }
    } else {
      setScore(0);
      setSelected([]);
      setAttempts(attempts + 1);
    }

    setPokemon(shuffle(pokemon.slice()));
  }

  return (
    <>
      <h1>Memory Card</h1>
      <section id="game-info">
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </section>
      <section id="center">
        <CardsContainer pokemon={pokemon} onClick={onClick}></CardsContainer>
      </section>

      <section id="spacer"></section>
    </>
  );
}

function CardsContainer({ pokemon, onClick }) {
  function getWorkingSprite(p) {
    let sprite = p.sprites.other.showdown.front_default;
    if (!sprite) sprite = p.sprites.front_default;
    return sprite;
  }
  return (
    <section className="cards" onClick={onClick}>
      {pokemon.map((p) => {
        return (
          <Card
            key={p.id}
            id={p.id}
            name={p.species.name}
            sprite={getWorkingSprite(p)}
          ></Card>
        );
      })}
    </section>
  );
}

function Card({ id, name, sprite }) {
  if (name.includes("-")) {
    let index = name.indexOf("-") + 1;
    name =
      name.substring(0, index) +
      name[index].toUpperCase() +
      name.substring(index + 1);
  }
  return (
    <div className="card" data-id={id}>
      <img src={sprite} alt={name} />
      <p>{name[0].toUpperCase() + name.slice(1)}</p>
    </div>
  );
}

export default App;
