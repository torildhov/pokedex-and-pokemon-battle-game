//OPPGAVE 1.1 - VISE ALLE POKEMON (50 STK)

const pokemonContainer = document.getElementById("pokemon-container");
let filterBtn = document.querySelectorAll(".filter-btn");
filterBtn.forEach((btn) => {
    btn.style.borderRadius = "10px";
    btn.style.border = "1px solid grey"
    btn.addEventListener("click", () => {
    const type = btn.id;
      getFilterType(type);
  });
});

const showAllPokemonsBtn = document.getElementById("show-all-pokemons-btn");
showAllPokemonsBtn.style.borderRadius = "10px";
showAllPokemonsBtn.style.border = "1px solid grey";
showAllPokemonsBtn.style.marginLeft ="20px"

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
    btnsContainer.style.gap = "10px"
    btnsContainer.style.padding = "20px 20px"
    

  pokemonContainer.style.display = "grid";
  pokemonContainer.style.grid = "auto/auto auto auto auto auto";
  pokemonContainer.style.gap = "10px";

  pokemonData.forEach((pokemon, index) => {
    //console.log(pokemon.name); - virker

    document.body.style.padding = "50px 150px";

    const filteredPokemonCard = document.createElement("div");
    filteredPokemonCard.style.border = "1px solid grey";
    filteredPokemonCard.style.display = "flex";
    filteredPokemonCard.style.flexDirection = "column";
    filteredPokemonCard.style.alignItems = "center";
    filteredPokemonCard.style.flexBasis = "auto";
      filteredPokemonCard.style.borderRadius = "10px";
     
      const pokemonType = pokemon.type;
      pokemonCardColor(filteredPokemonCard, pokemonType);

    //Lagre knapp
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Lagre";
    saveBtn.style.backgroundColor = "white";

    saveBtn.addEventListener("click", function () {
      savePokemon(index);
    });

    //Slette knapp
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Slett";
    deleteBtn.style.backgroundColor = "white";

    deleteBtn.addEventListener("click", function () {
      deletePokemon(index);
    });

    //Redigere knapp
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Rediger";
      editBtn.style.backgroundColor = "white";
      editBtn.style.borderRadius = "10px"
      editBtn.style.border = "1px solid grey"

    editBtn.addEventListener("click", function () {
      editPokemon(index);
    });

    const btnsDiv = document.createElement("div");
    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-around";
    btnsDiv.style.gap = "10px";

    filteredPokemonCard.innerHTML = `
        <img src="${pokemon.image}" style="width: 100px" />
        <h3>Navn: ${pokemon.name}</h3>
        <h3>Type: ${pokemon.type}</h4>
        `;

    btnsDiv.append(saveBtn, deleteBtn, editBtn);

    filteredPokemonCard.append(btnsDiv);
    pokemonContainer.append(filteredPokemonCard);
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