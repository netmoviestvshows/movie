angular
  .module("mtApp", [])
  .filter("duration", function () {
    return function (input) {
      // Konversi waktu dari menit ke format "jam:menit:detik"
      var hours = Math.floor(input / 60);
      var minutes = input % 60;
      var seconds = Math.floor(input / 60);

      // Tambahkan nol di depan jika diperlukan
      var formattedHours = hours < 10 ? "0" + hours : hours;
      var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      return (
        formattedHours + ":" + formattedMinutes + ":" + formattedSeconds
      );
    };
  })
  .controller("mtController", function ($scope, $http, $window) {
    var tvId = getParameterByName("id");

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
              $scope.searchResults = [{ title: "n/a" }];
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

    // Fungsi untuk mengarahkan pengguna ke halaman yang sesuai
    $scope.goToMediaDetail = function (media) {
      if ($scope.searchMediaType === "movie") {
        $window.location.href = "movie.html?id=" + media.id;
      } else if ($scope.searchMediaType === "tv") {
        $window.location.href = "tv.html?id=" + media.id;
      }
    };

    // Fungsi untuk memperbarui tag metadata di <head>
    function updateMetaTags() {
      if ($scope.tvShow) {
        var title = $scope.tvShow.name || "TV Show";
        var description = $scope.tvShow.overview || "No description available.";
        var posterPath = $scope.tvShow.poster_path
          ? "https://image.tmdb.org/t/p/w300/" + $scope.tvShow.poster_path
          : "https://sportxyou.github.io/movie-tv/img/noposter.jpg";

        document.title = title;

        // Open Graph meta tags
        document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        document.querySelector('meta[property="og:description"]').setAttribute("content", description);
        document.querySelector('meta[property="og:image"]').setAttribute("content", posterPath);

        // Twitter meta tags
        document.querySelector('meta[name="twitter:title"]').setAttribute("content", title);
        document.querySelector('meta[name="twitter:description"]').setAttribute("content", description);
        document.querySelector('meta[name="twitter:image"]').setAttribute("content", posterPath);
      }
    }

    $http
      .get(
        "https://api.themoviedb.org/3/tv/" +
          tvId +
          "?language=en-US&api_key=" +
          apiKey
      )
      .then(
        function (response) {
          $scope.tvShow = response.data;

          // tvShow Produksi Negara
          if (
            $scope.tvShow.production_countries &&
            $scope.tvShow.production_countries.length > 0
          ) {
            var productionCountries = [];
            for (
              var i = 0;
              i < $scope.tvShow.production_countries.length;
              i++
            ) {
              productionCountries.push(
                $scope.tvShow.production_countries[i].name
              );
            }
            $scope.productionCountries = productionCountries.join(", ");
          } else {
            $scope.productionCountries = "N/A";
          }

          // tvShow Durasi Episode
          if (
            $scope.tvShow.episode_run_time &&
            $scope.tvShow.episode_run_time.length > 0
          ) {
            $scope.episodeRuntime = $scope.tvShow.episode_run_time[0];
          } else {
            $scope.episodeRuntime = "45";
          }

          // Update meta tags
          updateMetaTags();
        },

        function (error) {
          console.error("Error saat mengambil detail acara TV:", error);
        }
      );

    // similar TVSHOW
    $http
      .get(
        "https://api.themoviedb.org/3/tv/" +
          tvId +
          "/recommendations?language=en-US&page=1&api_key=" +
          apiKey
      )
      .then(
        function (response) {
          if (response.data && response.data.results) {
            $scope.tvRecommendations = response.data.results;
          } else {
            console.error("No TV recommendations available.");
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




    // CASTS & CREWS tvShow
    $scope.getDataCastAndCrew = function () {
      $http
        .get(
          "https://api.themoviedb.org/3/tv/" +
            tvId +
            "/credits?api_key=" +
            apiKey
        )
        .then(function (response) {
          // Mendapatkan data cast dan crew dari respons API
          var castData = response.data.cast;
          var crewData = response.data.crew;
          var castInfo = [];
          castData.forEach(function (castMember) {
            var cast = {
              profil_path: castMember.profile_path,
              cast_name: castMember.name,
              cast_character: castMember.character,
            };
            castInfo.push(cast);
          });

          $scope.castInfo = castInfo;
          var crewInfo = [];
          crewData.forEach(function (crewMember) {
            var crew = {
              job: crewMember.job,
              crew_name: crewMember.name,
              profil_path: crewMember.profile_path,
            };
            crewInfo.push(crew);
          });

          $scope.crewInfo = crewInfo;
        })
        .catch(function (error) {
          console.error("Error mengambil data cast dan crew:", error);
        });
    };
    $scope.getDataCastAndCrew();

    // Mengambil data gambar film dari API
    $http
      .get(
        "https://api.themoviedb.org/3/tv/" +
          tvId +
          "/images?api_key=" +
          apiKey
      )
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
        .get(
          "https://api.themoviedb.org/3/tv/" +
            tvId +
            "/alternative_titles?api_key=" +
            apiKey
        )
        .then(function (response) {
          $scope.alternativeTitles = response.data.results;
        })
        .catch(function (error) {
          console.error("Error fetching alternative titles:", error);
        });
    };
    $scope.getAlternativeTitles();

    // Certification TV
    var tvCertificationUrl =
      "https://api.themoviedb.org/3/tv/" +
      tvId +
      "?append_to_response=content_ratings&language=en-US&api_key=" +
      apiKey;

    $http.get(tvCertificationUrl).then(
      function (certificationResponse) {
        if (
          certificationResponse.data &&
          certificationResponse.data.content_ratings &&
          certificationResponse.data.content_ratings.results
        ) {
          var contentRatings =
            certificationResponse.data.content_ratings.results;
          var tvCertifications = contentRatings.filter(function (rating) {
            return rating.iso_3166_1 === "US";
          });

          if (tvCertifications.length > 0) {
            $scope.tvSeriesCertification = tvCertifications[0].rating;
          } else {
            $scope.tvSeriesCertification = "n/a";
          }
        } else {
          $scope.tvSeriesCertification = "n/a";
        }
      },
      function (error) {
        console.error("Error fetching TV certification:", error);
      }
    );

    $scope.showEpisodes = function (season) {
      var episodeUrl =
        "https://api.themoviedb.org/3/tv/" +
        tvId +
        "/season/" +
        season.season_number +
        "?language=en-US&api_key=" +
        apiKey;

      $http.get(episodeUrl).then(
        function (episodeResponse) {
          console.log(episodeResponse.data); // Tambahkan ini
          $scope.selectedSeason = season;
          $scope.episodes = episodeResponse.data.episodes;
        },
        function (error) {
          console.error("Error fetching episode acara TV:", error);
        }
      );
    };

    $scope.getPosterUrl = function (posterPath) {
      return posterPath
        ? "https://image.tmdb.org/t/p/w300/" + posterPath
        : "https://sportxyou.github.io/movie-tv/img/noposter.jpg";
    };

    $scope.getBackdropUrl = function (backdropPath) {
      return backdropPath
        ? "https://image.tmdb.org/t/p/w300/" + backdropPath
        : "https://sportxyou.github.io/movie-tv/img/nobackdrop.jpg";
    };
    $scope.getActorProfilePath = function (actor) {
      // Assuming that the actor object has a "profile_path" property
      if (actor.profile_path) {
        return "https://image.tmdb.org/t/p/w300/" + actor.profile_path;
      } else {
        // If the actor doesn't have a profile image, provide a default image URL
        return "https://sportxyou.github.io/movie-tv/img/noprofile.jpg";
      }
    };

    $scope.goToEpisodeDetail = function (seasonNumber, episodeNumber) {
      var tvShowNameWithHyphens = $scope.tvShow.name
        .replace(/ /g, "-") // Replace spaces with hyphens
        .toLowerCase(); // Convert to lowercase

      var newUrl =
        "tvshow.html?id=" +
        tvId +
        "-" +
        seasonNumber +
        "-" +
        episodeNumber +
        "/" +
        tvShowNameWithHyphens;

      $window.location.href = newUrl;
    };

    function getParameterByName(name) {
      var url = $window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#/]*))"); // Perubahan pada regex agar menangkap parameter id sebelum '/'
      var results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Mendapatkan nilai dari parameter "id" (-live)
    var idParam = getParameterByName("id");
    var liveBtn = document.getElementById("live_btn");
    var timeContainer = document.getElementById("timeContainer");
    var liveStatus = document.getElementById("liveStatus"); // Menambahkan ini

    if (window.location.href.includes("-live")) {
      if (liveBtn) {
        liveBtn.style.display = "inline-block";
      }
      if (timeContainer) {
        timeContainer.style.display = "none";
      }
      if (liveStatus) {
        liveStatus.textContent = "LIVE"; // Mengatur konten elemen "liveStatus" menjadi "LIVE"
      }
    } else {
      if (liveBtn) {
        liveBtn.style.display = "none";
      }
      if (timeContainer) {
        timeContainer.style.display = "inline-block";
      }
      if (liveStatus) {
        liveStatus.textContent = ""; // Mengosongkan konten elemen "liveStatus"
      }
    }
    $scope.goToTvDetail = function (tvId) {
      $window.location.href = "/p/tv.html?id=" + tvId;
    };

    // Scroll to id
    $scope.scrollToEpisodeList = function () {
      var element = document.getElementById("HTML6");
      if (element) {
        element.focus(); // Berikan fokus ke elemen
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
  });    
