// Importa las funciones `pedirPokemons`, `pedirMasInfoDelPokemon` y `pedirTiposDePokemon` desde el archivo "api" en la carpeta "utils".
// Estas funciones permiten obtener una lista de Pokémon, detalles adicionales de cada Pokémon y los tipos de Pokémon.
import { pedirPokemons, pedirMasInfoDelPokemon, pedirTiposDePokemon } from "./utils/api";

// Importa la función `crearPokemonInfoCards` desde el archivo "Card" en la carpeta "components".
// Esta función genera una tarjeta con la información de un Pokémon.
import { crearPokemonInfoCards } from "./components/Card";

// Selecciona los elementos HTML con los IDs "pokemon-container" y "type-filter", donde se añadirán las tarjetas de los Pokémon y los filtros de tipo.
const pokemonContainer = document.getElementById("pokemon-container");
const typeFilter = document.getElementById("type-filter");
const searchInput = document.getElementById('search');

// Lista de Pokémon
let pokemonList = [];

// Función para mostrar los Pokémon en el contenedor
function displayPokemon(pokemon) {
  pokemonContainer.innerHTML = ''; // Limpiar el contenedor
  pokemon.forEach(p => {
    const card = crearPokemonInfoCards(p);
    pokemonContainer.appendChild(card);
  });
}

// Función para filtrar Pokémon
function filterPokemon(searchText, type) {
  const filteredPokemon = pokemonList.filter(p => 
    p.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (type === '' || p.types.some(t => t.type.name === type))
  );
  displayPokemon(filteredPokemon);
}

// Añadir event listener al campo de búsqueda
searchInput.addEventListener('input', (event) => { 
  const searchText = event.target.value;
  const type = typeFilter.value;
  filterPokemon(searchText, type);
});

// Añadir event listener al filtro de tipo
typeFilter.addEventListener('change', (event) => {
  const type = event.target.value;
  const searchText = searchInput.value;
  filterPokemon(searchText, type);
});

// Función para obtener la información detallada de los Pokémon
async function fetchPokemonDetails() {
  try {
    const pokemons = await pedirPokemons();
    const detailedPokemonPromises = pokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return {
        name: data.name,
        types: data.types,
        sprites: data.sprites
      };
    });
    pokemonList = await Promise.all(detailedPokemonPromises);
    
    // Añadir Pikachu manualmente
    const pikachu = {
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      }
    };
    pokemonList.push(pikachu);
    
    displayPokemon(pokemonList); // Mostrar todos los Pokémon al cargar la página
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

// Función para obtener los tipos de Pokémon y actualizar el filtro de tipo
async function fetchPokemonTypes() {
  try {
    const types = await pedirTiposDePokemon();
    types.forEach(type => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name;
      typeFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
  }
}

// Llama a las funciones para obtener la información detallada de los Pokémon y los tipos de Pokémon
fetchPokemonDetails();
fetchPokemonTypes();