import { TOTAL_POKEMON, CARDS_PER_GAME } from "./constants";

async function getPokemon(id) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  if (!response.ok) {
    console.log("DSDDSDS")
    throw new Error(`HTTP error: ${response.status}`);
  }

  let json = await response.json();
  return json;
}

function getRandomList() {
  const randomSet = new Set();
  while (randomSet.size < CARDS_PER_GAME) {
    randomSet.add(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
  }
  return Array.from(randomSet);
}

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { getPokemon, getRandomList, shuffle };
