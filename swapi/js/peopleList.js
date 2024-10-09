$(document).ready(function () {
  getPeopleList();
  function getPeopleList() {
    $.ajax({
      url: "https://swapi.dev/api/people",
      method: "GET",
    }).done(function (response) {
      var listadoPeople = response.results;

      var template = listadoPeople.map(function (person) {
        var personId = person.url.split("/")[5];

        return `
          <div class="d-flex justify-content-around col-4 col-md-3 mb-4">
            <div class="people-card text-center">
              <a class="text-decoration-none" href="peopleDetail.html?id=${personId}">
                <div class="people-name">
                  <p class="mt-3">${person.name}</p>
                  <p>ID: ${personId}</p>
                </div>
              </a>
            </div>
          </div>
        `;
      });

      $("#peopleList").append(template);
    });
  }
});