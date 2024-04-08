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

const pikachuData = [];
const charmanderData = [];
const squirtleData = [];
const pokemonData = [];

async function fetchBattleData(pokemonName) {
  try {
    const battleRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const battleResponse = await battleRequest.json();

    pokemonData.push({
      name: battleResponse.name,
      image: battleResponse.sprites.other.dream_world.front_default,
      hp: battleResponse.stats[0].base_stat,
      attack: battleResponse.stats[1].base_stat,
      defense: battleResponse.stats[2].base_stat,
      specialAttack: battleResponse.stats[3].base_stat,
      specialDefense: battleResponse.stats[4].base_stat,
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

async function fetchPikachuCharmanderAndSquirtle() {
  await fetchBattleData("pikachu");
  await fetchBattleData("charmander");
  await fetchBattleData("squirtle");

  showPikachuCharmanderAndSquirtle();
}

fetchPikachuCharmanderAndSquirtle();

console.log("Pokemon data:", pokemonData);

function showPikachuCharmanderAndSquirtle() {
  mainContainer.innerHTML = "";

  // Pikachu
  const pikachuImage = document.createElement("img");
  pikachuImage.src = pokemonData[0].image;
  pikachuImage.style.width = "15vw";
  pikachuContainer.appendChild(pikachuImage);

  // Charmander
  const charmanderImage = document.createElement("img");
  charmanderImage.src = pokemonData[1].image;
  charmanderImage.style.width = "15vw";
  charmanderContainer.appendChild(charmanderImage);

  // Squirtle
  const squirtleImage = document.createElement("img");
  squirtleImage.src = pokemonData[2].image;
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
  //Styling av bilder
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

function makeHealthBars() {}
