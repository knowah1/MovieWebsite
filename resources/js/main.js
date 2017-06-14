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
        // if (movie.poster_path == null){
        //   movie.poster_path = "images/posterMissing.png"
        // } else {
        //
        // }
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

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');








  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=84b339efcbf1ebe8577db90bca7cd395&language=en-US')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      var back = document.getElementById('movie');
      back.style.background = "https://image.tmdb.org/t/p/w640" + movie.backdrop_path;

      // console.log(backgroundImage);

      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} minutes</li>
                <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}/10</li>
                <li class="list-group-item"><strong>IMDB:</strong> <a href="http://www.imdb.com/title/${movie.imdb_id}">${movie.title}</a></li>



                <li class="list-group-item"><strong>Overview</strong><br> ${movie.overview}</li>

              </ul>
            </div>
          </div>

          <div class="row">
            <div class="well">

            </div>
          </div>

      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
