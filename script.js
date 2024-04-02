//OPPGAVE 1.1 - VISE ALLE POKEMON (50 STK)

const pokemonContainer = document.getElementById("pokemon-container");

let pokemonData = [];

async function fetchPokemons() {
    const pokemonRequest = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    let pokemonResult = await pokemonRequest.json();
    const pokemon = pokemonResult.results;

    return Promise.all(pokemon.map(async (pokemon) => {
        const pokemonDataRequest = await fetch(pokemon.url);
        let pokemonDataResult = await pokemonDataRequest.json();

        const pokemonData = {
            name: pokemonDataResult.name,
            image: pokemonDataResult.sprites.other.dream_world.front_default,
            type: pokemonDataResult.types[0].type.name
        };
        return pokemonData;
    }));
   
}


//console.log(fetchPokemons()); - virker

async function initilalizePokemons() {
    try {
        pokemonData = await fetchPokemons();
        //console.log("inne i initializePokemons", pokemonData); - virker
        showAllPokemons(pokemonData);

    } catch (error) {
        console.error("Feil med å laste inn pokemons", error);
    }
}

initilalizePokemons();


function showAllPokemons() {
    pokemonContainer.innerHTML = "";

    pokemonContainer.style.display = "grid"
    pokemonContainer.style.grid = "auto/auto auto auto auto auto"
    pokemonContainer.style.gap = "10px";


    pokemonData.forEach((pokemon, index) => {
        //console.log(pokemon.name); - virker

        document.body.style.padding = "50px 150px"

        const pokemonCard = document.createElement("div");
        pokemonCard.style.border = "1px solid grey"
        pokemonCard.style.display = "flex"
        pokemonCard.style.flexDirection = "column"
        pokemonCard.style.alignItems = "center"
        pokemonCard.style.flexBasis = "auto"
        
        //Lagre knapp
        const saveBtn = document.createElement("button");
        saveBtn.innerHTML = "Lagre";
        saveBtn.style.backgroundColor = "pink";

        saveBtn.addEventListener("click", function () {
            savePokemon(index);
        });

        //Slette knapp
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Slett"
        deleteBtn.style.backgroundColor = "lightblue";
    

        deleteBtn.addEventListener("click", function () {
            deletePokemon(index);
        });
        
        //Redigere knapp
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Rediger";
        editBtn.style.backgroundColor = "lightgreen";

        editBtn.addEventListener("click", function () {
            editPokemon(index);
        });

        const btnsDiv = document.createElement("div");
        btnsDiv.style.display = "flex"
        btnsDiv.style.justifyContent = "space-around"
        btnsDiv.style.gap = "10px"

        pokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px" />
        <h3>Navn: ${pokemon.name}</h3>
        <h3>Type: ${pokemon.type}</h4>
        `;

        

        btnsDiv.append(saveBtn, deleteBtn, editBtn);

        pokemonCard.append(btnsDiv);
        pokemonContainer.append(pokemonCard);

    });
}





