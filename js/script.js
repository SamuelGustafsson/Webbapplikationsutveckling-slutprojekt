

$(document).ready(function () {
      var apiKey = "d3694056d3f695b5cee87388c26b9e69";

      createOverviewItem("https://image.tmdb.org/t/p/w300//xkptUwXpjvEXEpiPbmneEeNWT3x.jpg", "Batman", "2017", "6.9", "The Dynamic Duo faces four super-villains who plan to hold the world for ransom with the help of a secret invention that instantly dehydrates people.");
      getMovieCrew(18734)

      getPopularMovies(apiKey);

      $("#searchMovieBtn").click(function (event) {

            $(".movie-result").html("");

            var movieTitle = $("#movieInput").val();
            var movieOrSerie = $("#searchDropbox").val()

            searchMovieOrSerieByQuery(movieOrSerie, movieTitle, apiKey);

            event.preventDefault();
      });

      $(".movie-result").on('click', '.info-button', function () {
            var movieID = "";
            var movieID = $(this).attr("data-movieID");

            var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": 'https://api.themoviedb.org/3/movie/' + movieID + '?language=en-US&api_key=d3694056d3f695b5cee87388c26b9e69',
                  "method": "GET",
                  "headers": {},
                  "data": "{}"
            }

            $.ajax(settings).done(function (response) {
                  createOverviewItem(getImageURL(response.poster_path, "w300"), response.title, response.release_date, response.vote_average, response.overview)
                  getMovieCrew(response.id);
                  console.log(response.id);
            });
      });

      $(".movie-result").on('click', '.media-actor a', function (event) {

            $(".movie-result").html("");

            event.preventDefault();
            var personID = $(this).attr("data-personID");

            var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": 'https://api.themoviedb.org/3/person/' + personID + '?language=en-US&api_key=' + apiKey,
                  "method": "GET",
                  "headers": {},
                  "data": "{}"
            }

            $.ajax(settings).done(function (response) {

                  renderPersonProfile(
                        response.name,
                        response.biography,
                        response.birthday,
                        response.gender,
                        response.homepage,
                        response.place_of_birth,
                        getImageURL(response.profile_path, "w300"),
                        response.id,
                        apiKey);
            });
      });
});