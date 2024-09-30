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

        app.controller('MovieController', ['$scope', '$http', function($scope, $http) {
            var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
            var baseUrl = 'https://api.themoviedb.org/3/';
            $scope.cast = [];
            $scope.loading = true; // Set loading to true
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

            $scope.fetchData = function() {
                var endpoint = $scope.type === 'tv' ? 'tv/' + id : 'movie/' + id;
                var url = baseUrl + endpoint + '?api_key=' + apiKey + '&append_to_response=credits';

                $http.get(url)
                    .then(function(response) {
                        $scope.details = response.data;
                        $scope.cast = response.data.credits.cast;
                        $scope.loading = false; // Set loading to false when data is loaded
                        
                    })
                    .catch(function(error) {
                        console.error('Error fetching data:', error);
                        $scope.errorMessage = 'Gagal memuat data.';
                        $scope.loading = false; // Set loading to false even if there's an error
                    });
            };

            $scope.fetchSeasonDetails(id, season);
            $scope.fetchData();
        }]);
