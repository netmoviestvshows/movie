var app = angular.module('movieApp', []);

        // Filter custom untuk membatasi jumlah kata
        app.filter('limitToWords', function () {
            return function (input, limit) {
                if (!input) return '';
                var words = input.split(' ');
                if (words.length > limit) {
                    return words.slice(0, limit).join(' ');
                } else {
                    return input;
                }
            };
        });

        // Buat controller untuk mengambil data movie atau TV show
        app.controller('MovieController', ['$scope', '$http', function($scope, $http) {
            var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
            var baseUrl = 'https://api.themoviedb.org/3/';

            // Inisialisasi tipe dari variabel global
            $scope.type = type;

            // Fungsi untuk mengonversi tanggal ke format Bulan, Tanggal Tahun
            $scope.convertDate = function(dateString) {
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                var date = new Date(dateString);
                return date.toLocaleDateString('en-US', options);
            };

            // Fungsi untuk mengonversi tanggal ke format Tahun saja
            $scope.getYear = function(dateString) {
                var date = new Date(dateString);
                return date.getFullYear();
            };

             // Fungsi untuk mengambil data season dari TV show
             $scope.fetchSeasonDetails = function(id, season) {
                $http.get(`${baseUrl}tv/${id}/season/${season}?api_key=${apiKey}`)
                    .then(function(response) {
                        $scope.seasonDetails = response.data;
                        console.log('Season Data:', $scope.seasonDetails);
                    })
                    .catch(function(error) {
                        $scope.errorMessage = 'Data season tidak ditemukan atau terjadi kesalahan.';
                        console.error('Error fetching season details:', error);
                    });
            };
            
            // Fungsi untuk mengambil detail movie atau TV show
            $scope.fetchDetails = function(id, type) {
                $http.get(`${baseUrl}${type}/${id}?api_key=${apiKey}`)
                    .then(function(response) {
                        $scope.details = response.data;
                        
                        // Tambahkan log untuk memeriksa apakah data tersedia
                        console.log('Details Data:', $scope.details);

                        if (type === 'movie') {
                            console.log('Production Companies:', $scope.details.production_companies);
                        } else if (type === 'tv') {
                            $scope.fetchSeasonDetails(id, season);
                        
                            console.log('Networks:', $scope.details.networks);
                        }
                    })
                    .catch(function(error) {
                        $scope.errorMessage = 'Data tidak ditemukan atau terjadi kesalahan.';
                        console.error('Error fetching details:', error);
                    });
            };

            // Panggil fungsi untuk menampilkan data detail
            $scope.fetchDetails(id, type);

        }]);
