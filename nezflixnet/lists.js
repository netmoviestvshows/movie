var app = angular.module('mtApp', []);

app.controller('mtController', function($scope, $http, $location) {
    var apiKey = 'b2b355392c45da4dad92e5cac927bab4';
    var accessToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcwYTMwYjk1ODE5Y2IzMjA3ZTUxZjE4ZGFiNDgzNCIsInN1YiI6IjYxY2YxOTEyYWY2ZTk0MDA5ODQ3OGRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pNjePjoP03wPNnH-lYvGa9Uqn0g6WIm1WzQXaOY3Vj8';

    $scope.popularCurrentPage = parseInt($location.search().popularPage) || 1;
    $scope.nowPlayingCurrentPage = parseInt($location.search().nowPlayingPage) || 1;
    $scope.topRatedCurrentPage = parseInt($location.search().topRatedPage) || 1;
    $scope.comingSoonCurrentPage = parseInt($location.search().comingSoonPage) || 1;
    $scope.topRatedTvCurrentPage = parseInt($location.search().topRatedTvPage) || 1;
    $scope.airingTodayCurrentPage = parseInt($location.search().airingTodayPage) || 1;
    $scope.onAirCurrentPage = parseInt($location.search().onAirPage) || 1;
    $scope.popularTvCurrentPage = parseInt($location.search().popularTvPage) || 1;

    $scope.popularTotalPages = 1;
    $scope.nowPlayingTotalPages = 1;
    $scope.topRatedTotalPages = 1;
    $scope.comingSoonTotalPages = 1;
    $scope.topRatedTvTotalPages = 1;
    $scope.airingTodayTotalPages = 1;
    $scope.onAirTotalPages = 1;
    $scope.popularTvTotalPages = 1;

    $scope.popularMovies = [];
    $scope.nowPlayingMovies = [];
    $scope.topRatedMovies = [];
    $scope.comingSoonMovies = [];
    $scope.topRatedTv = [];
    $scope.airingTodayTV = [];
    $scope.onAirTV = [];
    $scope.popularTV = [];

    $scope.popularPages = [];
    $scope.nowPlayingPages = [];
    $scope.topRatedPages = [];
    $scope.comingSoonPages = [];
    $scope.topRatedTvPages = [];
    $scope.airingTodayPages = [];
    $scope.onAirPages = [];
    $scope.popularTvPages = [];

    const defaultPosterUrl = 'https://sportxyou.github.io/movie-tv/img/noposter.jpg';
    $scope.defaultPosterUrl = defaultPosterUrl;

    $scope.fetchMovies = function() {
        const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${$scope.popularCurrentPage}`;
        const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${$scope.nowPlayingCurrentPage}`;
        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${$scope.topRatedCurrentPage}`;
        const comingSoonUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${$scope.comingSoonCurrentPage}`;
        const topRatedTvUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${$scope.topRatedTvCurrentPage}`;
        const airingTodayUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${$scope.airingTodayCurrentPage}`;
        const onAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${$scope.onAirCurrentPage}`;
        const popularTvUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${$scope.popularTvCurrentPage}`;

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
            url: topRatedUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function(response) {
            $scope.topRatedMovies = response.data.results;
            $scope.topRatedTotalPages = response.data.total_pages;
            $scope.updateTopRatedPages();
        }).catch(function(error) {
            console.error('Error fetching top rated movies:', error);
        });

        $http({
            method: 'GET',
            url: comingSoonUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function(response) {
            $scope.comingSoonMovies = response.data.results;
            $scope.comingSoonTotalPages = response.data.total_pages;
            $scope.updateComingSoonPages();
        }).catch(function(error) {
            console.error('Error fetching coming soon movies:', error);
        });

        $http({
            method: 'GET',
            url: topRatedTvUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function(response) {
            $scope.topRatedTV = response.data.results;
            $scope.topRatedTvTotalPages = response.data.total_pages;
            $scope.updateTopRatedTvPages();
        }).catch(function(error) {
            console.error('Error fetching top rated TV shows:', error);
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

        $http({
            method: 'GET',
            url: onAirUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function(response) {
            $scope.onAirTV = response.data.results;
            $scope.onAirTotalPages = response.data.total_pages;
            $scope.updateOnAirPages();
        }).catch(function(error) {
            console.error('Error fetching on the air TV shows:', error);
        });

        $http({
            method: 'GET',
            url: popularTvUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function(response) {
            $scope.popularTV = response.data.results;
            $scope.popularTvTotalPages = response.data.total_pages;
            $scope.updatePopularTvPages();
        }).catch(function(error) {
            console.error('Error fetching popular TV shows:', error);
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

    $scope.updateTopRatedPages = function() {
        let startPage, endPage;
        if ($scope.topRatedTotalPages <= 6) {
            startPage = 1;
            endPage = $scope.topRatedTotalPages;
        } else if ($scope.topRatedCurrentPage <= 3) {
            startPage = 1;
            endPage = 6;
        } else if ($scope.topRatedCurrentPage + 2 >= $scope.topRatedTotalPages) {
            startPage = $scope.topRatedTotalPages - 5;
            endPage = $scope.topRatedTotalPages;
        } else {
            startPage = $scope.topRatedCurrentPage - 3;
            endPage = $scope.topRatedCurrentPage + 2;
        }

        $scope.topRatedPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
    };

    $scope.updateComingSoonPages = function() {
        let startPage, endPage;
        if ($scope.comingSoonTotalPages <= 6) {
            startPage = 1;
            endPage = $scope.comingSoonTotalPages;
        } else if ($scope.comingSoonCurrentPage <= 3) {
            startPage = 1;
            endPage = 6;
        } else if ($scope.comingSoonCurrentPage + 2 >= $scope.comingSoonTotalPages) {
            startPage = $scope.comingSoonTotalPages - 5;
            endPage = $scope.comingSoonTotalPages;
        } else {
            startPage = $scope.comingSoonCurrentPage - 3;
            endPage = $scope.comingSoonCurrentPage + 2;
        }

        $scope.comingSoonPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
    };

    $scope.updateTopRatedTvPages = function() {
        let startPage, endPage;
        if ($scope.topRatedTvTotalPages <= 6) {
            startPage = 1;
            endPage = $scope.topRatedTvTotalPages;
        } else if ($scope.topRatedTvCurrentPage <= 3) {
            startPage = 1;
            endPage = 6;
        } else if ($scope.topRatedTvCurrentPage + 2 >= $scope.topRatedTvTotalPages) {
            startPage = $scope.topRatedTvTotalPages - 5;
            endPage = $scope.topRatedTvTotalPages;
        } else {
            startPage = $scope.topRatedTvCurrentPage - 3;
            endPage = $scope.topRatedTvCurrentPage + 2;
        }

        $scope.topRatedTvPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
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

    $scope.updateOnAirPages = function() {
        let startPage, endPage;
        if ($scope.onAirTotalPages <= 6) {
            startPage = 1;
            endPage = $scope.onAirTotalPages;
        } else if ($scope.onAirCurrentPage <= 3) {
            startPage = 1;
            endPage = 6;
        } else if ($scope.onAirCurrentPage + 2 >= $scope.onAirTotalPages) {
            startPage = $scope.onAirTotalPages - 5;
            endPage = $scope.onAirTotalPages;
        } else {
            startPage = $scope.onAirCurrentPage - 3;
            endPage = $scope.onAirCurrentPage + 2;
        }

        $scope.onAirPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
    };

    $scope.updatePopularTvPages = function() {
        let startPage, endPage;
        if ($scope.popularTvTotalPages <= 6) {
            startPage = 1;
            endPage = $scope.popularTvTotalPages;
        } else if ($scope.popularTvCurrentPage <= 3) {
            startPage = 1;
            endPage = 6;
        } else if ($scope.popularTvCurrentPage + 2 >= $scope.popularTvTotalPages) {
            startPage = $scope.popularTvTotalPages - 5;
            endPage = $scope.popularTvTotalPages;
        } else {
            startPage = $scope.popularTvCurrentPage - 3;
            endPage = $scope.popularTvCurrentPage + 2;
        }

        $scope.popularTvPages = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k);
    };

    $scope.prevPopularPage = function() {
        if ($scope.popularCurrentPage > 1) {
            $scope.popularCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.popularCurrentPage);
        }
    };

    $scope.nextPopularPage = function() {
        if ($scope.popularCurrentPage < $scope.popularTotalPages) {
            $scope.popularCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.popularCurrentPage);
        }
    };

    $scope.goToPopularPage = function(page) {
        $scope.popularCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.popularCurrentPage);
    };

    $scope.prevNowPlayingPage = function() {
        if ($scope.nowPlayingCurrentPage > 1) {
            $scope.nowPlayingCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.nowPlayingCurrentPage);
        }
    };

    $scope.nextNowPlayingPage = function() {
        if ($scope.nowPlayingCurrentPage < $scope.nowPlayingTotalPages) {
            $scope.nowPlayingCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.nowPlayingCurrentPage);
        }
    };

    $scope.goToNowPlayingPage = function(page) {
        $scope.nowPlayingCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.nowPlayingCurrentPage);
    };

    $scope.prevTopRatedPage = function() {
        if ($scope.topRatedCurrentPage > 1) {
            $scope.topRatedCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.topRatedCurrentPage);
        }
    };

    $scope.nextTopRatedPage = function() {
        if ($scope.topRatedCurrentPage < $scope.topRatedTotalPages) {
            $scope.topRatedCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.topRatedCurrentPage);
        }
    };

    $scope.goToTopRatedPage = function(page) {
        $scope.topRatedCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.topRatedCurrentPage);
    };

    $scope.prevComingSoonPage = function() {
        if ($scope.comingSoonCurrentPage > 1) {
            $scope.comingSoonCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.comingSoonCurrentPage);
        }
    };

    $scope.nextComingSoonPage = function() {
        if ($scope.comingSoonCurrentPage < $scope.comingSoonTotalPages) {
            $scope.comingSoonCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.comingSoonCurrentPage);
        }
    };

    $scope.goToComingSoonPage = function(page) {
        $scope.comingSoonCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.comingSoonCurrentPage);
    };

    $scope.prevTopRatedTvPage = function() {
        if ($scope.topRatedTvCurrentPage > 1) {
            $scope.topRatedTvCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.topRatedTvCurrentPage);
        }
    };

    $scope.nextTopRatedTvPage = function() {
        if ($scope.topRatedTvCurrentPage < $scope.topRatedTvTotalPages) {
            $scope.topRatedTvCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.topRatedTvCurrentPage);
        }
    };

    $scope.goToTopRatedTvPage = function(page) {
        $scope.topRatedTvCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.topRatedTvCurrentPage);
    };

    $scope.prevAiringTodayPage = function() {
        if ($scope.airingTodayCurrentPage > 1) {
            $scope.airingTodayCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.airingTodayCurrentPage);
        }
    };

    $scope.nextAiringTodayPage = function() {
        if ($scope.airingTodayCurrentPage < $scope.airingTodayTotalPages) {
            $scope.airingTodayCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.airingTodayCurrentPage);
        }
    };

    $scope.goToAiringTodayPage = function(page) {
        $scope.airingTodayCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.airingTodayCurrentPage);
    };

    $scope.prevOnAirPage = function() {
        if ($scope.onAirCurrentPage > 1) {
            $scope.onAirCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.onAirCurrentPage);
        }
    };

    $scope.nextOnAirPage = function() {
        if ($scope.onAirCurrentPage < $scope.onAirTotalPages) {
            $scope.onAirCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.onAirCurrentPage);
        }
    };

    $scope.goToOnAirPage = function(page) {
        $scope.onAirCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.onAirCurrentPage);
    };

    $scope.prevPopularTvPage = function() {
        if ($scope.popularTvCurrentPage > 1) {
            $scope.popularTvCurrentPage--;
            $scope.fetchMovies();
            $location.search('page', $scope.popularTvCurrentPage);
        }
    };

    $scope.nextPopularTvPage = function() {
        if ($scope.popularTvCurrentPage < $scope.popularTvTotalPages) {
            $scope.popularTvCurrentPage++;
            $scope.fetchMovies();
            $location.search('page', $scope.popularTvCurrentPage);
        }
    };

    $scope.goToPopularTvPage = function(page) {
        $scope.popularTvCurrentPage = page;
        $scope.fetchMovies();
        $location.search('page', $scope.popularTvCurrentPage);
    };

    $scope.getPosterUrl = function(path) {
        if (path) {
            return `https://image.tmdb.org/t/p/w500${path}`;
        }
        return $scope.defaultPosterUrl;
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
