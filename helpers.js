var ajaxLoaderObj = {
      loader: '<div class="ajax-loader"></div>',
      container: $(".movie-result")
}

function searchMovieOrSerieByQuery(type, title, apiKey) {

      var settings = {};

      settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/search/" + type + "?include_adult=false&page=1&query=" + title + "&language=en-US&api_key=" + apiKey,
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            if (response.results == 0) {
                  $.alert(
                        {
                              title: 'Alert!',
                              content: 'Sorry we couldent find that ' + type,
                        });
            }

            for (var i = 0; i < response.results.length; i++) {

                  getMediaByID(response.results[i].id, type, apiKey);

            }
            $(".jconfirm-box-container").addClass("offset-md-4");
      });
}

function getMediaByID(itemID, type, apiKey) {
      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/' + type + '/' + itemID + '?api_key=' + apiKey + '&language=en-US',
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {
            var mediaObj = {};

            // Skapar ett object med media informationen
            mediaObj = {
                  id: response.id,
                  type: type,
                  image: infoCheck(createImageUrl(response.poster_path, "w300")),
                  rating: infoCheck(response.vote_average),
                  genres: infoCheck(jQuery.trim(getGenresFromMediaID(response.genres)).substring(0, 25).split(" ").slice(0, -1).join(" ") + "..."),
                  overview: infoCheck(jQuery.trim(response.overview).substring(0, 100)
                        .split(" ").slice(0, -1).join(" ") + "...")
            }

            if (type === "movie") {
                  mediaObj.title = infoCheck(jQuery.trim(response.title).substring(0, 20) + "...");
                  mediaObj.release_date = infoCheck(jQuery.trim(response.release_date).substring(0, 4));
            }
            else if (type === "tv") {
                  mediaObj.title = response.name;
                  mediaObj.release_date = jQuery.trim(response.first_air_date).substring(0, 4);
            }

            if (!response.backdrop_path) {
                  mediaObj.image = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
            }

            // Adderar rows beoende på vilken användare har skärmupplösning
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
            // Skickar media objektet till en funktion som bygger ett html element med den och renderar det till DOM
            $(".movieItems-row").last().append(createMediaItem(mediaObj));
      });
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

function getMovieCrew(movieID, type) {

      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/' + type + '/' + movieID + '/credits?api_key=d3694056d3f695b5cee87388c26b9e69',
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
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

function renderOverviewItem(mediaID, type, apiKey) {


      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/' + type + '/' + mediaID + '?api_key=' + apiKey + '&language=en-US',
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            var mediaItem = {};

            var mediaItem = {
                  id: response.id,
                  image: infoCheck(createImageUrl(response.poster_path, "w300")),
                  rating: infoCheck(response.vote_average),
                  overview: infoCheck(response.overview)
            }

            if (type === "movie") {
                  mediaItem.title = response.title;
                  mediaItem.release_date = response.release_date;
            }
            else if (type === "tv") {
                  mediaItem.title = infoCheck(response.name);
                  mediaItem.release_date = infoCheck(response.first_air_date);
            }

            // Hämta och rendera den valda filmen.
            createOverviewItem(mediaItem);
            // Hämta och rendera medverkande till filmen.
            getMovieCrew(mediaItem.id, type);
      });
}

function renderCredits(fullname, character, personID) {
      var htmlString = "";

      htmlString += '<div class="media-actor col-sm-4"><p><a href="" data-personID="' + personID + '">' + fullname + '</a></p><p class="media-people-title">' + character + '</p></div>';

      $(".media-actors").append(htmlString);
};

function renderPersonProfile(personID, apiKey) {

      $(".movie-result").html("");

      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/person/' + personID + '?language=en-US&api_key=' + apiKey,
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            personObj = {
                  id: infoCheck(response.id),
                  name: infoCheck(response.name),
                  biography: infoCheck(response.biography),
                  birthday: infoCheck(response.birthday),
                  gender: response.gender,
                  homepage: infoCheck(response.homepage),
                  place_of_birth: infoCheck(response.place_of_birth),
                  image: createImageUrl(response.profile_path, "w300"),

            }

            if (response.gender == 2) { personObj.gender = "Male"; }
            else if (response.gender == 0) { personObj.gender = "Female"; }
            else { personObj.gender = "Not found" }

            createPersonProfile(personObj, apiKey);
      });
}

function renderPersonProfileMoviesAndTVShows(personID, apiKey) {

      var htmlString = "";

      var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://api.themoviedb.org/3/person/' + personID + '/combined_credits?language=en-US&api_key=' + apiKey,
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {

            var title = ""

            for (var i = 0; i < response.cast.length; i++) {

                  if (response.cast[i].media_type === "tv") {
                        title = response.cast[i].name
                  }
                  else if (response.cast[i].media_type === "movie") {
                        title = response.cast[i].title
                  }

                  htmlString += '<div class="known-for-item col-xs-12 col-sm-4 col-md-3"><div class="image"><img src="' + createImageUrl(response.cast[i].poster_path, "w300") + '" alt=""></div><a href="" data-movieID="' + response.cast[i].id + '" data-mediaType="' + response.cast[i].media_type + '">' + title + '</a></div>';
            }
            $("#known-for-container").append(htmlString);
      });
}

