$(document).ready(function () {
    const tipoTraducciones = {"grass": "Planta", "poison": "Veneno", "fire": "Fuego", "water": "Agua", "flying": "Volador", "bug": "Bicho", 
        "normal": "Normal", "electric": "Eléctrico", "ground": "Tierra", "fairy": "Hada", "fighting": "Lucha", "psychic": "Psíquico", 
        "rock": "Roca", "steel": "Acero", "ice": "Hielo", "ghost": "Fantasma", "dragon": "Dragón", "dark": "Siniestro"
    };
    var urlParams = new URLSearchParams(window.location.search);
    var pokemonId = urlParams.get("id");

    if (!pokemonId) {
        alert("No se ha recibido el ID de Pokémon.");
        return;
    }

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        method: "GET",
    }).done(function (pokemon) {
        var template = `
            <div class="d-flex justify-content-around mt-5 col-12">
                <div id="botonAnterior" class="btn d-flex mt-3 rounded-5">
                    <h3 class="align-content-center ms-2 mt-2 me-2"><i class="bi bi-caret-left-fill me-2"></i> nº${pokemon.id - 1}</h3>
                </div>

                <div>
                    <h1>${pokemon.name} nº${pokemon.id}</h1>
                </div>

                <div id="botonSiguiente" class="btn d-flex mt-3 rounded-5">
                    <h3 class="align-content-center me-2 ms-2 mt-2">nº${pokemon.id + 1} ${pokemon.name}</h3>
                </div>
            </div>

            <div class="d-flex mt-5 col-12">
                <div class="col-6 text-center">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
                </div>

                <div class="col-6">
                    <div id="tarjeta-detalle" class="rounded-5 mb-4">
                        <div class="d-flex">
                            <p class="tamayo-letra ms-4 mt-2">Categoría: ${pokemon.types[0].type.name}</p>
                            <p class="tamayo-letra ms-4 mt-2">Habilidad: ${pokemon.abilities[0].ability.name}</p>
                        </div>
                        <div class="d-flex">
                            <p class="tamayo-letra ms-4 mt-4">Peso: ${pokemon.weight / 10} kg</p>
                            <p class="tamayo-letra ms-5 mt-4">Altura: ${pokemon.height / 10} m</p>
                            <p class="tamayo-letra ms-5 mt-4">Exp base: ${pokemon.base_experience}</p>
                        </div>
                        <div class="d-flex">
                            <p class="tamayo-letra ms-4 mt-4">Tipo:
                            ${pokemon.types.map(type => {
                                const tipoEnEspanol = tipoTraducciones[type.type.name] || type.type.name;
                                
                                return `<span class="badge bg-success me-2">${tipoEnEspanol}</span>`;
                            }).join('')}
                            </p>
                            <p class="tamayo-letra ms-5 mt-4">
                                Sexo:
                                <img src="../img/macho.png" width="25" alt="macho">
                                <img src="../img/hembra.png" width="25" alt="hembra">
                            </p>
                        </div>
                    </div>
                    <div id="estadisticas" class="rounded-5 text-center">
                        <h4 class="pt-3">Estadísticas base</h4>
                        <p>HP: ${pokemon.stats[0].base_stat}</p>
                        <p>Ataque: ${pokemon.stats[1].base_stat}</p>
                        <p>Defensa: ${pokemon.stats[2].base_stat}</p>
                        <p>Ataque especial: ${pokemon.stats[3].base_stat}</p>
                        <p>Defensa especial: ${pokemon.stats[4].base_stat}</p>
                        <p>Velocidad: ${pokemon.stats[5].base_stat}</p>
                    </div>
                </div>
            </div>
        `;
        $('#detallePokemon').html(template);
    }).fail(function () {
        alert("Error al obtener los detalles del Pokémon.");
    });
});