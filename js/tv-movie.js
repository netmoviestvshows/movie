var app = angular.module('movieApp', []);

        // Buat controller untuk mengambil data movie atau TV show
        app.controller('MovieController', ['$scope', '$http', function($scope, $http) {
            var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
            var baseUrl = 'https://api.themoviedb.org/3/';
            

            // Fungsi untuk mengonversi tanggal ke format Bulan, Tanggal Tahun
            $scope.convertDate = function(dateString) {
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                var date = new Date(dateString);
                return date.toLocaleDateString('en-US', options);
            };

            // Fungsi untuk mengambil detail movie atau TV show
            $scope.fetchDetails = function(id, type) {
                $http.get(`${baseUrl}${type}/${id}?api_key=${apiKey}`)
                    .then(function(response) {
                        $scope.details = response.data;
                    })
                    .catch(function(error) {
                        $scope.errorMessage = 'Data tidak ditemukan atau terjadi kesalahan.';
                    });
            };

            // Panggil fungsi untuk menampilkan data detail
            $scope.fetchDetails(id, type);
        }]);
