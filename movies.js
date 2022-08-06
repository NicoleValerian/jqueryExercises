let currentId = 0;
let moviesList = [];

$(function() {

  $("#form").on("submit", function(evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++
    moviesList.push(movieData);

    $("#table-body").append(HTMLtoAppend);
    $("#form").trigger("reset");
  });


  $("tbody").on("click", ".btn.btn-danger", function(evt) {
    let removeIndex = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))
    moviesList.splice(removeIndex, 1)
    $(evt.target).closest("tr").remove();
  });


  $(".fas").on("click", function(evt) {
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let sortKey = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, sortKey, direction);
    
    $("#table-body").empty();

    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#table-body").append(HTMLtoAppend);
    }

    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

function sortBy(array, sortKey, direction) {
  return array.sort(function(a, b) {
    if (sortKey === "rating") {
      a[sortKey] = +a[sortKey];
      b[sortKey] = +b[sortKey];
    }
    if (a[sortKey] > b[sortKey]) {
      return direction === "up" ? 1 : -1;
    } else if (b[sortKey] > a[sortKey]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
