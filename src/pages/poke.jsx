import React, { useState, useEffect } from 'react';

const baseUrl = 'https://tyradex.vercel.app/api/v1/pokemon';

const Poke = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then(setPokemons)
      .catch(console.error);
  }, []);

  const handleClick = (id) => {
    fetch(`${baseUrl}/${id}`)
      .then((response) => response.json())
      .then(setSelectedPokemon)
      .catch(console.error);
  };

  return (
    <>
      {pokemons.length > 0 &&
        pokemons.slice(1, 11).map((pokemon) => (
          <div
            key={pokemon.pokedex_id}
            style={{ margin: '10px' }}>
            <button onClick={() => handleClick(pokemon.pokedex_id)}>
              {pokemon.name.fr}
            </button>
            {pokemon?.evolution?.next?.length > 0 &&
              pokemon.evolution.next.map((evolution) => (
                <div key={evolution.pokedex_id}>
                  <button
                    onClick={() => handleClick(evolution.pokedex_id)}
                    style={{ marginTop: '10px', marginLeft: '50px' }}>
                    {evolution.name}
                  </button>
                </div>
              ))}
          </div>
        ))}
      {selectedPokemon && (
        <img
          alt="Failed"
          src={selectedPokemon.sprites.regular}
        />
      )}
    </>
  );
};

export default Poke;
