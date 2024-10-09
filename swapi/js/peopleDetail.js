$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var peopleId = parseInt(urlParams.get("id"));

    if (!peopleId) {
        alert("No se ha recibido el ID del personaje.");
        return;
    }

    peopleDetail(peopleId);

    function peopleDetail(peopleId) {
        $("#peopleDetail");
        $.ajax({
            url: `https://swapi.dev/api/people/${peopleId}`,
            method: "GET",
        }).done(function (people) {
            var template = `
                <div class="text-center col-12 text-capitalize">
                    <h1>${people.name}</h1>
                </div>

                <div class="mt-5 d-flex justify-content-center align-items-center">
                    <div class="col-8 justify-content-between offset-2">
                        <div id="tarjeta-detalle" class="rounded-5 mb-4 p-4 border">
                            <div class="d-flex">
                                <p class="tamayo-letra ms-4 mt-2">Color de ojos: ${people.eye_color}</p>
                                <p class="tamayo-letra ms-4 mt-2">Color de piel: ${people.skin_color}</p>
                                <p class="tamayo-letra ms-4 mt-2">Año de nacimiento: ${people.birth_year}</p>
                            </div>
                            <div class="d-flex  mt-4">
                                <p class="tamayo-letra ms-4 mt-2">Peso: ${people.mass} kg</p>
                                <p class="tamayo-letra ms-4 mt-2">Altura: ${people.height} cm</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#peopleDetail').html(template);
        }).fail(function () {
            alert("Error al obtener los detalles del personaje.");
        });
    }
});