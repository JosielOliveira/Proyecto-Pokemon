// Importa las funciones `pedirPokemons` y `pedirMasInfoDelPokemon` desde el archivo "api" en la carpeta "utils".
// Estas funciones permiten obtener una lista de Pokémon y detalles adicionales de cada Pokémon.
import { pedirPokemons, pedirMasInfoDelPokemon } from "./utils/api";

// Importa la función `crearPokemonInfoCards` desde el archivo "Card" en la carpeta "components".
// Esta función genera una tarjeta con la información de un Pokémon.
import { crearPokemonInfoCards } from "./components/Card";

// Selecciona el elemento HTML con el ID "pokemon-container", donde se añadirán las tarjetas de los Pokémon.
const pokemonContainer = document.getElementById("pokemon-container");

// Obtener referencias a los elementos del DOM
const searchInput = document.getElementById('search');

// Lista de Pokémon
let pokemonList = [
  { name: 'Bulbasaur', type: 'Grass', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'Charmander', type: 'Fire', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'Squirtle', type: 'Water', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  { name: 'Caterpie', type: 'Bug', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
  { name: 'Weedle', type: 'Bug', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
  { name: 'Pidgey', type: 'Normal', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
  { name: 'Rattata', type: 'Normal', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
  { name: 'Spearow', type: 'Normal', url: 'https://pokeapi.co/api/v2/pokemon/21/' },
  { name: 'Ekans', type: 'Poison', url: 'https://pokeapi.co/api/v2/pokemon/23/' },
  { name: 'Pikachu', type: 'Electric', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
];

// Función para mostrar los Pokémon en el contenedor
function displayPokemon(pokemon) {
  pokemonContainer.innerHTML = ''; // Limpiar el contenedor
  pokemon.forEach(p => {
    const card = crearPokemonInfoCards(p);
    pokemonContainer.appendChild(card);
  });
}

// Función para filtrar Pokémon
function filterPokemon(searchText) {
  const filteredPokemon = pokemonList.filter(p => 
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );
  displayPokemon(filteredPokemon);
}

// Añadir event listener al campo de búsqueda
searchInput.addEventListener('input', (event) => {
  const searchText = event.target.value;
  filterPokemon(searchText);
});

// Función para obtener la información detallada de los Pokémon
async function fetchPokemonDetails() {
  try {
    const detailedPokemonPromises = pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return {
        name: data.name,
        types: data.types,
        sprites: data.sprites
      };
    });
    pokemonList = await Promise.all(detailedPokemonPromises);
    displayPokemon(pokemonList); // Mostrar todos los Pokémon al cargar la página
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

// Llama a la función para obtener la información detallada de los Pokémon
fetchPokemonDetails();

// Declara una función asíncrona `cargarPokemons` que se encarga de cargar y mostrar los Pokémon en la interfaz.
async function cargarPokemons() {
  // Llama a `pedirPokemons` para obtener la lista inicial de Pokémon desde la API.
  const pokemons = await pedirPokemons();

  // Utiliza `Promise.all` para hacer una solicitud adicional de información para cada Pokémon en `pokemons`.
  // Mapea cada elemento `pokemon` en la lista para obtener su URL y llama a `pedirMasInfoDelPokemon`.
  const pokemosConMasInfo = await Promise.all(
    pokemons.map((pokemon) => {
      return pedirMasInfoDelPokemon(pokemon.url);
    })
  );

  // Imprime en la consola el array `pokemosConMasInfo`, que ahora contiene objetos con la información detallada de cada Pokémon.
  console.log("🚀 ~ pokemosConMasInfo ~ pokemosConMasInfo:", pokemosConMasInfo);

  // Itera sobre cada elemento `pokemon` en `pokemosConMasInfo` para crear y mostrar una tarjeta con su información.
  pokemosConMasInfo.forEach((pokemon) => {
    // Llama a `crearPokemonInfoCards` para generar una tarjeta (`card`) con la información del Pokémon.
    const card = crearPokemonInfoCards(pokemon);

    // Imprime en la consola la tarjeta creada para este Pokémon, útil para verificar que se creó correctamente.
    console.log("🚀 ~ pokemosConMasInfo.forEach ~ card:", card);

    // Agrega la tarjeta creada al contenedor `pokemonContainer` en la página HTML.
    pokemonContainer.appendChild(card);
  });
}

export function renderLogin() {
  const isLogin = localStorage.getItem("loggedIn");
  if(isLogin !=="true"){
    window.location.href = "./components/login/login.html";
  }
}
renderLogin();
// Llama a la función `cargarPokemons` para iniciar el proceso de carga y mostrar los Pokémon en la interfaz.
cargarPokemons();