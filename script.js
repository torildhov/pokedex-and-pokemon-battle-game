//OPPGAVE 1.1 - VISE ALLE POKEMON (50 STK)

//STYLING
document.body.style.padding = "50px 150px";
let pokemonContainer = document.getElementById("pokemon-container");
let newPokemonName = document.getElementById("new-pokemon-name");
let newPokemonType = document.getElementById("new-pokemon-type");

//knapper for typer container
const btnsContainer = document.getElementById("btns-container");
btnsContainer.style.display = "grid";
btnsContainer.style.grid = "auto auto auto/repeat(6, auto)";
btnsContainer.style.gap = "10px";
btnsContainer.style.padding = "20px 20px";

//knapper for typer
let filterBtn = document.querySelectorAll(".filter-btn");
filterBtn.forEach((btn) => {
  btn.style.borderRadius = "10px";
  btn.style.border = "1px solid grey";
  btn.addEventListener("click", () => {
    const type = btn.id;
    getFilterType(type);
  });
});

//vis alle pokemons knapp

let pokemonArray = [];

//funksjon for å hente linkene
async function getPokemonLinks() {
  try {
    const linkRequest = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );
    const linkResult = await linkRequest.json();
    let links = linkResult.results.map((link) => link.url);
    return links;
  } catch {
    console.log("Feil med å hente inn pokemonlinker");
  }
}

console.log(getPokemonLinks());

//Funksjon for å hente navn, bilde, og type
async function getPokemonData(links) {
  try {
    const dataRequest = await fetch(links);
    const dataResult = await dataRequest.json();

    let image = dataResult.sprites.other.dream_world.front_default;
    let name = dataResult.name;

    //filtrere ut shadow and unknown
    let eighteenPokemonTypes = dataResult.types
      .map((type) => type.type.name)
      .filter((type) => type !== "shadow" && type !== "unknown");

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

//Viser alle pokemons på siden
function showAllPokemon() {
  //pokemon container

  pokemonContainer.innerHTML = "";
  pokemonContainer.style.display = "grid";
  pokemonContainer.style.grid = "auto/auto auto auto auto auto";
  pokemonContainer.style.gap = "10px";
  pokemonContainer.style.paddingTop = "20px";

  pokemonArray.forEach((pokemon, index) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.style.border = "1px solid grey";
    pokemonCard.style.display = "flex";
    pokemonCard.style.flexDirection = "column";
    pokemonCard.style.alignItems = "center";
    pokemonCard.style.flexBasis = "auto";
    pokemonCard.style.borderRadius = "10px";

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

    //knapper container
    const btnsDiv = document.createElement("div");
    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-around";
    btnsDiv.style.gap = "10px";

    pokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px" />
        <h4>Navn: ${pokemon.name}</h4>
        <h4>Type: ${pokemon.type}</h4>
        `;

    const pokemonType = pokemon.type;
    pokemonCardColor(pokemonCard, pokemonType);

    btnsDiv.append(saveBtn, deleteBtn, editBtn);

    pokemonCard.append(btnsDiv);
    pokemonContainer.append(pokemonCard);
  });
}

showAllPokemon();

//OPPGAVE 1.2 - FILTRERING OG STYLING AV ALLE POKEMON

function getFilterType(type) {
  let filter = pokemonArray.filter((pokemon) => pokemon.type === type);
  filterPokemons(filter);
}

function filterPokemons(filter) {
  //Vis alle pokemons knapp
  const showAllPokemonsBtn = document.getElementById("show-all-pokemons-btn");
  showAllPokemonsBtn.style.borderRadius = "10px";
  showAllPokemonsBtn.style.border = "1px solid grey";
  showAllPokemonsBtn.style.marginLeft = "20px";
  showAllPokemonsBtn.style.padding = "1px 20px";

  showAllPokemonsBtn.addEventListener("click", () => {
    showAllPokemon();
  });

  //Filtrer pokemons
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
                <h4>Navn: ${pokemon.name}</h4>
            <h4>Type: ${pokemon.type}</h4>
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
  let randomPokemonNumber = Math.floor(Math.random() * 400) + 1;
  let randomPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemonNumber}.svg`;
  let newPokemon = {
    name: newPokemonName.value,
    image: randomPokemonImage,
    type: newPokemonType.value,
  };
  pokemonArray.unshift(newPokemon);

  let localPokemon = [];

  if (localStorage.getItem("savedPokemon")) {
    let savedPokemons = JSON.parse(localStorage.getItem("savedPokemon"));

    savedPokemons.push(newPokemon);

    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemons));
  } else {
    let savedPokemons = [newPokemon];

    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemons));
  }

  showAllPokemon();
}

