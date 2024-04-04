//OPPGAVE 1.1 - VISE ALLE POKEMON (50 STK)

const pokemonContainer = document.getElementById("pokemon-container");
pokemonContainer.style.paddingTop = "20px";
let filterBtn = document.querySelectorAll(".filter-btn");
filterBtn.forEach((btn) => {
  btn.style.borderRadius = "10px";
  btn.style.border = "1px solid grey";
  btn.addEventListener("click", () => {
    const type = btn.id;
    getFilterType(type);
  });
});

const showAllPokemonsBtn = document.getElementById("show-all-pokemons-btn");
showAllPokemonsBtn.style.borderRadius = "10px";
showAllPokemonsBtn.style.border = "1px solid grey";
showAllPokemonsBtn.style.marginLeft = "20px";
showAllPokemonsBtn.style.padding = "1px 20px";

showAllPokemonsBtn.addEventListener("click", () => {
  showAllPokemons();
});

let pokemonData = [];

async function fetchPokemons() {
  const pokemonRequest = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );
  let pokemonResult = await pokemonRequest.json();
  const pokemon = pokemonResult.results;

  return Promise.all(
    pokemon.map(async (pokemon) => {
      const pokemonDataRequest = await fetch(pokemon.url);
      let pokemonDataResult = await pokemonDataRequest.json();

      const pokemonDataArray = {
        name: pokemonDataResult.name,
        image: pokemonDataResult.sprites.other.dream_world.front_default,
        type: pokemonDataResult.types[0].type.name,
      };
      pokemonData.push(pokemonDataArray);
    })
  );
}

async function initilalizePokemons() {
  try {
    await fetchPokemons();
    //console.log("inne i initializePokemons", pokemonData); - virker
    showAllPokemons();
  } catch (error) {
    console.error("Feil med å laste inn pokemons", error);
  }
}

initilalizePokemons();
console.log("VIRKER", pokemonData);

//Viser alle pokemons på siden
function showAllPokemons() {
  pokemonContainer.innerHTML = "";

  const btnsContainer = document.getElementById("btns-container");
  btnsContainer.style.display = "grid";
  btnsContainer.style.grid = "auto auto auto/repeat(6, auto)";
  btnsContainer.style.gap = "10px";
  btnsContainer.style.padding = "20px 20px";

  pokemonContainer.style.display = "grid";
  pokemonContainer.style.grid = "auto/auto auto auto auto auto";
  pokemonContainer.style.gap = "10px";

  pokemonData.forEach((pokemon, index) => {
    //console.log(pokemon.name); - virker

    document.body.style.padding = "50px 150px";

    const pokemonCard = document.createElement("div");
    pokemonCard.style.border = "1px solid grey";
    pokemonCard.style.display = "flex";
    pokemonCard.style.flexDirection = "column";
    pokemonCard.style.alignItems = "center";
    pokemonCard.style.flexBasis = "auto";
    pokemonCard.style.borderRadius = "10px";

    const pokemonType = pokemon.type;
    pokemonCardColor(pokemonCard, pokemonType);

    //Lagre knapp
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Lagre";
    saveBtn.style.backgroundColor = "white";
    saveBtn.style.borderRadius = "10px";
    saveBtn.style.border = "1px solid grey";
    saveBtn.style.padding = "5px";
    saveBtn.id = "save-btn";

    saveBtn.addEventListener("click", () => {
      togglePokemons(index);
    });

    //Slette knapp
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Slett";
    deleteBtn.style.backgroundColor = "white";
    deleteBtn.style.borderRadius = "10px";
    deleteBtn.style.border = "1px solid grey";
    deleteBtn.style.padding = "5px";

    deleteBtn.addEventListener("click", () => {
      deletePokemon(index);
    });

    //Redigere knapp
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Rediger";
    editBtn.style.backgroundColor = "white";
    editBtn.style.borderRadius = "10px";
    editBtn.style.border = "1px solid grey";
    editBtn.style.padding = "5px";

    editBtn.addEventListener("click", function () {
      editPokemon(index);
    });

    const btnsDiv = document.createElement("div");
    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-around";
    btnsDiv.style.gap = "10px";

    pokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px" />
        <h3>Navn: ${pokemon.name}</h3>
        <h3>Type: ${pokemon.type}</h4>
        `;

    pokemon.savedStatus = false;

    btnsDiv.append(saveBtn, deleteBtn, editBtn);

    pokemonCard.append(btnsDiv);
    pokemonContainer.append(pokemonCard);
  });
}

showAllPokemons();

//OPPGAVE 1.2 - FILTRERING OG STYLING AV ALLE POKEMON

function getFilterType(type) {
  let filter = pokemonData.filter((pokemon) => pokemon.type === type);
  filterPokemons(filter, type);
}

function filterPokemons(filter, type) {
  if (filter.length > 0) {
    pokemonContainer.innerHTML = "";
    filter.forEach((pokemon) => {
      const filteredPokemonCard = document.createElement("div");
      filteredPokemonCard.style.border = "1px solid grey";
      filteredPokemonCard.style.display = "flex";
      filteredPokemonCard.style.flexDirection = "column";
      filteredPokemonCard.style.alignItems = "center";
      filteredPokemonCard.style.flexBasis = "auto";
      filteredPokemonCard.style.borderRadius = "10px";

      const filteredPokemonType = pokemon.type;
      pokemonCardColor(filteredPokemonCard, pokemon.type);

      filteredPokemonCard.innerHTML = `
                <img src="${pokemon.image}" style="width: 100px" />
                <h3>Navn: ${pokemon.name}</h3>
            <h3>Type: ${pokemon.type}</h4>
        `;

      pokemon.savedStatus = false;

      pokemonContainer.append(filteredPokemonCard);
    });
  } else {
    alert(
      "Det finnes ingen pokemons i denne kategorien! Prøv en av de andre knappene."
    );
  }
}

function pokemonCardColor(card, type) {
  const pokemonCardColors = {
    bug: "#A1C83E",
    dark: "#6E7C93",
    dragon: "#5F90B9",
    electric: "#EAC937",
    fairy: "#F889DB",
    fighting: "#E9708C",
    fire: "#F89945",
    flying: "#5E82CC",
    ghost: "#4856BA",
    grass: "#4CC571",
    ground: "#D5864A",
    ice: "#68C4C9",
    normal: "#798B9B",
    poison: "#B45EDA",
    psychic: "#F76E74",
    rock: "#AF9B64",
    steel: "#568A9E",
    water: "#349FD7",
  };

  const typeColor = pokemonCardColors[type] || "white";
  card.style.backgroundColor = typeColor;
}

//OPPGAVE 1.4 - Lag din egen pokemon

function makeNewPokemon() {
  let newPokemonName = document.getElementById("new-pokemon-name");
  let newPokemonType = document.getElementById("new-pokemon-type");
  let randomPokemonNumber = Math.floor(Math.random() * 500) + 1;
  let randomPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemonNumber}.svg`;
  let newPokemon = {
    name: newPokemonName.value,
    image: randomPokemonImage,
    type: newPokemonType.value,
  };
    pokemonData.unshift(newPokemon);
    
  let savedPokemon = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    savedPokemon.unshift(newPokemon);
    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon));

    showAllPokemons();
}

