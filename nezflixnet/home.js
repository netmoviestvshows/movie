angular
        .module("mtApp", [])
        .controller("mtController", function ($scope, $http, $window, $location) {
          $http
            .get(
              "https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=" +
                apiKey
            )
            .then(function (response) {
              $scope.trendingData = response.data.results;
            });
    
          var nowPlayingUrl =
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=" +
            apiKey;
          var tvOnAirUrl =
            "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=" +
            apiKey;
    
          $http
            .get(nowPlayingUrl)
            .then(function (response) {
              $scope.nowPlayingMovies = response.data.results.slice(0, 16);
            })
            .catch(function (error) {
              console.error("Error fetching now playing movies:", error);
            });
    
          $scope.goToMovieDetail = function (movieId, movieTitle) {
            if (movieTitle) {
              // Mengganti spasi dengan tanda hubung (dash) dan menghilangkan tanda ":"
              movieTitle = movieTitle
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/:/g, "");
              $window.location.href = `/p/movie.html?id=${movieId}/${movieTitle}`;
            } else {
              $window.location.href = `/p/movie.html?id=${movieId}`;
            }
          };
    
          $scope.searchMediaType = "movie"; // Set jenis pencarian default ke "Movie"
    
          // Tambahkan fungsi pencarian
          $scope.search = function () {
            var searchQuery = $scope.searchQuery;
            var searchMediaType = $scope.searchMediaType; // Simpan jenis media dalam variabel
    
            if (searchQuery) {
              var apiUrl = `https://api.themoviedb.org/3/search/${searchMediaType}?api_key=${apiKey}&query=${searchQuery}`;
    
              // Lakukan permintaan HTTP untuk mencarxi data
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
    
          // Fungsi untuk mengarahkan pengguna ke halaman yang sesuai pada pencarian
          $scope.goToMediaDetail = function (media, additionalInfo) {
            var additionalInfo = media.title || media.name;
            additionalInfo = additionalInfo.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            additionalInfo = encodeURIComponent(additionalInfo);
            if ($scope.searchMediaType === "movie") {
              $window.location.href = `/p/movie.html?id=${media.id}/${additionalInfo}`;
            } else if ($scope.searchMediaType === "tv") {
              $window.location.href = `/p/tv.html?id=${media.id}/${additionalInfo}`;
            }
          };
    
          $http
            .get(tvOnAirUrl)
            .then(function (response) {
              $scope.tvShowsOnAir = response.data.results.slice(0, 16);
    
              // Ambil informasi episode terbaru untuk setiap acara TV
              angular.forEach($scope.tvShowsOnAir, function (tvShow) {
                getLatestEpisodeData(tvShow.id);
              });
            })
            .catch(function (error) {
              console.error("Error fetching TV shows on air:", error);
            });
    
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
    
          // Memperbarui fungsi untuk menambahkan judul dalam URL
          $scope.goToTvDetail = function (tvId, tvTitle) {
            if (tvTitle) {
              // Mengubah judul menjadi format yang aman untuk URL
              tvTitle = tvTitle
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/:/g, "");
              $window.location.href = `/p/tv.html?id=${tvId}/${tvTitle}`;
            } else {
              $window.location.href = `/p/tv.html?id=${tvId}`;
            }
          };
    
    $scope.getMediaUrl = function(media) {
  if (media.media_type === 'movie') {
    var title = media.title ? media.title.toLowerCase().replace(/\s+/g, "-").replace(/:/g, "") : '';
    return `/p/movie.html?id=${media.id}/${title}`;
  } else if (media.media_type === 'tv') {
    var name = media.name ? media.name.toLowerCase().replace(/\s+/g, "-").replace(/:/g, "") : '';
    return `/p/tv.html?id=${media.id}/${name}`;
  }
  return '#'; // Return a fallback URL or empty string if media type is unknown
};

$scope.getMovieUrl = function(movie) {
  var title = movie.title ? movie.title.toLowerCase().replace(/\s+/g, "-").replace(/:/g, "") : '';
  return `/p/movie.html?id=${movie.id}/${title}`;
};

$scope.getTvUrl = function(tvShow) {
  var name = tvShow.name ? tvShow.name.toLowerCase().replace(/\s+/g, "-").replace(/:/g, "") : '';
  return `/p/tv.html?id=${tvShow.id}/${name}`;
};


          $scope.getPosterUrl = function (posterPath) {
            return posterPath
              ? "https://image.tmdb.org/t/p/w300/" + posterPath
              : "https://sportxyou.github.io/movie-tv/img/noposter.jpg";
          };
    
          // Fungsi untuk mengambil parameter dari URL
          function getUrlParameters() {
            var params = {};
            var urlParams = $location.search();
            for (var key in urlParams) {
              params[key] = urlParams[key];
            }
            return params;
          }
    
          var params = getUrlParameters();
          var movieId = params.id;
          var additionalInfo = params.additionalInfo;
        });
