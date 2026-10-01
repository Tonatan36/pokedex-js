const PokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = {
        number: pokeDetail.id,
        name: pokeDetail.name,
        types: pokeDetail.types.map((typeSlot) => typeSlot.type.name),
        type: pokeDetail.types[0].type.name,
        photo: pokeDetail.sprites.other['official-artwork'].front_default || pokeDetail.sprites.front_default
    };
    return pokemon;
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

PokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};