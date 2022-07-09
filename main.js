const getPokemonUrl = (id)=>`https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = ()=>{
  const pokemonPromises = [];
  for(let i=1; i<=151; i++){
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((res)=>res.json())
    );
  }
  Promise.all(pokemonPromises).then((pokemons)=>getPokemon(pokemons))
}

const getPokemon = (pokemons)=>{
  const listPokemons = pokemons.reduce((accumulator, pokemon)=>{
    const types = pokemon.types.map(typeInfo=>typeInfo.type.name);
    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    const id = pokemon.id;

    accumulator += Html({types, name, weight, height, id});

    return accumulator;
  }, "")
  const ul = document.querySelector('[data="pokedex"]');
  ul.innerHTML = listPokemons;
}

const Html = (data)=>{
  return  `
          <li class="card ${data.types[0]}">
          <img class="card-image" alt="${data.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png">
          <h2 class="card-title">${data.id}. ${data.name}</h2>
          <p class="card-subtitle">${data.types.join(" | ")}<br> weight: ${data.weight}. height: ${data.height}</p>
          </li>`;
}

fetchPokemon();