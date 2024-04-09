document.body.style.backgroundImage = "url('/assets/battle-bg.jpeg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.width = "100%";
document.body.style.height = "100vh";
document.body.style.overflow = "hidden";

const mainContainer = document.getElementById("main-container");

const pikachuContainer = document.getElementById("pikachu-container");
const charmanderContainer = document.getElementById("charmander-container");
const bulbasaurContainer = document.getElementById("bulbasaur-container");
const hpContainer = document.getElementById("hp-container");

const pikachuData = [];
const charmanderData = [];
const bulbasaurData = [];
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
      initialHp: battleResponse.stats[0].base_stat,
      attack: battleResponse.stats[1].base_stat,
      defense: battleResponse.stats[2].base_stat,
      specialAttack: battleResponse.stats[3].base_stat,
      specialDefense: battleResponse.stats[4].base_stat,
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

async function fetchPikachuCharmanderAndBulbasaur() {
  await fetchBattleData("pikachu");
  await fetchBattleData("charmander");
  await fetchBattleData("bulbasaur");

  showPikachuCharmanderAndBulbasaur();
}

fetchPikachuCharmanderAndBulbasaur();

console.log("Pokemon data:", pokemonData);

function showPikachuCharmanderAndBulbasaur() {
  mainContainer.innerHTML = "";

  pokemonData.forEach((pokemon, index) => {
    const pokemonContainer = document.createElement("div");
    pokemonContainer.classList = "pokemon-container";
    pokemonContainer.classList.add(pokemon.name, "image-container");

    //Bilder
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.style.width = "15vw";

    //Knapper
    const buttonsContainer = document.createElement("div");

    const attackButton = document.createElement("button");
    attackButton.innerHTML = "Attack";
    attackButton.addEventListener("click", () => {
      const defenders = pokemonData.filter((i) => i !== index);
      pokemonAttack(index, defenders);
    });

    const specialAttackButton = document.createElement("button");
    specialAttackButton.innerHTML = "Special attack";
    specialAttackButton.addEventListener("click", () => {
      specialPokemonAttack(index);
    });

    buttonsContainer.append(
      attackButton,
      specialAttackButton
    );
    pokemonContainer.append(pokemonImage, buttonsContainer);
    mainContainer.append(pokemonContainer);
  });

  styleBattleground();
  showPokemonHp();
}

function styleBattleground() {
  const pokemonContainers =
    document.getElementsByClassName("pokemon-container");
  for (let container of pokemonContainers) {
    container.style.position = "absolute";
  }

  const pikachu = document.querySelector(".pikachu");
  pikachu.style.bottom = "7%";
  pikachu.style.left = "18%";

  const charmander = document.querySelector(".charmander");
  charmander.style.bottom = "7%";
  charmander.style.right = "18%";

  const bulbasaur = document.querySelector(".bulbasaur");
  bulbasaur.style.top = "30%";
  bulbasaur.style.left = "45%";
}

function showPokemonHp() {
  hpContainer.innerHTML = "";
  hpContainer.style.position = "absolute";
  hpContainer.style.zIndex = "5";
  hpContainer.style.top = "5%";
  hpContainer.style.right = "20%";

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
    const hpPercentage = (pokemon.hp / pokemon.initialHp) * 100;
    hpBarFill.style.width = `${hpPercentage}%`;
    hpBarFill.style.height = "100%";
    hpBarFill.style.backgroundColor = "red";

    const hpText = document.createElement("p");
    hpText.innerHTML = `${pokemon.hp} / ${pokemon.initialHp}`;
    hpText.style.color = "white";
    hpText.style.fontSize = "1rem"
    hpText.style.marginTop = "0px"

    hpBar.appendChild(hpBarFill);
    hpContainer.append(nameContainer, hpBar, hpText);
  });
  mainContainer.appendChild(hpContainer);
}


//NORMALT ANGREP FUNKSJON
let specialAttackAlert = {};

function pokemonAttack(attackerIndex, defenders) {
  const attacker = pokemonData[attackerIndex];

  if (attacker.hp === 0) {
    alert(`${attacker.name} har besvimt og kan ikke angripe.`);
    return;
  }

  const activeDefenders = defenders.filter(
    (defender) => defender.hp > 0 && defender !== attacker
  );
  if (activeDefenders.length === 0) {
    alert(`Alle de andre pokemonene har besvimt. ${attacker.name} har vunnet!`);
    return;
  }

  const randomDefenderIndex = Math.floor(
    Math.random() * activeDefenders.length
  );
  const defender = activeDefenders[randomDefenderIndex];

  const attackPower = attacker.attack;
  const defensePower = defender.defense;

  let damage = attackPower - defensePower;
  if (damage < 0) {
    damage = 0;
  }

  const defenderIndex = pokemonData.findIndex(
    (pokemon) => pokemon.name === defender.name
  );
  if (defenderIndex !== -1) {
    pokemonData[defenderIndex].hp -= damage;
    if (pokemonData[defenderIndex].hp < 0) {
      pokemonData[defenderIndex].hp = 0;
    }
  }

  if (pokemonData[defenderIndex].hp !== 0) {
    alert(`${attacker.name} angrepet ${defender.name} med ${damage} damage!`);
  } else {
    alert(`${defender.name} har besvimt!`);
  }

  if (
    defender.hp <= defender.initialHp * 0.5 &&
    !specialAttackAlert[defender.name]
  ) {
    alert(
      `${defender.name} har nå 50% eller mindre HP og kan bruke speical attack!`
    );
    specialAttackAlert[defender.name] = true;
  }

  showPokemonHp();
}

//SPECIAL ATTACK FUNKSJON
function specialPokemonAttack(attackerIndex) {
  const attacker = pokemonData[attackerIndex];

  if (attacker.hp === 0) {
    alert(`${attacker.name} har besvimt og kan ikke angripe!.`);
    return;
  }

  if (attacker.hp > attacker.initialHp * 0.5) {
    alert(
      `${attacker.name} kan ikke bruke special attack fordi hp er 50% eller mer.`
    );
    return;
  }

  const activeDefenders = pokemonData.filter(
    (defender) => defender.hp > 0 && defender !== attacker
  );
  if (activeDefenders.length === 0) {
    console.log(
      `Alle de andre pokemonene har besvimt. ${attacker.name} har vunnet!`
    );
    return;
  }

  const randomDefenderIndex = Math.floor(
    Math.random() * activeDefenders.length
  );
  const defender = activeDefenders[randomDefenderIndex];

  const specialAttackPower = attacker.specialAttack;
  const defensePower = defender.defense;

  let damage = specialAttackPower - defensePower;
  if (damage < 0) {
    damage = 0;
  }

  const defenderIndex = pokemonData.findIndex(
    (pokemon) => pokemon.name === defender.name
  );
  if (defenderIndex !== -1) {
    pokemonData[defenderIndex].hp -= damage;
    if (pokemonData[defenderIndex].hp < 0) {
      pokemonData[defenderIndex].hp = 0;
    }
  }

  if (pokemonData[defenderIndex].hp !== 0) {
    alert(
      `${attacker.name} brukte special attack på ${defender.name} med ${damage} damage!`
    );
  } else {
    alert(`${defender.name} har besvimt!`);
  }
  showPokemonHp();
}
 

