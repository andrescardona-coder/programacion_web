const apiUrl = "https://pokeapi.co/api/v2/pokemon/50";
const pokemonContainer = document.getElementById("pokemons");
const loadBtn = document.getElementById("loadBtn");
const loading = document.getElementById("loading");
const pokemonCountInput = document.getElementById("pokemonCount");

function createCard(pokemon) {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const image = pokemon.sprites?.front_default || "https://via.placeholder.com/300x300?text=Sin+imagen";
    const types = pokemon.types.map(t => t.type.name).join(', ');

    col.innerHTML = `
        <div class="card pokemon-card h-100 shadow-sm">
            <img src="${image}" class="card-img-top" alt="${pokemon.name}" loading="lazy">
            <div class="card-body">
                <h5 class="card-title pokemon-name">${pokemon.name}</h5>
                <ul class="list-unstyled mb-0">
                    <li><strong>ID:</strong> #${pokemon.id}</li>
                    <li><strong>Tipo:</strong> ${types}</li>
                    <li><strong>Altura:</strong> ${pokemon.height / 10} m</li>
                    <li><strong>Peso:</strong> ${pokemon.weight / 10} kg</li>
                </ul>
            </div>
        </div>
    `;
    return col;
}

function fetchPokemon(id) {
    return fetch(apiUrl + id).then(function(response) {
        if (!response.ok) throw new Error("Error al obtener pokemon #" + id);
        return response.json();
    });
}

function loadPokemons(count) {
    pokemonContainer.innerHTML = "";
    loading.style.display = "block";
    loadBtn.disabled = true;

    const ids = [];
    for (let i = 1; i <= count; i++) {
        ids.push(i);
    }

    Promise.all(ids.map(fetchPokemon))
        .then(function(pokemons) {
        const fragment = document.createDocumentFragment();
        pokemons.forEach(function(pokemon) {
            fragment.appendChild(createCard(pokemon));
        });
        pokemonContainer.appendChild(fragment);
    })
        .catch(function(error) {
        pokemonContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">${error.message}</div>
                </div>
            `;
    })
        .finally(function() {
        loading.style.display = "none";
        loadBtn.disabled = false;
    });
}

loadBtn.addEventListener("click", function() {
    let count = parseInt(pokemonCountInput.value) || 12;
    count = Math.min(Math.max(count, 1), 50);
    pokemonCountInput.value = count;
    loadPokemons(count);
});

loadPokemons(4);


