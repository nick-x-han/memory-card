import { useEffect, useState } from "react";
import { TOTAL_POKEMON, CARDS_PER_GAME } from "./constants";

function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
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

export { useData, getRandomList, shuffle };