const newPokemonBtn = document.getElementById("new-pokemon-btn");
newPokemonBtn.addEventListener("click", () => {
  makeNewPokemon();
});

//OPPGAVE 1.5 - lagre favoritt pokemon
//TRENGER Å FIKSE: lagrefunksjonen når ny pokemon lagres. De andre allerede lagrede pokemonene
//forsvinner når jeg først lager en ny pokemon og deretter lagrer den.

function togglePokemons(index) {
  let countSaved = pokemonData.filter((pokemon) => pokemon.savedStatus).length;
  if (countSaved < 5) {
    pokemonData[index].savedStatus = true;
    let savedPokemons = pokemonData.filter(
      (pokemon) => pokemon.savedStatus === true
    );
    showAllSavedPokemons(savedPokemons);
    console.log(savedPokemons);
  } else {
    alert(
      "Du kan bare lagre 5 Pokemon! Slett en eller fler for å lage plass til dine favoritter."
    );
  }
}

function showAllSavedPokemons(savedPokemons) {
  const savedContainer = document.getElementById("saved-container");
  savedContainer.innerHTML = "";
  savedContainer.style.display = "grid";
  savedContainer.style.grid = "1fr/repeat(5, 1fr)";
  savedContainer.style.gap = "10px";

  savedPokemons.forEach((pokemon, index) => {
    if (pokemon.savedStatus) {
      const savePokemonCard = document.createElement("div");
      savePokemonCard.style.border = "1px solid grey";
      savePokemonCard.style.display = "flex";
      savePokemonCard.style.flexDirection = "column";
      savePokemonCard.style.alignItems = "center";
      savePokemonCard.style.flexBasis = "auto";
      savePokemonCard.style.borderRadius = "10px";
      savePokemonCard.innerHTML = `
            <img src="${pokemon.image}" style="width: 100px" />
            <h3>Navn: ${pokemon.name}</h3>
            <h3>Type: ${pokemon.type}</h3>
            `;

      const pokemonType = pokemon.type;
      pokemonCardColor(savePokemonCard, pokemonType);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Slett";
      deleteBtn.addEventListener("click", () => {
        deleteSavedPokemon(savedPokemons, index, pokemon);
        showAllSavedPokemons(savedPokemons);
      });

      savePokemonCard.appendChild(deleteBtn);
      savedContainer.appendChild(savePokemonCard);

      
      localStorage.setItem("savedPokemon", JSON.stringify(savedPokemons));
    }
  });
}

function deleteSavedPokemon(savedPokemons, index) {
  let deletePoke = savedPokemons[index];
  let deleteIndex = pokemonData.findIndex(
    (pokemon) => pokemon.name === deletePoke.name
  );
  if (deleteIndex !== -1) {
    pokemonData[deleteIndex].savedStatus = false;
  }
  savedPokemons.splice(index, 1);
}

//OPPGAVE 1.5 - slette pokemons fra hovedutstillingen

function deletePokemon(index) {
  pokemonData.splice(index, 1);
  if (localStorage.getItem("savedPokemon") !== null) {
    localStorage.removeItem("savedPokemon");
  }
  if (localStorage.getItem("savedPokemons") !== null) {
    localStorage.removeItem("savedPokemons");
  }
  showAllPokemons();
}

//OPPGAVE 1.6 - redigere pokemon

function editPokemon(index){
    const editedPokemon = pokemonData[index];
    
    let userInputPokemonName = prompt("Skriv inn et nytt navn til Pokemonen!");
     
   
    let userInputPokemonType = prompt("Skriv inn en ny type til Pokemonen!");

    let typeMatches = pokemonData.some(pokemon => pokemon.type.toLowerCase() === userInputPokemonType.toLowerCase());
    //console.log(typeMatches);

    if (typeMatches) {
        editedPokemon.type = userInputPokemonType;
        editedPokemon.name = userInputPokemonName;
    } else {
        alert("du må skrive inn en kjent type Pokemon!");
    }
   
    
    showAllPokemons();
}
