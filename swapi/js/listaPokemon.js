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
      url: "https://pokeapi.co/api/v2/pokemon",
      method: "GET",
    }).done(function (pokemon) {

      var listadoPomemon = pokemon.results;
      listadoPomemon.forEach(function (pokemon) {
        var pokemonId = pokemon.url.split("/")[6];

        var template = `
                <div class="d-flex justify-content-around col custom-col mt-5">
                    <div class="pokemon-card text-center">
                        <a class="text-decoration-none" href="detallePokemon.html?id=${pokemonId}">
                            <div>
                                <img class="pokemon-sprite" 
                                    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonId.padStart(3, '0')}.png" />
                            </div>
                            <div class="pokemon-name ">
                                <p class="mt-3">${pokemon.name}</p>
                                <p>${pokemonId}</p>
                            </div>
                        </a>
                    </div>

                </div>
                `;
        $('#listaPokemon').append(template);
      });

    });
  }

  function fondoTipo(pokemon) {

    var tipo = pokemon.type[0].type.name;
    var fondo = '';

    switch (tipo) {
      case 'grass':
        colorBorde = '#5CBE64';
        break;
      case 'fire':
        colorBorde = '#FBAE46';
        break;
      case 'water':
        colorBorde = '#6CBDE4';
        break;
      case 'poison':
        colorBorde = '#C261D4';
        break;
      case 'bug':
        colorBorde = '#AFC836';
        break;
      case 'ground':
        colorBorde = '#D29463';
        break;
      case 'dark':
        colorBorde = '#9298A4';
        break;
      case 'electric':
        colorBorde = '#FBE273';
        break;
      case 'fairy':
        colorBorde = '#F3A7E7';
        break;
      case 'fighting':
        colorBorde = '#E74347';
        break;
      case 'ghost':
        colorBorde = '#7773D4';
        break;
      case 'ice':
        colorBorde = '#8CDDD4';
        break;
      case 'normal':
        colorBorde = '#A3A49E';
        break;
      case 'psychic':
        colorBorde = '#FE9F92';
        break;
      case 'rock':
        colorBorde = '#D7CD90'
        break;
      case 'steel':
        colorBorde = '#58A6AA';
        break;
      case 'dragon':
        colorBorde = '#0180C7';
        break;
      case 'flying':
        colorBorde = '#A6C2F2';
        break;
      default:
        colorBorde = '#000000';
        break;
    }

    return colorBorde;

  }
});





