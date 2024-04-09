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
const hpContainer = document.getElementById("hp-container");

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

  pokemonData.forEach((pokemon) => {
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.style.width = "15vw";
    pokemonImage.classList.add(pokemon.name, "image-container");
   

    mainContainer.append(pokemonImage);
  });

  styleBattleground();
  showPokemonHp();
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

function showPokemonHp() {
  hpContainer.innerHTML = "";
  hpContainer.style.position = "absolute";
  hpContainer.style.zIndex = "5";
  hpContainer.style.top = "5%";
  hpContainer.style.right = "45%";

  pokemonData.forEach((pokemon) => {
    const capName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const nameContainer = document.createElement("p");
    nameContainer.innerHTML = "Pikachu";
    nameContainer.style.margin = "2px";
    nameContainer.innerHTML = capName;
    nameContainer.style.color = "white";
    nameContainer.style.fontSize = "1.5rem";

    const hpBar = document.createElement("div");
    hpBar.style.width = "200px";
    hpBar.style.height = "20px";
    hpBar.style.backgroundColor = "white";
    hpBar.style.marginBottom = "10px";

    const hpBarFill = document.createElement("div");
    const hpPercentage = (pokemon.hp / 100) * 100;
    hpBarFill.style.width = `${hpPercentage}`;
    hpBarFill.style.height = "100%";
    hpBarFill.style.backgroundColor = "red";

    hpBar.appendChild(hpBarFill);
    hpContainer.append(nameContainer, hpBar);
    mainContainer.appendChild(hpContainer);
  });
}
