var app = angular.module('movieApp', []);
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

        app.controller('MovieController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
            var apiKey = '6a70a30b95819cb3207e51f18dab4834';
            var baseUrl = 'https://api.themoviedb.org/3/';
            $scope.cast = [];
            $scope.loading = true; 
            $scope.type = type;
            $scope.season = season;

            $scope.convertDate = function(dateString) {
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                var date = new Date(dateString);
                return date.toLocaleDateString('en-US', options);
            };

            $scope.getYear = function(dateString) {
                var date = new Date(dateString);
                return date.getFullYear();
            };

            $scope.getLimitedCast = function(limit) {
                return $scope.cast.slice(0, limit).map(function(member) {
                    return member.name;
                }).join(', ');
            };

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

            if (type === 'movie') {
                $http.get(baseUrl + 'movie/' + id + '?api_key=' + apiKey + '&append_to_response=credits')
                    .then(function(response) {
                        $scope.details = response.data;
                        $scope.cast = response.data.credits.cast;
                        console.log('Movie Data:', $scope.details);
                    })
                    .catch(function(error) {
                        $scope.errorMessage = 'Data movie tidak ditemukan atau terjadi kesalahan.';
                        console.error('Error fetching movie details:', error);
                    });
            } else if (type === 'tv') {
                $http.get(baseUrl + 'tv/' + id + '?api_key=' + apiKey + '&append_to_response=credits')
                    .then(function(response) {
                        $scope.details = response.data;
                        $scope.cast = response.data.credits.cast;
                        console.log('TV Show Data:', $scope.details);

                        $scope.fetchSeasonDetails(id, season);
                    })
                    .catch(function(error) {
                        $scope.errorMessage = 'Data TV show tidak ditemukan atau terjadi kesalahan.';
                        console.error('Error fetching TV show details:', error);
                    });
            }

            // Menetapkan waktu loading selama 5 detik
            $timeout(function() {
                $scope.loading = false; // Sembunyikan animasi loading setelah 5 detik
            }, 3000);
        }]);
