// script tampil di semua kecuali halaman genre.html
        var app = angular.module("mtApp", []);
        app.controller("mtController", function ($scope, $http) {
            const apiKey = "a79576e54c5bbb893011b98ca48f2460";
            $scope.genres = [];

            // Mengambil daftar genre dari TMDb
            $http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
                .then(function (response) {
                    $scope.genres = response.data.genres;
                });

            // Fungsi untuk mengubah genre saat mengklik genre
            $scope.changeGenre = function (genreName) {
                const formattedGenreName = genreName.toLowerCase().replace(/\s+/g, "-");
                window.location.href = `/p/genre.html?genre=${formattedGenreName}`;
            };
        });
