
function searchMovieOrSerieByQuery(type, title, apiKey, id) {

      var settings = {};

      if (type === "movie" || type === "tv") {

            settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "https://api.themoviedb.org/3/search/" + type + "?include_adult=false&page=1&query=" + title + "&language=en-US&api_key=" + apiKey,
                  "method": "GET",
                  "headers": {},
                  "data": "{}"
            }
      }

      else {
            alert("Something happend you have to choose movie or serie!")
      }

      $.ajax(settings).done(function (response) {
            renderMediaObjects(response, type);
      });
}

function renderMediaObjects(MovieObject, type) {
      for (var i = 0; i < MovieObject.results.length; i++) {

            getMovieByID(MovieObject.results[i].id, type, "d3694056d3f695b5cee87388c26b9e69");

      }
}

function getMovieByID(movieID, type, apiKey) {
      var obj = {};
      var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey + "&language=en-US",
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            var moviePoster = getImageURL(response.poster_path, "w300");
            if (!response.backdrop_path) {
                  moviePoster = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
            }

            var movieTitle = response.title;
            var movieRating = response.vote_average;
            var movieGenres = jQuery.trim(getGenresFromMediaID(response.genres)).substring(0, 25)
                  .split(" ").slice(0, -1).join(" ") + "...";

            var movieReleaseDate = response.release_date;
            var movieOverview = jQuery.trim(response.overview).substring(0, 100)
                  .split(" ").slice(0, -1).join(" ") + "...";

            var windowWidth = $(window).width();

            if (windowWidth > 1199) {
                  if ($(".movieItems-row").length < 1) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }

                  if ($(".movieItems-row").last().children().length >= 4
                  ) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }
            }
            else if (windowWidth > 991) {
                  if ($(".movieItems-row").length < 1) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }

                  if ($(".movieItems-row").last().children().length >= 3) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }
            }

            else {
                  if ($(".movieItems-row").length < 1) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }

                  if ($(".movieItems-row").last().children().length >= 2) {
                        $(".movie-result").append('<div class="row movieItems-row"></div>')
                  }
            }

            $(".movieItems-row").last().append(createMediaItem(moviePoster, movieTitle, movieRating, movieGenres, movieReleaseDate, movieOverview, movieID));
      });
}

function createMediaItem(imageURL, title, rating, genres, releaseDate, decription, movieID) {

      var htmlstring = "";

      htmlstring += '<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 movieItem">' +
            '<div class="col-xs-8  movie-image">' +
            '<img src="' + imageURL + '">' +
            '</div>' +
            '<div class="col-xs-12  info">' +
            '<p class="info-head">' +
            '<a href="#" class="title">' + title + '</a>' +
            '<span class="rating">' + rating + '<i class="fa fa-star fa-md" aria-hidden="true"></i></span></p>' +
            '<p class="meta">' +
            '<span class="genres">' + genres + '</span>' +
            '<span class="release_date">' + releaseDate + '<i class="fa fa-calendar fa-md" aria-hidden="true"></i></span>' +
            '</p>' +
            '<p class="overview">' + decription + '</p>' +
            '<p class="view-more">' +
            '<a href="#" class="info-button" data-movieID="' + movieID + '" title="' + title + '" alt=" ' + title + '">More Information </a>' +
            '</p></div></div>';
      return htmlstring;
}

function createOverviewItem(imageURL, title, releaseDate, rating, overview) {

      $(".movie-result").html("");

      var htmlString = "";

      htmlString += '<div id="media-overview-item" class="row">' + 
                           '<div class="media-cover-container col-xs-12 col-lg-5">' +
                           '<img src="' + imageURL + '" alt="">' + 
                           '</div>' +
                           '<div class="media-information-container col-xs-12 col-lg-7">' +
                           '<div class="media-title row">' +
                           '<h2><a href="">' + title + '</a><span>(' + releaseDate + ')</span></h2>' +
                           '<div class="media-rating"><i class="fa fa-star fa-md" aria-hidden="true"></i><span>' + rating + '</span></div>' +
                           '<div class="overview">' +
                           '<h3>Overview</h3>' +
                           '<div class="overview"><p>' + overview + '</p></div>' +
                           '</div></div></div><div class="row features-row">' +
                           '<h3>Featured people</h3>' +
                           '<div class="media-actors row"></div></div></div>';

      $(".movie-result").append(htmlString);


}

function getImageURL(imagePath, imageSize) {
      /*
      IMAGE SIZE ALTERNATIVES
            "w300",
            "w780",
            "w1280",
            "original"
      
      */
      var imageURL = "";

      imageURL = 'https://image.tmdb.org/t/p/' + imageSize + '/' + imagePath;

      return imageURL;
}

