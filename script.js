//---Oppgave 1.1 - Visning av alle pokemons---
document.body.style.padding = "50px 150px";
document.body.style.background =
  "radial-gradient(circle, rgba(255,2,2,1) 24%, rgba(255,237,0,1) 100%)"; //Kilde: https://cssgradient.io/

const pokemonContainer = document.getElementById("pokemon-container");
const newPokemonName = document.getElementById("new-pokemon-name");
const newPokemonType = document.getElementById("new-pokemon-type");
const btnsContainer = document.getElementById("btns-container");
const filterBtn = document.querySelectorAll(".filter-btn");
const showAllPokemonsBtn = document.getElementById("show-all-pokemons-btn");
const newPokemonBtn = document.getElementById("new-pokemon-btn");

const battleLink = document.getElementById("battle-link");
battleLink.style.fontFamily = "helvetica";
battleLink.style.color = "red";
battleLink.style.position = "absolute";
battleLink.style.top = "0.5rem";
battleLink.style.right = "1rem";
battleLink.style.textDecoration = "underline";

const heading = document.getElementById("heading");
heading.style.color = "Red";
heading.style.fontSize = "3rem";
heading.style.display = "flex";
heading.style.justifyContent = "center";

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
  } catch (error) {
    console.error("Feil med å hente inn pokemonlinker", error);
  }
}

