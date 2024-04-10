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

const pokemonData = [];
const winnerPictures = [];

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

async function fetchWinnerPictures(pokemonName) {
  try {
    const request = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const response = await request.json();

    winnerPictures.push({
      name: response.name,
      image: response.sprites.other.dream_world.front_default,
      hp: response.stats[0].base_stat,
      initialHp: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      specialAttack: response.stats[3].base_stat,
      specialDefense: response.stats[4].base_stat,
    });
  } catch (error) {
    console.error("Error fetching Pokemon bilder:", error);
  }
}

async function fetchRaichuIvysaurAndCharmeleon() {
  await fetchWinnerPictures("raichu");
  await fetchWinnerPictures("ivysaur");
  await fetchWinnerPictures("charmeleon");
  await fetchWinnerPictures("venusaur");
  await fetchWinnerPictures("charizard");
}
fetchRaichuIvysaurAndCharmeleon();

console.log("Winner pictures and data:", winnerPictures);

function showPikachuCharmanderAndBulbasaur() {
  mainContainer.innerHTML = "";

  pokemonData.forEach((pokemon, index) => {
    const pokemonContainer = document.createElement("div");
    pokemonContainer.classList = "pokemon-container"; //????
    pokemonContainer.classList.add(pokemon.name, "image-container"); //??

    //Pokemonbilder
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.style.width = "15vw";
    pokemonImage.addEventListener("mouseover", () => {
      pokemonImage.style.transform = "scale(1.1)";
    });
    pokemonImage.addEventListener("mouseout", () => {
      pokemonImage.style.transform = "scale(1)";
    });

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

    const healButton = document.createElement("button");
    healButton.innerHTML = "Heal";
    healButton.addEventListener("click", () => {
      healPokemon(index);
    });

    //Bærbilder
    const berryImageContainer = document.createElement("div");
    berryImageContainer.classList = `${pokemon.name}-berry berry-container`;
    const berryImage = document.createElement("img");
    berryImage.src = "/assets/berry.png";
    berryImage.style.width = "5em";
    berryImage.addEventListener("mouseover", () => {
      berryImage.style.transform = "scale(1.1)";
    });
    berryImage.addEventListener("mouseout", () => {
      berryImage.style.transform = "scale(1)";
    });

    buttonsContainer.append(attackButton, specialAttackButton, healButton);
    pokemonContainer.append(pokemonImage, buttonsContainer);
    berryImageContainer.append(berryImage);
    mainContainer.append(pokemonContainer, berryImageContainer);
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

  const allButtons = document.querySelectorAll("button");
  for (let button of allButtons) {
    button.style.backgroundColor = "white";
    button.style.border = "2px solid orange";
    button.style.color = "black";
    button.style.padding = "4px 7px";
    button.style.margin = "5px";
    button.style.borderRadius = "10px";
    button.style.fontSize = "1em";
    button.style.fontFamily = "helvetica";
    button.style.cursor = "pointer";
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
    });
  }

  const berryContainers = document.getElementsByClassName("berry-container");
  for (let container of berryContainers) {
    container.style.position = "absolute";
  }

  const pikachuBerry = document.querySelector(".pikachu-berry");
  pikachuBerry.style.bottom = "12%";
  pikachuBerry.style.left = "30%";

  const charmanderBerry = document.querySelector(".charmander-berry");
  charmanderBerry.style.bottom = "12%";
  charmanderBerry.style.right = "17%";

  const bulbasaurBerry = document.querySelector(".bulbasaur-berry");
  bulbasaurBerry.style.top = "45%";
  bulbasaurBerry.style.left = "40%";
}

