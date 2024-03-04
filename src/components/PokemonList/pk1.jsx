import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

 const [pokemonList, setPokemonList] = useState([]);
 const [isLoading, setIsLoading] = useState(true); 
 const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon'); 
 const [nextUrl, setNextUrl] = useState('');
 const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
     setIsLoading(true);
     const response = await fetch(pokedexUrl);
     const data = await response.json(); 
     const pokemonResults = data.results; 
     setNextUrl(data.next);
     setPrevUrl(data.previous);

     const pokemonResultPromise = pokemonResults.map((pokemon)=> fetch(pokemon.url).then(response => response.json()));

     const pokemonData = await Promise.all(pokemonResultPromise);

     const pokeListResult = pokemonData.map((pokeData) => ({
         id: pokeData.id,
         name: pokeData.name, 
         image: (pokeData.sprites.other) ? pokeData.sprites.other.dream_world.front_default : pokeData.sprites.front_shiny, 
         types: pokeData.types
      }));

        setPokemonList(pokeListResult);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading....' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;