//Funksjon for å hente navn, bilde, og type
async function getPokemonData(links) {
  try {
    const dataRequest = await fetch(links);
    const dataResult = await dataRequest.json();

    let image = dataResult.sprites.other.dream_world.front_default;
    let name = dataResult.name;
    let firstType = dataResult.types[0].type.name;
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

//Viser alle pokemons på siden
function showAllPokemon() {
  pokemonContainer.innerHTML = "";
  pokemonContainer.style.display = "grid";
  pokemonContainer.style.grid = "auto/auto auto auto auto auto";
  pokemonContainer.style.gap = "1rem";
  pokemonContainer.style.paddingTop = "1rem";

  pokemonArray.forEach((pokemon, index) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.style.border = "1px solid grey";
    pokemonCard.style.display = "flex";
    pokemonCard.style.flexDirection = "column";
    pokemonCard.style.alignItems = "center";
    pokemonCard.style.flexBasis = "auto";
    pokemonCard.style.borderRadius = "10px";
    pokemonCard.style.padding = "0.5rem";

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Lagre";
    saveBtn.style.backgroundColor = "white";
    saveBtn.style.borderRadius = "10px";
    saveBtn.style.border = "1px solid grey";
    saveBtn.style.padding = "0.4rem";
    saveBtn.id = "save-btn";

    saveBtn.addEventListener("click", () => {
      togglePokemons(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Slett";
    deleteBtn.style.backgroundColor = "white";
    deleteBtn.style.borderRadius = "10px";
    deleteBtn.style.border = "1px solid grey";
    deleteBtn.style.padding = "0.4rem";

    deleteBtn.addEventListener("click", () => {
      deletePokemon(index);
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Rediger";
    editBtn.style.backgroundColor = "white";
    editBtn.style.borderRadius = "10px";
    editBtn.style.border = "1px solid grey";
    editBtn.style.padding = "0.4rem";

    editBtn.addEventListener("click", () => {
      editPokemon(index);
    });

    const btnsDiv = document.createElement("div");
    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-around";
    btnsDiv.style.gap = "1rem";

    pokemonCard.innerHTML = `
       <img src="${pokemon.image}" style="width: 100px; height: 100px" />
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

//---Oppgave 1.2 Filtrering og styling av alle pokemon---
//Style og event lister for filtreringsknapper funksjon
function styleFilterBtns() {
  btnsContainer.style.display = "grid";
  btnsContainer.style.grid = "auto auto auto/repeat(6, auto)";
  btnsContainer.style.gap = "10px";
  btnsContainer.style.padding = "20px 20px";

  filterBtn.forEach((btn) => {
    btn.style.borderRadius = "10px";
    btn.style.border = "1px solid grey";
    btn.addEventListener("click", () => {
      const type = btn.id;
      filterPokemons(type);
    });
  });
  showAllPokemonsBtn.style.borderRadius = "10px";
  showAllPokemonsBtn.style.border = "1px solid grey";
  showAllPokemonsBtn.style.marginLeft = "1.25rem";
  showAllPokemonsBtn.style.padding = "1px 20px";

  showAllPokemonsBtn.addEventListener("click", () => {
    showAllPokemon();
  });
}
styleFilterBtns();

//Funksjon for å filtrere pokemon
function filterPokemons(type) {
  let filter = pokemonArray.filter((pokemon) => pokemon.type === type);
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

      pokemonCardColor(filteredPokemonCard, pokemon.type);

      filteredPokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px; height: 100px" />
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

//Funksjon for å gi farge til pokemon kortene basert på type
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

//---Oppgave 1.4 - Lag din egen pokemon---
//Funksjon for å lage egen pokemon
function makeNewPokemon() {
  let randomPokemonNumber = Math.floor(Math.random() * 400) + 1;
  let randomPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemonNumber}.svg`;
  let newPokemon = {
    name: newPokemonName.value,
    image: randomPokemonImage,
    type: newPokemonType.value,
  };
  pokemonArray.unshift(newPokemon);

  if (localStorage.getItem("savedNewPokemon")) {
    let savedPokemons = JSON.parse(localStorage.getItem("savedNewPokemon"));
    savedPokemons.push(newPokemon);
    localStorage.setItem("savedNewPokemon", JSON.stringify(savedPokemons));
  } else {
    let savedPokemons = [newPokemon];
    localStorage.setItem("savedNewPokemon", JSON.stringify(savedPokemons));
  }

  showAllPokemon();
}

newPokemonBtn.addEventListener("click", () => {
  makeNewPokemon();
});

//---Oppgave 1.4 - lagre favoritt pokemoner---
//Funksjon for å toggle om pokemon er lagret eller ikke
function togglePokemons(index) {
  let countSaved = pokemonArray.filter((pokemon) => pokemon.savedStatus).length;
  if (countSaved < 5) {
    pokemonArray[index].savedStatus = true;
    let savedPokemons = pokemonArray.filter(
      (pokemon) => pokemon.savedStatus === true
    );
    showAllSavedPokemons(savedPokemons);
  } else {
    alert(
      "Du kan bare lagre 5 Pokemon! Slett en eller fler for å lage plass til dine favoritter."
    );
  }
}

//Funksjon for å vise de lagrede favoritt pokemonene
function showAllSavedPokemons(savedPokemons) {
  const savedContainer = document.getElementById("saved-container");
  savedContainer.innerHTML = "";
  savedContainer.style.display = "grid";
  savedContainer.style.grid = "1fr/repeat(5, auto)";
  savedContainer.style.gap = "1rem";

  savedPokemons.forEach((pokemon, index) => {
    if (pokemon.savedStatus) {
      const savePokemonCard = document.createElement("div");
      savePokemonCard.style.border = "1px solid grey";
      savePokemonCard.style.display = "flex";
      savePokemonCard.style.flexDirection = "column";
      savePokemonCard.style.alignItems = "center";
      savePokemonCard.style.flexBasis = "auto";
      savePokemonCard.style.borderRadius = "10px";
      savePokemonCard.style.padding = "0.4rem";
      savePokemonCard.innerHTML = `
            <img src="${pokemon.image}" style="width: 100px; height: 100px" />
            <h3>Navn: ${pokemon.name}</h3>
            <h3>Type: ${pokemon.type}</h3>
            `;

      const pokemonType = pokemon.type;
      pokemonCardColor(savePokemonCard, pokemonType);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Slett";
      deleteBtn.addEventListener("click", () => {
        deleteSavedPokemon(savedPokemons, index);
        showAllSavedPokemons(savedPokemons);
      });

      savePokemonCard.appendChild(deleteBtn);
      savedContainer.appendChild(savePokemonCard);

      localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
    }
  });
}

//Funksjon for å slette lagrede favoritt pokemonene
function deleteSavedPokemon(savedPokemons, index) {
  let deletePoke = savedPokemons[index];

  //Kilde: https://www.w3schools.com/jsref/jsref_findindex.asp / https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  let deleteIndex = pokemonArray.findIndex(
    (pokemon) => pokemon.name === deletePoke.name
  );
  if (deleteIndex !== -1) {
    pokemonArray[deleteIndex].savedStatus = false;
  }
  savedPokemons.splice(index, 1);
  localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
}

//---Oppgave 1.5 - Slette pokemon--
//Funksjon for å slette pokemon fra hovedutstillingen
function deletePokemon(index) {
  const deletedPokemon = pokemonArray[index];

  pokemonArray.splice(index, 1);

  let storedNewPokemons = JSON.parse(localStorage.getItem("savedNewPokemon"));

  if (storedNewPokemons) {
    const deleteIndex = storedNewPokemons.findIndex(
      (pokemon) => pokemon.name === deletedPokemon.name
    );

    if (deleteIndex !== -1) {
      storedNewPokemons.splice(deleteIndex, 1);
      localStorage.setItem(
        "savedNewPokemon",
        JSON.stringify(storedNewPokemons)
      );
    } else {
      console.log("Finner ikke Pokemon");
    }
  }
  showAllPokemon();
}

//---Oppgave 1.6 - redigere pokemon---
//Funksjon for å redigere pokemon
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

  let savedNewPokemon =
    JSON.parse(localStorage.getItem("savedNewPokemon")) || [];
  savedNewPokemon.forEach((pokemon) => {
    pokemon.name = pokemon.name.toLowerCase();
  });
  let newPokemonIndex = savedNewPokemon.findIndex(
    (pokemon) => pokemon.name === editedPokemon.name.toLowerCase()
  );

  let savedPokemons = JSON.parse(localStorage.getItem("savedPokemons")) || [];
  savedPokemons.forEach((pokemon) => {
    pokemon.name = pokemon.name.toLowerCase();
  });
  let savedPokemonIndex = savedPokemons.findIndex(
    (pokemon) => pokemon.name === editedPokemon.name.toLowerCase()
  );

  if (existingPokemonTypes.includes(userInputPokemonTypeLowerCase)) {
    editedPokemon.type = userInputPokemonTypeLowerCase;
    editedPokemon.name = userInputPokemonName;

    if (newPokemonIndex !== -1) {
      savedNewPokemon[newPokemonIndex].type = userInputPokemonType;
      savedNewPokemon[newPokemonIndex].name = userInputPokemonName;
      localStorage.setItem("savedNewPokemon", JSON.stringify(savedNewPokemon));
    }

    if (savedPokemonIndex !== -1) {
      savedPokemons[savedPokemonIndex].type = userInputPokemonType;
      savedPokemons[savedPokemonIndex].name = userInputPokemonName;
      localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
    }
  } else {
    alert("du må skrive inn en kjent type Pokemon!");
  }

  showAllPokemon();
}
