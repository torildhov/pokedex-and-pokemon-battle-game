document.body.style.backgroundImage = "url('/assets/battle-bg.jpeg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.width = "100%";
document.body.style.height = "100vh";
document.body.style.overflow = "hidden";

const mainContainer = document.getElementById("main-container");
const pikachuContainer = document.getElementById("pikachu-container");
const charmanderContainer = document.getElementById("charmander-container");
const squirtleContainer = document.getElementById("squirtle-container");

let battleData = [];

async function getPokemonLinks() {
  try {
    const linkRequest = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=25"
    );
    const linkResult = await linkRequest.json();
    let links = linkResult.results.map((link) => link.url);
    return links;
  } catch {
    console.log("Feil med å hente inn pokemonlinker");
  }
}
console.log(getPokemonLinks());

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

    let hp = dataResult.stats[0].base_stat;
    let attack = dataResult.stats[1].base_stat;
    let defense = dataResult.stats[2].base_stat;
    let specialAttack = dataResult.stats[3].base_stat;
    let specialDefense = dataResult.stats[4].base_stat;

    return {
      name,
      image,
      type: firstType,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
    };
  } catch (error) {
    console.error("Feil med å hente inn pokemondetaljer", error);
  }
}

//Funksjon for å populere globale array
async function initializePokemons() {
  try {
    const links = await getPokemonLinks();

    for (const pokemonLinks of links) {
      const pokemonData = await getPokemonData(pokemonLinks);

      battleData.push(pokemonData);
    }
    showPikachuCharmanderAndSquirtle();
  } catch (error) {
    console.error("Feil med å laste inn pokemons", error);
  }
}
initializePokemons();
console.log("VIRKER", battleData);

function showPikachuCharmanderAndSquirtle() {
  mainContainer.innerHTML = "";

  // Pikachu
  const pikachu = battleData.find((pokemon) => pokemon.name === "pikachu");
  const pikachuImage = document.createElement("img");
  pikachuImage.src = pikachu.image;
  pikachuImage.style.width = "15vw";
  pikachuContainer.appendChild(pikachuImage);

  // Charmander
  const charmander = battleData.find(
    (pokemon) => pokemon.name === "charmander"
  );

  const charmanderImage = document.createElement("img");
  charmanderImage.src = charmander.image;
  charmanderImage.style.width = "15vw";
  charmanderContainer.appendChild(charmanderImage);

  // Squirtle
  const squirtle = battleData.find((pokemon) => pokemon.name === "squirtle");
  const squirtleImage = document.createElement("img");
  squirtleImage.src = squirtle.image;
  squirtleImage.style.width = "15vw";
  squirtleContainer.appendChild(squirtleImage);

  mainContainer.append(
    pikachuContainer,
    charmanderContainer,
    squirtleContainer
  );
  styleBattleground();
}

function styleBattleground() {
  const imageContainers = document.getElementsByClassName("image-container");
  for (let container of imageContainers) {
    container.style.position = "absolute";
  }

  const pikachu = document.querySelector(".pikachu");
  pikachu.style.bottom = "7%";
  pikachu.style.left = "18%";

  const charmander = document.querySelector(".charmander");
  charmander.style.bottom = "7%";
  charmander.style.right = "18%";

  const squirtle = document.querySelector(".squirtle");
  squirtle.style.top = "30%";
  squirtle.style.left = "45%";
}
