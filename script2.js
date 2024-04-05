

let pokemonArray = [];
//funksjon for å hente linkene
async function getPokemonLinks() {
    try {
        const linkRequest = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
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
        
        let saved = false;
        
        return { name, image, type: firstType, saved };
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
    showAllPokemon();
}
initializePokemons();
console.log("VIRKER", pokemonArray);


function showAllPokemon() {
    let pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = "";
    pokemonContainer.style.display = "grid";
    pokemonContainer.style.grid = "auto/auto auto auto auto auto";
    pokemonContainer.style.gap = "10px";
    
    
    pokemonArray.forEach((pokemon, index) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px" />
        <p>Navn: ${pokemon.name}</p>
        <p>Type: ${pokemon.type}</p>
        `;
        
        const btnsDiv = document.createElement("div");

        //Lagre knapp
        const saveBtn = document.createElement("button")
        saveBtn.innerHTML = "Lagre";
        /*saveBtn.addEventlistener("click", () => {
            savePokemon(index);
        });*/

        //Redigere knapp
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Rediger";
        /*editBtn.addEventListener("click", () => {
            editPokemon(index);
        });*/

        //Slette knapp
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Slett";
        /*deleteBtnBtn.addEventListener("click", () => {
          editPokemon(index);
        });*/

        btnsDiv.append(saveBtn, editBtn, deleteBtn);
        pokemonCard.append(btnsDiv);
        pokemonContainer.append(pokemonCard);
    });
}

showAllPokemon();

