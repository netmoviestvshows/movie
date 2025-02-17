angular
        .module("mtApp", [])
        .filter("duration", function () {
    return function (input) {
      // Konversi waktu dari menit ke format "jam:menit:detik"
      var hours = Math.floor(input / 60);
      var minutes = input % 60;
      var seconds = Math.floor(input / 60);

      // Tambahkan nol di depan jika diperlukan
      var formattedHours = (hours < 10) ? "0" + hours : hours;
      var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
      var formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

      return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    };
  })
        .controller("mtController", function ($scope, $http, $window) {
          var apiKey = "a79576e54c5bbb893011b98ca48f2460";
          var tvIdSeasonEpisode = getParameterByName("id");
          var tvIdParts = tvIdSeasonEpisode.split("-");
          var tvId = tvIdParts[0];
          var seasonNumber = parseInt(tvIdParts[1]);
          var episodeNumber = parseInt(tvIdParts[2]);

           // Variabel untuk menyimpan daftar musim TV
          $scope.seasons = []; 
           // Variabel untuk menyimpan daftar episode
          $scope.episodes = [];
          

if (!isNaN(seasonNumber) && !isNaN(episodeNumber)) {
            var episodeUrl =
              "https://api.themoviedb.org/3/tv/" +
              tvId +
              "/season/" +
              seasonNumber +
              "/episode/" +
              episodeNumber +
              "?language=en-US&api_key=" +
              apiKey;


            // Mendapatkan informasi seri TV dari API
            var tvSeriesUrl =
  "https://api.themoviedb.org/3/tv/" +
  tvId +
  "?language=en-US&api_key=" +
  apiKey;


            // Lakukan permintaan HTTP untuk mendapatkan informasi seri TV
            $http.get(tvSeriesUrl).then(
              function (tvSeriesResponse) {
                // Tampilkan informasi seri TV di kartu
                $scope.tvSeriesTitle = tvSeriesResponse.data.name;
                $scope.tvSeriesOverview = tvSeriesResponse.data.overview;
                $scope.tvSeriesStatus = tvSeriesResponse.data.status;
                $scope.tvSeriesBackdrop = tvSeriesResponse.data.backdrop_path;
                $scope.tvSeriesPoster = tvSeriesResponse.data.poster_path;
                $scope.tvSeriesType = tvSeriesResponse.data.type;
                $scope.tvSeriesVoteAverage = tvSeriesResponse.data.vote_average.toFixed(1);
                $scope.tvSeriesVoteCount = tvSeriesResponse.data.vote_count;
                $scope.tvSeriesFirstAirDate = tvSeriesResponse.data.first_air_date;
                $scope.tvSeriesLastAirDate = tvSeriesResponse.data.last_air_date;
                $scope.tvSeriesNumEpisode = tvSeriesResponse.data.number_of_episodes;
                $scope.tvSeriesNumSeason = tvSeriesResponse.data.number_of_seasons;
                $scope.tvSeriesGenre = tvSeriesResponse.data.genres
                  .map(function (genre) {
                    return genre.name;
                  })
                  .join(", ");
                $scope.tvSeriesCompanies =
                  tvSeriesResponse.data.production_companies
                    .map(function (production_companies) {
                      return production_companies.name;
                    })
                    .join(", ");
                $scope.tvSeriesTagline = tvSeriesResponse.data.tagline;
                $scope.tvSeriesNetworks = tvSeriesResponse.data.networks.map(function (network) {
                return {
                 name: network.name,
                logo_path: network.logo_path
                };
                });
                  $scope.tvSeriesCountry = tvSeriesResponse.data.production_countries.map(function (production_countries) {
                    return production_countries.name;
                  })
                  .join(", ");
                  $scope.tvSeriesCreator = tvSeriesResponse.data.created_by
  .map(function (creator) {
    return creator.name;
  })
  .join(", ");
  
 // Mengatur page title
 document.title = $scope.tvSeriesTitle + " - Season " + seasonNumber + " Episode " + episodeNumber;
  
  // similar TVSHOW
      $http.get(
  "https://api.themoviedb.org/3/tv/" + tvId + "/recommendations?language=en-US&page=1&api_key=" + apiKey
).then(
  function (response) {
    if (response.data && response.data.results) {
      $scope.tvRecommendations = response.data.results;
    } else {
      console.error('No TV recommendations available.');
    }
  },
  function (error) {
    console.error("Error fetching TV recommendations:", error);
  }
);
 
// AIRING Today
$http
  .get(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=" +
      apiKey
  )
  .then(function (response) {
    $scope.AiringToday = response.data.results;

    // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    var today = new Date().toISOString().slice(0, 10);

    // Loop untuk mendapatkan detail setiap show
    $scope.AiringToday.forEach(function (show) {
      // Panggil API untuk mendapatkan detail show termasuk season terakhir
      $http
        .get(
          "https://api.themoviedb.org/3/tv/" +
            show.id +
            "?language=en-US&api_key=" +
            apiKey
        )
        .then(function (showResponse) {
          var seasons = showResponse.data.seasons;
          var lastSeason = seasons[seasons.length - 1]; // Season terakhir

          // Simpan data season terakhir di AiringToday
          show.latestSeasonData = lastSeason;

          // Panggil API untuk mendapatkan semua episode di season terakhir
          $http
            .get(
              "https://api.themoviedb.org/3/tv/" +
                show.id +
                "/season/" +
                lastSeason.season_number +
                "?language=en-US&api_key=" +
                apiKey
            )
            .then(function (seasonResponse) {
              var episodes = seasonResponse.data.episodes;

              // Cari episode yang tayang hari ini
              var airingEpisode = episodes.find(function (episode) {
                return episode.air_date === today;
              });

              // Simpan data episode yang sedang tayang (jika ada)
              if (airingEpisode) {
                show.currentlyAiringEpisode = airingEpisode;
              }
            });
        });
    });
  });



   // ON THE AIR TV SHOW
// URL untuk mengambil acara TV yang sedang on air
const tvOnAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;

// Ambil acara TV yang sedang on air
$http
  .get(tvOnAirUrl)
  .then(function (response) {
    $scope.tvShowsOnAir = response.data.results.slice(0, 16); // Ambil 16 acara TV

    // Ambil informasi episode terbaru untuk setiap acara TV
    angular.forEach($scope.tvShowsOnAir, function (tvShow) {
      getLatestEpisodeData(tvShow.id);
    });
  })
  .catch(function (error) {
    console.error("Error fetching TV shows on air:", error);
  });

// Fungsi untuk mendapatkan data episode terakhir yang tayang
function getLatestEpisodeData(tvShowId) {
  var tvShowUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`;

  $http.get(tvShowUrl)
    .then(function (response) {
      // Mendapatkan data "Last Aired Episode"
      const lastAiredEpisode = response.data.last_episode_to_air;

      if (lastAiredEpisode) {
        // Tambahkan informasi episode terbaru yang sudah ditayangkan ke properti tvShow
        var tvShow = $scope.tvShowsOnAir.find(function (tv) {
          return tv.id === tvShowId;
        });
        tvShow.latestEpisodeData = {
          episode_number: lastAiredEpisode.episode_number,
          air_date: lastAiredEpisode.air_date,
          season_number: lastAiredEpisode.season_number,
          name: lastAiredEpisode.name,
        };
      } else {
        throw new Error('No last aired episode found for TV show with ID: ' + tvShowId);
      }
    })
    .catch(function (error) {
      console.error("Error fetching last aired episode data for TV show with ID " + tvShowId + ":", error);
    });
}

  // CAST
  var tvSeriesUrl =
  "https://api.themoviedb.org/3/tv/" +
  tvId +
  "/credits?language=en-US&api_key=" +
  apiKey;

$http.get(tvSeriesUrl).then(
  function (response) {
    // Periksa apakah 'cast' ada dalam respons
    if (response.data && response.data.cast) {
      // Data yang Anda terima adalah objek JSON dengan informasi pemain (cast) TV series
      $scope.cast = response.data.cast;
    } else {
      // 'cast' tidak ada dalam respons, berikan pesan kesalahan atau tangani secara tepat
      console.error('n/a.');
    }
  }
)

// informasi CREWS
var tvCrewUrl =
  "https://api.themoviedb.org/3/tv/" +
  tvId +
  "/credits?language=en-US&api_key=" +
  apiKey;

$http.get(tvCrewUrl).then(
  function (response) {
    if (response.data && response.data.crew) {
      $scope.crewMembers = response.data.crew;
    } else {
      console.error('Crew data not available.');
    }
  }
);


// Mengambil data gambar film dari API
$http
.get("https://api.themoviedb.org/3/tv/" + tvId + "/images?api_key=" + apiKey)
  .then(function (response) {
    $scope.tvImages = response.data.backdrops; 
    $scope.tvPoster = response.data.posters; 
  })
  .catch(function (error) {
    console.error("Error fetching tv images:", error);
    console.log($scope.getPosterUrl(image.file_path));
  });

// Alternative Titles
$scope.getAlternativeTitles = function () {
  $http
    .get("https://api.themoviedb.org/3/tv/" + tvId + "/alternative_titles?api_key=" + apiKey)
    .then(function (response) {
      $scope.alternativeTitles = response.data.results;
    })
    .catch(function (error) {
      console.error("Error fetching alternative titles:", error);
    });
};
$scope.getAlternativeTitles();


 // Mendapatkan informasi certification TV dari API
          var tvCertificationUrl =
            "https://api.themoviedb.org/3/tv/" +
            tvId +
            "?append_to_response=content_ratings&language=en-US&api_key=" +
            apiKey;

          // Lakukan permintaan HTTP untuk mendapatkan informasi certification TV
          $http.get(tvCertificationUrl).then(
            function (certificationResponse) {
              // Tampilkan certification TV di halaman
              if (
                certificationResponse.data &&
                certificationResponse.data.content_ratings &&
                certificationResponse.data.content_ratings.results
              ) {
                var contentRatings = certificationResponse.data.content_ratings.results;
                var tvCertifications = contentRatings.filter(function (rating) {
                  return rating.iso_3166_1 === "US"; // Ubah sesuai dengan kode negara yang Anda butuhkan
                });

                if (tvCertifications.length > 0) {
                  $scope.tvSeriesCertification = tvCertifications[0].rating;
                } else {
                  $scope.tvSeriesCertification = "n/a"; // Atur pesan default jika tidak ada certification TV yang tersedia
                }
              } else {
                $scope.tvSeriesCertification = "n/a"; // Atur pesan default jika tidak ada data certification TV
              }
            },
            function (error) {
              console.error("Error fetching TV certification:", error);
            }
          );

             // Mengatur Open Graph Meta Tags
          setMetaTag("og:title", $scope.tvSeriesTitle);
          setMetaTag("og:description", $scope.tvSeriesOverview);
          setMetaTag("og:image", "https://image.tmdb.org/t/p/w500/" + $scope.tvSeriesBackdrop);
          setMetaTag("og:url", $window.location.href);

          // Mengatur Twitter Meta Tags
          setMetaTag("twitter:card", "summary_large_image");
          setMetaTag("twitter:title", $scope.tvSeriesTitle);
          setMetaTag("twitter:description", $scope.tvSeriesOverview);
          setMetaTag("twitter:image", "https://image.tmdb.org/t/p/w500/" + $scope.tvSeriesPoster);

      }, function (error) {
          console.error("Error fetching TV series detail:", error);
      });

      
            // Mendapatkan informasi dari Season TV dari API
            var tvSeasonUrl =
              "https://api.themoviedb.org/3/tv/" +
              tvId +
              "/season/" +
              seasonNumber +
              "?language=en-US&api_key=" +
              apiKey;

            // Lakukan permintaan HTTP untuk mendapatkan informasi musim TV
            $http.get(tvSeasonUrl).then(
              function (tvSeasonResponse) {
                // Tampilkan poster musim TV di halaman
                $scope.tvSeasonPosterPath = tvSeasonResponse.data.poster_path;
                $scope.tvSeasonAirDate = tvSeasonResponse.data.air_date;
                $scope.tvSeasonNumEpisodes = tvSeasonResponse.data.episodes.length;
              },
              function (error) {
                console.error("Error fetching TV season detail:", error);
              }
            );

            $scope.searchMediaType = "movie"; // Set jenis pencarian default ke "Movie"

            // Tambahkan fungsi pencarian
            $scope.search = function () {
              var searchQuery = $scope.searchQuery;
              var searchMediaType = $scope.searchMediaType; // Simpan jenis media dalam variabel

              if (searchQuery) {
                var apiUrl = `https://api.themoviedb.org/3/search/${searchMediaType}?api_key=${apiKey}&query=${searchQuery}`;

                // Lakukan permintaan HTTP untuk mencari data
                $http
                  .get(apiUrl)
                  .then(function (response) {
                    $scope.searchResults = response.data.results;

                    // Jika tidak ada hasil, tampilkan pesan
                    if ($scope.searchResults.length === 0) {
                      $scope.searchResults = [
                        { title: "Tidak ada hasil yang ditemukan" },
                      ];
                    }
                  })
                  .catch(function (error) {
                    console.error("Error fetching search results:", error);
                  })
                  .finally(function () {
                    $scope.searchQuery = ""; // Hapus isi kotak pencarian setelah pencarian selesai
                  });
              } else {
                // Jika kotak pencarian kosong, hapus hasil pencarian
                $scope.searchResults = [];
              }
            };

             // MENAMPILKAN SEASON LIST TV
            var seasonsUrl =
              "https://api.themoviedb.org/3/tv/" +
              tvId +
              "?append_to_response=seasons&language=en-US&api_key=" +
              apiKey;
            $http.get(seasonsUrl).then(
              function (seasonsResponse) {
                // Periksa apakah 'seasons' ada dalam respons
                if (seasonsResponse.data && seasonsResponse.data.seasons) {
                  // Data yang Anda terima adalah daftar musim TV
                  $scope.seasons = seasonsResponse.data.seasons;
                } else {
                  // 'seasons' tidak ada dalam respons, berikan pesan kesalahan atau tangani secara tepat
                  console.error('season n/a.');
                }
              },
              function (error) {
                console.error("Error fetching TV seasons:", error);
              }
            );
             // MENAMPILKAN SEASON LIST TV END

              // MENAMPILKAN EPISODE LIST TV
            var episodesUrl =
              "https://api.themoviedb.org/3/tv/" +
              tvId +
              "/season/" +
              seasonNumber +
              "?language=en-US&api_key=" +
              apiKey;

          
            $http.get(episodesUrl).then(
              function (episodesResponse) {
               
                if (episodesResponse.data && episodesResponse.data.episodes) {
                 
                  $scope.episodes = episodesResponse.data.episodes;
                } else {
                
                  console.error('eps n/a.');
                }
              },
              function (error) {
                console.error("Error fetching TV episodes:", error);
              }
            );
          // MENAMPILKAN EPISODE LIST TV END

            // Fungsi untuk mengarahkan pengguna ke halaman yang sesuai
            $scope.goToMediaDetail = function (media) {
              if ($scope.searchMediaType === "movie") {
                $window.location.href = "movie.html?id=" + media.id;
              } else if ($scope.searchMediaType === "tv") {
                $window.location.href = "tv.html?id=" + media.id;
              }
            };

            $http.get(episodeUrl).then(
              function (episodeResponse) {
                $scope.episode = episodeResponse.data;
              },
              function (error) {
                console.error("Error fetching episode detail:", error);
              }
            );
         // Fungsi untuk menambahkan atau memperbarui meta tag
      function setMetaTag(property, content) {
        var element = document.querySelector("meta[property='" + property + "']") || document.createElement('meta');
        element.setAttribute("property", property);
        element.setAttribute("content", content);
        document.getElementsByTagName('head')[0].appendChild(element);
    }

} else {
    console.error("Invalid seasonNumber or episodeNumber");
}


          $scope.getBackdropUrl = function (backdropPath) {
            return backdropPath
              ? "https://image.tmdb.org/t/p/w300/" + backdropPath
              : "https://sportxyou.github.io/movie-tv/img/nobackdrop.jpg";
          };

           $scope.getStillUrl = function (stillPath) {
            return stillPath
              ? "https://image.tmdb.org/t/p/w300/" + stillPath
              : "https://sportxyou.github.io/movie-tv/img/nobackdrop.jpg";
          };

          $scope.getPosterUrl = function (posterPath) {
            return posterPath
              ? "https://image.tmdb.org/t/p/w300/" + posterPath
              : "https://sportxyou.github.io/movie-tv/img/noposter.jpg";
          };

          $scope.getProfilUrl = function (profilPath) {
            return profilPath
              ? "https://image.tmdb.org/t/p/w300/" + profilPath
              : "https://sportxyou.github.io/movie-tv/img/noprofile.jpg";
          };

         function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Format date
$scope.formatDate = function (inputDate) {
  if (inputDate) {
    var parts = inputDate.split("-");
    var dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var monthName = monthNames[dateObj.getMonth()];
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var formattedDate = monthName + " " + day + ", " + year;
    return formattedDate;
  } else {
    return "Date not available";
  }
};


// Fungsi untuk memperbarui URL parameter SEASON yang dipilih
$scope.updateSeasonParameter = function (selectedSeason) {
  if (selectedSeason && selectedSeason.season_number) {
    var tvIdSeasonEpisode = getParameterByName("id");
    var tvIdParts = tvIdSeasonEpisode.split("-");
    var tvId = tvIdParts[0];
    var episodeNumber = parseInt(tvIdParts[2]);
    var tvShowName = $scope.tvSeriesTitle.replace(/ /g, "-");
    var updatedUrl = `/p/tv.html?id=${tvId}`;
    $window.location.href = updatedUrl;
  } else {
    console.error("Season or season_number is not available.");
  }
};

// Fungsi untuk memperbarui URL parameter EPISODE yang dipilih
$scope.updateEpisodeParameter = function (selectedEpisode) {
  var episodeNumber = selectedEpisode.episode_number;
  var tvShowName = $scope.tvSeriesTitle.replace(/ /g, "-"); // 
  var updatedUrl = `/p/tvshow.html?id=${tvId}-${seasonNumber}-${episodeNumber}/${tvShowName}`;
  $window.location.href = updatedUrl;
};

// Fungsi untuk memperbarui URL parameter episode
function updateUrlParameter(key, value) {
  var url = $window.location.href;
  var regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = url.indexOf("?") !== -1 ? "&" : "?";
  if (url.match(regex)) {
    return url.replace(regex, "$1" + key + "=" + value + "$2");
  } else {
    return url + separator + key + "=" + value;
  }
}
 $scope.goToTvDetail = function (tvId) {
  $window.location.href = "/p/tv.html?id=" + tvId;
   };
            
});