function getPopularMovies(apiKey) {
      var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=" + apiKey,
            "beforeSend": function () {
                  ajaxLoaderObj.container.append(ajaxLoaderObj.loader);
                  $("#movie-section").addClass("ajax-load-fix");
            },
            "success": function () {
                  ajaxLoaderObj.container.find($(".ajax-loader").remove());
                  $("#movie-section").removeClass("ajax-load-fix");
            },
            "method": "GET",
            "headers": {},
            "data": "{}"
      }

      $.ajax(settings).done(function (response) {
            var htmlString = "";
            var moviePosters = response.results.map(e => e.poster_path);

            // Set first slider startpage slider item
            $(".carousel-item img").first().attr("src", createImageUrl(moviePosters[0], "w780"));

            for (var i = 1; i < moviePosters.length; i++) {
                  htmlString = '<div class="carousel-item"><img class="d-block img-fluid" src="' + createImageUrl(moviePosters[i], "w780") + '" alt="First slide"></div>'
                  $(".carousel-inner").append(htmlString);
            }
      });
}

function createMediaItem(mediaObj) {

      var htmlstring = "";

      htmlstring += '<div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 movieItem">' +
            '<div class="col-xs-8  movie-image">' +
            '<img src="' + mediaObj.image + '">' +
            '</div>' +
            '<div class="col-xs-12  info">' +
            '<p class="info-head">' +
            '<a href="#" class=" info-title title" data-Id="' + mediaObj.id + '" data-type="' + mediaObj.type + '">' + mediaObj.title + '</a>' +
            '<span class="rating">' + mediaObj.rating + '<i class="fa fa-star fa-md" aria-hidden="true"></i></span></p>' +
            '<p class="meta">' +
            '<span class="genres">' + mediaObj.genres + '</span>' +
            '<span class="release_date">' + mediaObj.release_date + '<i class="fa fa-calendar fa-md" aria-hidden="true"></i></span>' +
            '</p>' +
            '<p class="overview">' + mediaObj.overview + '</p>' +
            '<p class="view-more">' +
            '<a href="#" class="info-button" data-movieID="' + mediaObj.id + '" data-mediaType="' + mediaObj.type + '" title="' + mediaObj.title + '" alt=" ' + mediaObj.title + '">More Information </a>' +
            '</p></div></div>';
      return htmlstring;
}

function createOverviewItem(mediaObj) {

      $(".movie-result").html("");

      var htmlString = "";

      htmlString += '<div id="media-overview-item" class="row">' +
            '<div class="media-cover-container col-xs-12 col-lg-5">' +
            '<img src="' + mediaObj.image + '" alt="">' +
            '</div>' +
            '<div class="media-information-container col-xs-12 col-lg-7">' +
            '<div class="media-title row">' +
            '<h2>' + mediaObj.title + '<span>(' + mediaObj.release_date + ')</span></h2>' +
            '<div class="media-rating"><i class="fa fa-star fa-md" aria-hidden="true"></i><span>' + mediaObj.rating + '</span></div>' +
            '<div class="overview">' +
            '<h3>Overview</h3>' +
            '<div class="overview"><p>' + mediaObj.overview + '</p></div>' +
            '</div></div></div><div class="row features-row">' +
            '<h3>Featured people</h3>' +
            '<div class="media-actors row"></div></div></div>';

      $(".movie-result").append(htmlString);
}

function createPersonProfile(personObj, apiKey) {

      var htmlString = "";

      htmlString = '<div id="media-overview-item" class="row"><div class="media-cover-container col-sm-4">' +
            '<img src="' + personObj.image + '" alt=""></div>' +
            '<div class="media-information-container col-sm-8"><div class="media-title row">' +
            '<h2><a href="">' + personObj.name + '</a></h2></div>' +
            '<div class="overview"><h3>Biography</h3><div class="biography">' +
            '<p>' + personObj.biography + '</p></div></div></div>' +
            '<section id="person-details-container" class=" col-sm-12 "><h3>Personal information</h3><section class="person-information row">' +
            '<p class="offset-sm-3 col-sm-4 offset-md-2 col-md-2"><strong>Gender<br></strong>' + personObj.gender + '</p>' +
            '<p class="col-sm-3 col-md-2"><strong>BirthDay<br></strong>' + personObj.birthday + '</p>' +
            '<p class="offset-sm-3 col-sm-4 offset-md-0 col-md-2"><strong>Place of Birth<br></strong>' + personObj.place_of_birth + '</p>' +
            '<p class="col-sm-4 col-md-2"><strong>Official Site<br></strong>' + personObj.homepage + '</p>' +
            '</section><h3>Known for</h3>' +
            '<div id="known-for-container" class="row" ></div></section></div>';

      $(".movie-result").append(htmlString);
      renderPersonProfileMoviesAndTVShows(personObj.id, apiKey);

}

function createImageUrl(imagePath, imageSize) {
      /*
      IMAGE SIZE ALTERNATIVES
            "w300",
            "w780",
            "w1280",
            "original"
      
      */
      var imageURL = "";

      imageURL = 'https://image.tmdb.org/t/p/' + imageSize + '/' + imagePath;

      if (imagePath == null) {
            imageURL = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
      }

      return imageURL;
}

function infoCheck(input) {
      var result = "";
      if (input == null || input == "" || input == "...") {
            result = "Not found";
      }
      else {
            result = input;
      }
      return result;
}
