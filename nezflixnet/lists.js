var app = angular.module('mtApp', []);

    app.controller('mtController', function($scope, $http, $location) {
        var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
        var accessToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcwYTMwYjk1ODE5Y2IzMjA3ZTUxZjE4ZGFiNDgzNCIsInN1YiI6IjYxY2YxOTEyYWY2ZTk0MDA5ODQ3OGRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pNjePjoP03wPNnH-lYvGa9Uqn0g6WIm1WzQXaOY3Vj8';

        $scope.popularCurrentPage = parseInt($location.search().popularPage) || 1;
        $scope.nowPlayingCurrentPage = parseInt($location.search().nowPlayingPage) || 1;
        $scope.airingTodayCurrentPage = parseInt($location.search().airingTodayPage) || 1;

        $scope.popularTotalPages = 1;
        $scope.nowPlayingTotalPages = 1;
        $scope.airingTodayTotalPages = 1;

        $scope.popularMovies = [];
        $scope.nowPlayingMovies = [];
        $scope.airingTodayTV = [];

        $scope.popularPages = [];
        $scope.nowPlayingPages = [];
        $scope.airingTodayPages = [];

        const defaultPosterUrl = 'https://sportxyou.github.io/movie-tv/img/noposter.jpg';

        $scope.fetchMovies = function() {
            const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${$scope.nowPlayingCurrentPage}`;
            const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${$scope.popularCurrentPage}`;
            const airingTodayUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${$scope.airingTodayCurrentPage}`;

            $http({
                method: 'GET',
                url: nowPlayingUrl,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(function(response) {
                $scope.nowPlayingMovies = response.data.results;
                $scope.nowPlayingTotalPages = response.data.total_pages;
                $scope.updateNowPlayingPages();
            }).catch(function(error) {
                console.error('Error fetching now playing movies:', error);
            });

            $http({
                method: 'GET',
                url: popularUrl,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(function(response) {
                $scope.popularMovies = response.data.results;
                $scope.popularTotalPages = response.data.total_pages;
                $scope.updatePopularPages();
            }).catch(function(error) {
                console.error('Error fetching popular movies:', error);
            });

            $http({
                method: 'GET',
                url: airingTodayUrl,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(function(response) {
                $scope.airingTodayTV = response.data.results;
                $scope.airingTodayTotalPages = response.data.total_pages;
                $scope.updateAiringTodayPages();
            }).catch(function(error) {
                console.error('Error fetching airing today TV shows:', error);
            });
        };

        $scope.updatePopularPages = function() {
            let startPage, endPage;
            if ($scope.popularTotalPages <= 6) {
                startPage = 1;
                endPage = $scope.popularTotalPages;
            } else if ($scope.popularCurrentPage <= 3) {
                startPage = 1;
                endPage = 6;
            } else if ($scope.popularCurrentPage + 2 >= $scope.popularTotalPages) {
                startPage = $scope.popularTotalPages - 5;
                endPage = $scope.popularTotalPages;
            } else {
                startPage = $scope.popularCurrentPage - 3;
                endPage = $scope.popularCurrentPage + 2;
            }

            $scope.popularPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
        };

        $scope.updateNowPlayingPages = function() {
            let startPage, endPage;
            if ($scope.nowPlayingTotalPages <= 6) {
                startPage = 1;
                endPage = $scope.nowPlayingTotalPages;
            } else if ($scope.nowPlayingCurrentPage <= 3) {
                startPage = 1;
                endPage = 6;
            } else if ($scope.nowPlayingCurrentPage + 2 >= $scope.nowPlayingTotalPages) {
                startPage = $scope.nowPlayingTotalPages - 5;
                endPage = $scope.nowPlayingTotalPages;
            } else {
                startPage = $scope.nowPlayingCurrentPage - 3;
                endPage = $scope.nowPlayingCurrentPage + 2;
            }

            $scope.nowPlayingPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
        };

        $scope.updateAiringTodayPages = function() {
            let startPage, endPage;
            if ($scope.airingTodayTotalPages <= 6) {
                startPage = 1;
                endPage = $scope.airingTodayTotalPages;
            } else if ($scope.airingTodayCurrentPage <= 3) {
                startPage = 1;
                endPage = 6;
            } else if ($scope.airingTodayCurrentPage + 2 >= $scope.airingTodayTotalPages) {
                startPage = $scope.airingTodayTotalPages - 5;
                endPage = $scope.airingTodayTotalPages;
            } else {
                startPage = $scope.airingTodayCurrentPage - 3;
                endPage = $scope.airingTodayCurrentPage + 2;
            }

            $scope.airingTodayPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
        };

        $scope.prevPopularPage = function() {
            if ($scope.popularCurrentPage > 1) {
                $scope.popularCurrentPage--;
                $scope.fetchMovies();
                $location.search('popularPage', $scope.popularCurrentPage);
            }
        };

        $scope.nextPopularPage = function() {
            if ($scope.popularCurrentPage < $scope.popularTotalPages) {
                $scope.popularCurrentPage++;
                $scope.fetchMovies();
                $location.search('popularPage', $scope.popularCurrentPage);
            }
        };

        $scope.goToPopularPage = function(page) {
            $scope.popularCurrentPage = page;
            $scope.fetchMovies();
            $location.search('popularPage', $scope.popularCurrentPage);
        };

        $scope.prevNowPlayingPage = function() {
            if ($scope.nowPlayingCurrentPage > 1) {
                $scope.nowPlayingCurrentPage--;
                $scope.fetchMovies();
                $location.search('nowPlayingPage', $scope.nowPlayingCurrentPage);
            }
        };

        $scope.nextNowPlayingPage = function() {
            if ($scope.nowPlayingCurrentPage < $scope.nowPlayingTotalPages) {
                $scope.nowPlayingCurrentPage++;
                $scope.fetchMovies();
                $location.search('nowPlayingPage', $scope.nowPlayingCurrentPage);
            }
        };

        $scope.goToNowPlayingPage = function(page) {
            $scope.nowPlayingCurrentPage = page;
            $scope.fetchMovies();
            $location.search('nowPlayingPage', $scope.nowPlayingCurrentPage);
        };

        $scope.prevAiringTodayPage = function() {
            if ($scope.airingTodayCurrentPage > 1) {
                $scope.airingTodayCurrentPage--;
                $scope.fetchMovies();
                $location.search('airingTodayPage', $scope.airingTodayCurrentPage);
            }
        };

        $scope.nextAiringTodayPage = function() {
            if ($scope.airingTodayCurrentPage < $scope.airingTodayTotalPages) {
                $scope.airingTodayCurrentPage++;
                $scope.fetchMovies();
                $location.search('airingTodayPage', $scope.airingTodayCurrentPage);
            }
        };

        $scope.goToAiringTodayPage = function(page) {
            $scope.airingTodayCurrentPage = page;
            $scope.fetchMovies();
            $location.search('airingTodayPage', $scope.airingTodayCurrentPage);
        };

        $scope.getPosterUrl = function(path) {
            if (path) {
                return `https://image.tmdb.org/t/p/w500${path}`;
            }
            return defaultPosterUrl;
        };

        $scope.getMediaUrl = function(media, type) {
            const formattedTitle = (type === 'movie' ? media.title : media.name)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");
            const mediaType = type === 'movie' ? 'movie' : 'tv';
            return `/p/${mediaType}.html?id=${media.id}/${formattedTitle}`;
        };

        $scope.goToMovieDetail = function(id, title, type) {
            const formattedTitle = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");
            const mediaType = type === 'movie' ? 'movie' : 'tv';
            window.location.href = `/p/${mediaType}.html?id=${id}/${formattedTitle}`;
        };

        $scope.fetchMovies();
    });
