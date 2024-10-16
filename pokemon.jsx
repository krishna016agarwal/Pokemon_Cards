import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";
export const Pokemon = () => {
  const [pokemon, setpokemon] = useState([]);
  const[loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      

      setpokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);


  //search functionality

const serachData=pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()));

  if(loading){
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  if(error){
    return(
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input type="text "placeholder="search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        </div>
        <div>
          <ul className="cards">
            {serachData.map((curPokemon) => {
              return <PokemonCards key={curPokemon.id} pokemonData={curPokemon}></PokemonCards>
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
