# Pokédex & Pokémon Battle Game

## Table of Contents
- [Pokédex \& Pokémon Battle Game](#pokédex--pokémon-battle-game)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Detailed Usage Guide](#detailed-usage-guide)
    - [Pokédex Features](#pokédex-features)
      - [Main Pokédex View](#main-pokédex-view)
      - [Type Filtering](#type-filtering)
      - [Custom Pokémon Creation](#custom-pokémon-creation)
      - [Save, edit and delete Pokémons](#save-edit-and-delete-pokémons)
    - [Battle System Guide](#battle-system-guide)
      - [Accessing Battle Mode](#accessing-battle-mode)
      - [HP System](#hp-system)
      - [Attack System](#attack-system)
      - [Healing System](#healing-system)
  - [Project Structure](#project-structure)

## Description
An interactive Pokémon web application featuring two main components: a comprehensive Pokédex and a fun Pokémon battle game. Users can explore Pokémon, create custom entries, and engage in strategic battles. The application leverages the PokéAPI for authentic Pokémon data and implements local storage for persistent custom Pokémon creation.

## Features
- Browse first 50 original Pokémons
- Pokémon type-based filtering system
- Custom Pokémon creation and storage
- Interactive battle system with HP management
- Type advantage mechanics in battles
- Responsive design
- Real-time battle statistics

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- PokéAPI
- Local Storage API
- RESTful API integration

## Installation
1. Clone the repository:
```
git clone https://github.com/torildhov/pokedex-battle-application.git
```

2. Navigate to the project directory:
```
cd pokedex-battle-application
```

3. Launch the application with live server or open index.html in a web browser.

## Detailed Usage Guide
### Pokédex Features
#### Main Pokédex View
- Scroll through all available Pokémon
- Each card shows name, image, and type

#### Type Filtering
- Use the type icons at the top to filter Pokémons
- Click "Show All" button to reset filters

#### Custom Pokémon Creation
- Enter desired name in the "Navn" field
- Select type from dropdown menu
- Click "Lag Pokémon!" to create
- Custom Pokémons are stored locally

#### Save, edit and delete Pokémons
- Click "Rediger" to edit a Pokémon's name and type
- Click "Slett" to remove a Pokémon, either from the main section or the saved Pokémon's section
- Click "Lagre" to save a Pokémon to the saved Pokémon's section


### Battle System Guide
#### Accessing Battle Mode
- Click "Pokémon Battle Spill" in top right corner

#### HP System
- Each Pokémon starts with HP corresponding to their base HP
- HP is displayed in real-time
- Battle ends when two Pokémons faint and reach HP 0. Winner evolves to the next form

#### Attack System
- Attack: Deals standard damage corresponding to the Pokémon's base attack stat
- Special Attack: only avilable when a Pokémon's HP is 50% or less. Based on the Pokémon's base attack stat

#### Healing System
- Heal: Restores a random number of HP between 0 and 20
- Mega evolution heal: if Pokémon is healed by between 15 and 20, the Pokémon will mega evolve to its highest form

## Project Structure
```eksamen-javascript-api/
├── index.html              # Pokédex main page
├── pokemon-battle.html     # Battle system page
├── script.js              # Pokédex functionality
├── pokemon-battle.js      # Battle system logic
└── assets/
    ├── 0.png             # Bug type icon
    ├── 1.png             # Dark type icon
    ├── 2.png             # Dragon type icon
    ├── 3.png             # Electric type icon
    ├── 4.png             # Fairy type icon
    ├── 5.png             # Fighting type icon
    ├── 6.png             # Fire type icon
    ├── 7.png             # Flying type icon
    ├── 8.png             # Ghost type icon
    ├── 9.png             # Grass type icon
    ├── 10.png            # Ground type icon
    ├── 11.png            # Ice type icon
    ├── 12.png            # Normal type icon
    ├── 13.png            # Poison type icon
    ├── 14.png            # Psychic type icon
    ├── 15.png            # Rock type icon
    ├── 16.png            # Steel type icon
    ├── 17.png            # Water type icon
    └── vis-alle.png      # Show all button icon
```
