

$(document).ready(function () {


      var apiKey = "d3694056d3f695b5cee87388c26b9e69";

      getPopularMovies(apiKey)

      $("#searchMovieBtn").click(function (event) {

            // Nollställer movie-result när ny sökning görs.
            $(".movie-result").html("");

            // Sparar användarens sökinformation.
            var movieTitle = $("#movieInput").val();
            var movieOrSerie = $("#searchDropbox").val()

            //Gör sökning och visar data.
            searchMovieOrSerieByQuery(movieOrSerie, movieTitle, apiKey);

            event.preventDefault();
      });

      $(".movie-result").on('click', '.info-button', function () {

            var mediaID = $(this).attr("data-movieID");
            var mediaType = $(this).attr("data-mediaType");

            renderOverviewItem(mediaID, mediaType, apiKey);
      });

      $(".movie-result").on('click', '.known-for-item a', function (event) {
            var mediaID = $(this).attr("data-movieID");
            var mediaType = $(this).attr("data-mediaType");

            renderOverviewItem(mediaID, mediaType, apiKey);

            event.preventDefault();
      });

      // Hämta och rendera personen användare tryckt på. 
      $(".movie-result").on('click', '.media-actor a', function (event) {
            event.preventDefault();

            var personID = $(this).attr("data-personID");

            renderPersonProfile(personID, apiKey);
      });
});