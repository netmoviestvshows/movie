// script hanya tampil di halaman genre.html saja
      var app = angular.module("mtApp", []);
      app.controller("mtController", function ($scope, $http) {
        const apiKey = "a79576e54c5bbb893011b98ca48f2460";

        $scope.genres = [];
        $scope.genreMedia = [];
        $scope.genreCurrentPage = 1;
        $scope.genreTotalPages = 1;
        $scope.visiblePages = [];
        $scope.selectedGenreId = null;

        function getQueryParams() {
          const params = new URLSearchParams(window.location.search);
          return {
            genre: params.get("genre") || "action",
            page: parseInt(params.get("page")) || 1,
          };
        }

        $http
          .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
          .then(function (response) {
            $scope.genres = response.data.genres;
            const queryParams = getQueryParams();
            const genreId = $scope.getGenreIdByName(queryParams.genre);
            if (genreId) {
              $scope.genreCurrentPage = queryParams.page;
              $scope.fetchGenreMedia(genreId);
            }
          });

        $scope.getGenreIdByName = function (genreName) {
          const genre = $scope.genres.find(
            (g) => g.name.toLowerCase() === genreName.toLowerCase()
          );
          return genre ? genre.id : null;
        };

        $scope.isDataLoaded = false;
        $scope.fetchGenreMedia = function (genreId) {
          $scope.selectedGenreId = genreId;

          $http
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${$scope.selectedGenreId}&page=${$scope.genreCurrentPage}`)
            .then(function (response) {
              const movies = response.data.results;

              return $http
                .get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${$scope.selectedGenreId}&page=${$scope.genreCurrentPage}`)
                .then(function (tvResponse) {
                  const tvShows = tvResponse.data.results;
                  $scope.genreMedia = movies.concat(tvShows);
                  $scope.genreTotalPages = Math.max(response.data.total_pages, tvResponse.data.total_pages);
                  $scope.updateVisiblePages();

                  // Set isDataLoaded ke true setelah data selesai dimuat
          $scope.isDataLoaded = true;

                  const selectedGenreName = $scope.genres.find(
                    (g) => g.id === $scope.selectedGenreId
                  ).name;
                  const formattedGenreName = selectedGenreName
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const newUrl = `/p/genre.html?${formattedGenreName}&page=${$scope.genreCurrentPage}`;
                  history.replaceState(null, "", newUrl);
                });
            });
        };

        $scope.updateVisiblePages = function () {
          const startPage = Math.max(1, $scope.genreCurrentPage - 2);
          const endPage = Math.min($scope.genreTotalPages, $scope.genreCurrentPage + 2);
          $scope.visiblePages = [];
          for (let i = startPage; i <= endPage; i++) {
            $scope.visiblePages.push(i);
          }
        };

        $scope.goToGenrePage = function (page) {
          $scope.genreCurrentPage = page;
          if ($scope.selectedGenreId) {
            $scope.fetchGenreMedia($scope.selectedGenreId);
          }
        };

        $scope.prevGenrePage = function () {
          if ($scope.genreCurrentPage > 1) {
            $scope.goToGenrePage($scope.genreCurrentPage - 1);
          }
        };

        $scope.nextGenrePage = function () {
          if ($scope.genreCurrentPage < $scope.genreTotalPages) {
            $scope.goToGenrePage($scope.genreCurrentPage + 1);
          }
        };

        $scope.changeGenre = function (genreName) {
          const genreId = $scope.getGenreIdByName(genreName);
          if (genreId) {
            $scope.genreCurrentPage = 1;
            $scope.fetchGenreMedia(genreId);
          }
        };

        $scope.goToMovieDetail = function (id, title, type) {
          const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
          const newUrl = `/p/movie.html?id=${id}/${formattedTitle}`;
          window.location.href = newUrl;
        };

        $scope.getPosterUrl = function (posterPath) {
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else {
    return 'https://sportxyou.github.io/movie-tv/img/noposter.jpg';
  }
};


        
        $scope.getMediaUrl = function (media, type) {
          return type === "movie"
            ? `/p/movie.html?id=${media.id}/${media.title.toLowerCase().replace(/\s+/g, "-")}`
            : `/p/tv.html?id=${media.id}/${media.name.toLowerCase().replace(/\s+/g, "-")}`;
        };
      });
