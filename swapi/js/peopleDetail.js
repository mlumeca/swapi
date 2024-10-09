$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var peopleId = parseInt(urlParams.get("id"));

    if (!peopleId) {
        alert("No se ha recibido el ID del personaje.");
        return;
    }

    peopleDetail(peopleId);

    function peopleDetail(peopleId) {
        $.ajax({
            url: `https://swapi.dev/api/people/${peopleId}`,
            method: "GET",
        }).done(function (people) {
            var template = `
                <div class="d-flex justify-content-around mt-5 col-12 text-capitalize">
                    <a href="../html/peopleDetails.html?id=${peopleId - 1}" id="botonAnterior" class="btn d-flex mt-3 rounded-5" ${peopleId <= 1 ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
                         <h3 class="align-content-center ms-2 mt-2 me-2"><i class="bi bi-caret-left-fill me-2"></i>Anterior pokémon</h3>
                    </a>
                    <div>
                        <h1>${people.name} nº${people.id}</h1>
                    </div>

                    <a href="../html/peopleDetails.html?id=${peopleId + 1}" id="botonSiguiente" class="btn d-flex mt-3 rounded-5">
                            <h3 class="align-content-center me-2 ms-2 mt-2">Siguiente pokémon<i class="bi bi-caret-right-fill ms-2"></i></h3>
                    </a>
                </div>

                <div class="d-flex mt-5 col-12">
                    <div class="col-6 text-center">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/people/other/official-artwork/${people.id}.png" alt="${people.name}">
                    </div>

                    <div class="col-6">
                        <div id="tarjeta-detalle" class="rounded-5 mb-4">
                            <div class="d-flex">
                                <p class="tamayo-letra ms-4 mt-2">Categoría: ${people.types[0].type.name}</p>
                                <p class="tamayo-letra ms-4 mt-2">Habilidad: ${people.abilities[0].ability.name}</p>
                            </div>
                            <div class="d-flex">
                                <p class="tamayo-letra ms-4 mt-4">Peso: ${people.weight / 10} kg</p>
                                <p class="tamayo-letra ms-5 mt-4">Altura: ${people.height / 10} m</p>
                                <p class="tamayo-letra ms-5 mt-4">Exp base: ${people.base_experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#peopleDetails').html(template);
        }).fail(function () {
            alert("Error al obtener los detalles del personaje.");
        });
    }


});
