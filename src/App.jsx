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
        let pokemon = await Promise.all(getRandomList().map(id => getPokemon(id)));
        setPokemon(pokemon);
        console.log(pokemon.map(p => p.name));
      } catch(e) {
        console.log(e);
      }
      // let json = await getPokemon(5);
      // console.log(json);
      // // pokemon.push({name: json.name, sprite: json.sprites.front_default});
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
      <section id="center"></section>
      <CardsContainer></CardsContainer>
      <section id="spacer"></section>
    </>
  );
}

function CardsContainer() {
  return <section id="cards"></section>;
}

export default App;