function showPokemonHp() {
  hpContainer.innerHTML = "";
  hpContainer.style.position = "absolute";
  hpContainer.style.zIndex = "5";
  hpContainer.style.top = "18%";
  hpContainer.style.left = "2%";
  hpContainer.style.backdropFilter = "blur(5px)";
  hpContainer.style.padding = "10px";

  pokemonData.forEach((pokemon) => {
    const capName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const nameContainer = document.createElement("p");
    nameContainer.style.margin = "2px";
    nameContainer.innerHTML = capName;
    nameContainer.style.color = "white";
    nameContainer.style.fontSize = "1.5rem";
    nameContainer.style.fontFamily = "helvetica";

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
    hpText.style.fontSize = "1rem";
    hpText.style.marginTop = "0px";

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
    evolveWinner(attacker.name);
    return;
  }

  const randomDefenderIndex = Math.floor(
    Math.random() * activeDefenders.length
  );
  const defender = activeDefenders[randomDefenderIndex];

  if (!defender) {
    alert(
      `Alle de andre pokemonene har besvimt! ${attacker.name} kan ikke angripe.`
    );
    return;
  }

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

  if (
    defender.hp <= defender.initialHp * 0.5 &&
    defender.hp > defender.initialHp * 0.01 &&
    !specialAttackAlert[defender.name]
  ) {
    alert(
      `${defender.name} har nå 50% eller mindre HP og kan bruke speical attack!`
    );
    specialAttackAlert[defender.name] = true;
  } else if (pokemonData[defenderIndex].hp !== 0) {
    alert(`${attacker.name} angrepet ${defender.name} med ${damage} damage!`);
  } else {
    alert(`${defender.name} har besvimt!`);
  }

  showPokemonHp();
}

//SPECIAL ATTACK FUNKSJON
function specialPokemonAttack(attackerIndex) {
  const attacker = pokemonData[attackerIndex];

  if (attacker.hp === 0) {
    alert(`${attacker.name} har besvimt og kan ikke angripe.`);
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
    evolveWinner(attacker.name);
    return;
  }

  const randomDefenderIndex = Math.floor(
    Math.random() * activeDefenders.length
  );
  const defender = activeDefenders[randomDefenderIndex];

  if (!defender) {
    alert(
      `Alle de andre pokemonene har besvimt! ${attacker.name} kan ikke angripe.`
    );
    return;
  }

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

//EVOLVE FUNKSJON
function evolveWinner(winnerName) {
  alert(`Alle de andre pokemonene har besvimt. ${winnerName} har vunnet!`);

  let evolvedForm;
  if (winnerName === "pikachu") {
    evolvedForm = winnerPictures.find((pokemon) => pokemon.name === "raichu");
  } else if (winnerName === "charmander") {
    evolvedForm = winnerPictures.find(
      (pokemon) => pokemon.name === "charmeleon"
    );
  } else if (winnerName === "bulbasaur") {
    evolvedForm = winnerPictures.find((pokemon) => pokemon.name === "ivysaur");
  }

  if (evolvedForm) {
    const winnerContainer = document.querySelector(`.${winnerName}`);
    if (winnerContainer) {
      const winnerImage = winnerContainer.querySelector("img");
      if (winnerImage) {
        winnerImage.src = evolvedForm.image;
      }
    }
    alert(`${winnerName} har utviklet seg til ${evolvedForm.name}!`);
  }
  let winnerScreenImage = evolvedForm.image;
  let winnerScreenName = evolvedForm.name;
  winnerScreen(winnerScreenImage, winnerScreenName);
}

function winnerScreen(image, name) {
  setTimeout(() => {
    const winnerScreen = document.createElement("div");
    winnerScreen.style.display = "flex";
    winnerScreen.style.flexDirection = "column";
    winnerScreen.style.alignItems = "center";
    winnerScreen.style.justifyContent = "center";
    winnerScreen.style.width = "100vw";
    winnerScreen.style.height = "100vh";
    winnerScreen.style.backgroundColor = "red";
    winnerScreen.style.position = "fixed";
    winnerScreen.style.zIndex = "1000";
    winnerScreen.style.top = "0";
    winnerScreen.style.left = "0";

    const winnerText = document.createElement("p");
    winnerText.innerHTML = `${name} har vunnet!`.toUpperCase();
    winnerText.style.fontFamily = "helvetica";
    winnerText.style.fontSize = "2em";
    winnerText.style.color = "white";

    const winnerPicture = document.createElement("img");
    winnerPicture.src = image;
    winnerPicture.style.width = "45vw";

    winnerScreen.append(winnerText, winnerPicture);
    document.body.appendChild(winnerScreen);
  }, 1000);
}

//HEALE FUNKSJON

function healPokemon(index) {
  //const heal = Math.floor(Math.random() * 11);
  let healedPokemon = pokemonData[index];
  if (healedPokemon.hp === 0) {
    alert(
      `${healedPokemon.name} har allerede besvimt, og da er det litt vanskelig å spise bær!`
    );
    return;
  }

  if (healedPokemon.hp === healedPokemon.initialHp) {
    alert(
      `${healedPokemon.name} har allerede full hp og trenger ikke mer bær!`
    );
    return;
  }

  const hpIncrease = Math.floor(Math.random() * 21);

  const healedPokemonNewHp = Math.min(
    healedPokemon.hp + hpIncrease,
    healedPokemon.initialHp
  );

  console.log(
    "HpIncrease",
    hpIncrease,
    "healedPokemonNewHp:",
    healedPokemonNewHp
  );

  healedPokemon.hp = healedPokemonNewHp;

  if (hpIncrease >= 15 && hpIncrease <= 20) {
    pokemonMegaEvolution(index);
  } else {
    alert(
      `${healedPokemon.name} spiste ${hpIncrease} bær og hp økte derfor til ${healedPokemonNewHp}. Nam!`
    );
    //Kilde: https://stackoverflow.com/questions/11122438/using-javascript-setinterval-function-to-achieve-animate-effectslower-than-i-ex
    const berryRotate = document.querySelector(`.${healedPokemon.name}-berry`);
    if (berryRotate) {
      berryRotate.style.transform = "rotate(360deg)";
      berryRotate.style.transition = "-webkit-transform 0.5s ease-in-out";
    }
  }

  showPokemonHp();
}

function pokemonMegaEvolution(evolveIndex) {
  let megaEvolve = pokemonData[evolveIndex];
  let evolvedForm;

  if (megaEvolve.name === "pikachu") {
    evolvedForm = winnerPictures.find((pokemon) => pokemon.name === "raichu");
  } else if (megaEvolve.name === "charmander") {
    evolvedForm = winnerPictures.find(
      (pokemon) => pokemon.name === "charizard"
    );
  } else if (megaEvolve.name === "bulbasaur") {
    evolvedForm = winnerPictures.find((pokemon) => pokemon.name === "venusaur");
  }

  if (evolvedForm) {
    console.log(megaEvolve.name);

    const pokemonContainer = document.querySelector(`.${megaEvolve.name}`);
    if (pokemonContainer) {
      const pokemonImage = pokemonContainer.querySelector("img");
      if (pokemonImage) {
        pokemonImage.src = evolvedForm.image;
      }
    }

    megaEvolve.name = evolvedForm.name;
    megaEvolve.image = evolvedForm.image;
    megaEvolve.hp = evolvedForm.hp;
    megaEvolve.initialHp = evolvedForm.initialHp;
    megaEvolve.attack = evolvedForm.attack;
    megaEvolve.defense = evolvedForm.defense;
    megaEvolve.specialAttack = evolvedForm.specialAttack;
    megaEvolve.specialDefense = evolvedForm.specialDefense;

    pokemonData.splice(evolveIndex, 1, evolvedForm);

    alert(
      `${megaEvolve.name} har spist et magisk bær og megautviklet seg ${evolvedForm.name}!`
    );
  }
}


//Til i morgen: 
//1. ordne winner screen for allerede evolved pokemon
//2. ordne alert når allerede evolved pokemon vinner (raichu til raichu)
//3. se på index.js