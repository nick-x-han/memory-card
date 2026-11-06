import { useEffect, useState } from "react";
import { getPokemon, getRandomList, shuffle } from "./utils";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        let responses = await Promise.all(getRandomList().map(id => getPokemon(id)));
        setPokemon(responses);
        console.log(responses.map(p => p.name));
      } catch(e) {
        console.log(e);
      }
      // let json = await getPokemon(5);
      // console.log(json);
      // pokemon.push({name: json.name, sprite: json.sprites.front_default});
      // pokemon.push(json);
    }

    fetchPokemon();
  }, []);

  return (
    <>
      <h1>Memory Card</h1>
      <section id="game-info">
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </section>
      <section id="center"><CardsContainer pokemon={pokemon}></CardsContainer></section>
      
      <section id="spacer"></section>
    </>
  );
}

function CardsContainer({ pokemon }) {
  return <section className="cards">
      {pokemon.map(p => {
        return <Card key={p.id} name={p.name} sprite={p.sprites.front_default}></Card>
      })}
  </section>;
}

function Card({name, sprite}) {
  return <div className="card">
    <img src={sprite} alt={name} />
    <p>{name[0].toUpperCase() + name.slice(1)}</p>
  </div>
}

export default App;
