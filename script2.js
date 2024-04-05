let pokemonArray = [];
//funksjon for å hente linkene
async function getPokemonLinks() {
    try {
        const linkRequest = await fetch("https://pokeapi.co/api/v2/pokemon?limit=648");
        const linkResult = await linkRequest.json();
        let links = linkResult.results.map(link => link.url)
        return links;
    } catch {
        console.log("Feil med å hente inn pokemonlinker")
    }
}

console.log(getPokemonLinks());


//Funksjon for å hente navn, bilde, og type
async function getPokemonData(links) {
    try {
        const dataRequest = await fetch(links)
        const dataResult = await dataRequest.json();
        
        let image = dataResult.sprites.other.dream_world.front_default;
        let name = dataResult.name;
        

        //filtrere ut shadow and unknown
        let eighteenPokemonTypes = dataResult.types.map(type => type.type.name).filter(type => type !== "shadow" && type !== "unknown");

        let firstType = eighteenPokemonTypes[0];
        

        
        return { name, image, type: firstType };
    } catch (error) {
        console.error("Feil med å hente inn pokemondetaljer", error);
    }
}

//Funksjon for å populere globale array
async function initializePokemons() {
    const links = await getPokemonLinks();

    for (const pokemonLinks of links) {
        const pokemonData = await getPokemonData(pokemonLinks);
        
        pokemonArray.push(pokemonData);
    
    }
}
initializePokemons();
console.log("VIRKER", pokemonArray);

