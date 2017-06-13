$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = ($('#searchText').val());
    getMovies(searchText);
    e.preventDefault();
  });
});

function  getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=84b339efcbf1ebe8577db90bca7cd395&query=' + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';

      $.each(movies, (index, movie) => {

        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}" class="moviePoster">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details </a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