const newPokemonBtn = document.getElementById("new-pokemon-btn");
newPokemonBtn.addEventListener("click", () => {
  makeNewPokemon();
});

//OPPGAVE 1.5 - lagre favoritt pokemon
function togglePokemons(index) {
  let countSaved = pokemonArray.filter((pokemon) => pokemon.savedStatus).length;
  if (countSaved < 5) {
    pokemonArray[index].savedStatus = true;
    let savedPokemons = pokemonArray.filter(
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

      localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
    }
  });
}

//VIRKER
function deleteSavedPokemon(savedPokemons, index) {
  let deletePoke = savedPokemons[index];

  let deleteIndex = pokemonArray.findIndex(
    (pokemon) => pokemon.name === deletePoke.name
  );
  if (deleteIndex !== -1) {
    pokemonArray[deleteIndex].savedStatus = false;
  }
  savedPokemons.splice(index, 1);
  localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
}

//OPPGAVE 1.5 - slette pokemons fra hovedutstillingen
//Får nå slettet pokemons som er nye fra localStorage

function deletePokemon(index) {
  const deletedPokemon = pokemonArray[index];

  pokemonArray.splice(index, 1);

  let storedNewPokemons = JSON.parse(localStorage.getItem("savedPokemon"));

  if (Array.isArray(storedNewPokemons)) {
    const deleteIndex = storedNewPokemons.findIndex(
      (pokemon) => pokemon.name === deletedPokemon.name
    );

    if (deleteIndex !== -1) {
      storedNewPokemons.splice(deleteIndex, 1);
      localStorage.setItem("savedPokemon", JSON.stringify(storedNewPokemons));
    } else {
      console.log("Finner ikke Pokemon");
    }
  }
  showAllPokemon();
}

//OPPGAVE 1.6 - redigere pokemon
//DENNE FUNKSONEN VIRKER
function editPokemon(index) {
  const editedPokemon = pokemonArray[index];

  let userInputPokemonName = prompt("Skriv inn et nytt navn til Pokemonen!");
  let userInputPokemonType = prompt("Skriv inn en ny type til Pokemonen!");

  let userInputPokemonTypeLowerCase = userInputPokemonType.toLowerCase();

  const pokemonTypesValues = newPokemonType.options;
  let existingPokemonTypes = [];

  for (let i = 0; i < pokemonTypesValues.length; i++) {
    existingPokemonTypes.push(pokemonTypesValues[i].value);
  }

  let savedNewPokemon = JSON.parse(localStorage.getItem("savedPokemon"));

  savedNewPokemon.forEach((pokemon) => {
    pokemon.name = pokemon.name.toLowerCase();
  });

  let pokemonIndex = savedNewPokemon.findIndex(
    (pokemon) => pokemon.name === editedPokemon.name.toLowerCase()
  );

  if (existingPokemonTypes.includes(userInputPokemonTypeLowerCase)) {
    editedPokemon.type = userInputPokemonTypeLowerCase;
    editedPokemon.name = userInputPokemonName;

    if (pokemonIndex !== -1) {
      savedNewPokemon[pokemonIndex].type = userInputPokemonType;
      savedNewPokemon[pokemonIndex].name = userInputPokemonName;

      localStorage.setItem("savedPokemon", JSON.stringify(savedNewPokemon));
    }
  } else {
    alert("du må skrive inn en kjent type Pokemon!");
  }
  showAllPokemon();
}