function getGenresFromMediaID(array) {
      var genresString = "";
      for (var i = 0; i < array.length; i++) {

            if (i == array.length - 1) {
                  genresString += array[i].name + " ";
            }
            else {
                  genresString += array[i].name + ", ";
            }
      }

      return genresString

}

function getMoviesOnCinema() {
      settings = {
            "async": true,
            "crossDomain": true,
            "url": " https://api.themoviedb.org/3/movie/now_playing?api_key=d3694056d3f695b5cee87388c26b9e69&language=en-US&page=1&region=SE",
            "method": "GET",
            "headers": {},
            "data": "{}"
      }
      $.ajax(settings).done(function (response) {
            getPosters(response)
      });

}

function getPosters(movieObject) {
      var posterArr = [];

      for (var i = 0; i < movieObject.results.length; i++) {

            if (movieObject.results[i].poster_path) {
                  posterArr.push(getImageURL(movieObject.results[i].poster_path, "original"));
            }
      }
      return posterArr;
}

function getMovieCrew(movieID) {

      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/movie/' + movieID + '/credits?api_key=d3694056d3f695b5cee87388c26b9e69',
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            for (actor in response.cast) {
                  renderCredits(response.cast[actor].name, response.cast[actor].character, response.cast[actor].id);
            }
      });
}

function renderCredits(fullname, character, personID) {
      var htmlString = "";

      htmlString += '<div class="media-actor col-sm-4"><p><a href="" data-personID="' + personID + '">' + fullname + '</a></p><p class="media-people-title">' + character + '</p></div>';

      $(".media-actors").append(htmlString);
};

function renderPersonProfile(name, biography, birthday, gender, homepage, placeOfBirth, imagePath, personID, apiKey) {
      var genderType;

      if (gender = 2) { genderType = "Male"; }
      else if (gender == 1) { genderType = "Female"; }
      else { genderType = "Not found" }
      htmlString = "";

      htmlString = '<div id="media-overview-item" class="row"><div class="media-cover-container col-sm-4">' +
            '<img src="' + imagePath + '" alt=""></div>' +
            '<div class="media-information-container col-sm-8"><div class="media-title row">' +
            '<h2><a href="">' + name + '</a></h2></div>' +
            '<div class="overview"><h3>Biography</h3><div class="biography">' +
            '<p>' + biography + '</p></div></div></div>' +
            '<section id="person-details-container" class=" col-sm-12 "><h3>Personal information</h3><section class="person-information row">' +
            '<p class="offset-sm-3 col-sm-4 offset-md-2 col-md-2"><strong>Gender<br></strong>' + genderType + '</p>' +
            '<p class="col-sm-3 col-md-2"><strong>BirthDay<br></strong>' + birthday + '</p>' +
            '<p class="offset-sm-2 col-sm-4 offset-md-0 col-md-2"><strong>Place of Birth<br></strong>' + placeOfBirth + '</p>' +
            '<p class="col-sm-4 col-md-2"><strong>Official Site<br></strong>' + homepage + '</p>' +
            '</section><h3>Known for</h3>' +
            '<div id="known-for-container" class="row" ></div></section></div>';

      $(".movie-result").append(htmlString);
      renderPersonProfileMoviesAndTVShows(personID, apiKey);

}

function renderPersonProfileMoviesAndTVShows(personID, apiKey) {

      var htmlString = "";

      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/person/' + personID + '/combined_credits?language=en-US&api_key=' + apiKey,
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            for (var i = 0; i < response.cast.length; i++) {

                  htmlString += '<div class="known-for-item col-xs-12 col-sm-4 col-md-3"><div class="image"><img src="' + getImageURL(response.cast[i].poster_path, "w300") + '" alt=""></div><a href="">' + response.cast[i].title + '</a></div>';
            }
            $("#known-for-container").append(htmlString);
      });
}

function getPopularMovies(apiKey) {
      var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=" + apiKey,
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {
            var htmlString = "";
            var moviePosters = response.results.map(e => e.poster_path);

            // Set first slider startpage slider item
            $(".carousel-item img").first().attr("src", getImageURL(moviePosters[0], "w780"));

            for (var i = 1; i < moviePosters.length; i++) {
                  htmlString = '<div class="carousel-item"><img class="d-block img-fluid" src="' + getImageURL(moviePosters[i], "w780") + '" alt="First slide"></div>'
                  $(".carousel-inner").append(htmlString);
            }

            console.log(moviePosters);
      });
}
