$(document).ready(function () {
  getPokemonListV2();
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  function getPokemonListV2() {
    $("#listaPokemon");
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon?limit=60",
      method: "GET",
    }).done(function (pokemon) {
      var listadoPokemon = pokemon.results;

      var pokemonFijos = listadoPokemon.map(function (pokemon) {
        var pokemonId = pokemon.url.split("/")[6];

        return $.ajax({
          url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          method: "GET",
        }).then(function (detallesPokemon) {

          var tipo = detallesPokemon.types[0].type.name.toLowerCase();

          return `
            <div class="d-flex justify-content-around col custom-col mt-5">
              <div class="pokemon-card text-center">
                <a class="text-decoration-none" href="detallePokemon.html?id=${pokemonId}">
                  <div>
                    <img class="pokemon-sprite" 
                      src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonId.padStart(3, '0')}.png" />
                  </div>
                  <div class="pokemon-name hover-${tipo}">
                    <p class="mt-3">${pokemon.name}</p>
                    <p>${pokemonId}</p>
                  </div>
                </a>
              </div>
            </div>
          `;
        });
      });

      Promise.all(pokemonFijos).then(function (templates) {
        templates.forEach(function (template) {
          $('#listaPokemon').append(template);
        });
      });
    });
  }
  tiposEspayol();

  function tiposEspayol() {
    $("#tipoPoke");
    $.ajax({
      url: "https://pokeapi.co/api/v2/type?limit=18",
      method: "GET",
    }).done(function (tipoPokemon) {
      var tipos = tipoPokemon.results;

      var coloresTipos = {
        "normal": "#929AA2",
        "fuego": "#FF9B54",
        "agua": "#4C90D5",
        "planta": "#64BC5C",
        "eléctrico": "#F4D13B",
        "hielo": "#75CFC0",
        "lucha": "#CD406A",
        "veneno": "#AE6BCC",
        "tierra": "#DA7749",
        "volador": "#92AADD",
        "psíquico": "#F97077",
        "bicho": "#90C22D",
        "roca": "#C8B88E",
        "fantasma": "#5269AE",
        "dragón": "#0B6DC3",
        "siniestro": "#5D5465",
        "acero": "#5A8FA2",
        "hada": "#EA91E8"
      };

      tipos.forEach(function (tipo) {
        $.ajax({
          url: tipo.url,
          method: "GET",
        }).done(function (detallesTipo) {
          var nombreEspanol = detallesTipo.names.find(function (name) {
            return name.language.name === 'es';
          }).name;

          var color = coloresTipos[nombreEspanol.toLowerCase()] || '#000000';

          var template = `
            <li class="col-6 col-3 pb-2">
              <a class="dropdown-item text-capitalize" href="#" style="background-color: ${color}; color: #fff;">
                ${nombreEspanol}
              </a>
            </li>
          `;
          $('#tipoPoke').append(template);
        });
      });
    });
  }

});





