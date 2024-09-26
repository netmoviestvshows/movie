var app = angular.module('mtApp', []);
  
    app.controller('mtController', function($scope, $http, $window, $document) {
      var apiKey = "a79576e54c5bbb893011b98ca48f2460";
      
      // Parsing URL to extract the personId
      var urlParams = window.location.search;
      var personId = urlParams.split('=')[1].split('/')[0];

      // Function to convert gender number to descriptive text
$scope.getGenderText = function(gender) {
  switch (gender) {
    case 0:
      return 'Not set / not specified';
    case 1:
      return 'Female';
    case 2:
      return 'Male';
    case 3:
      return 'Non-binary';
    default:
      return 'Unknown';
  }
};
  
// Function to calculate age from birthdate
$scope.calculateAge = function(birthday) {
  if (!birthday) return 'N/A';  // Handle missing or invalid birthdate
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Untuk mengatur status tampilan biografi
$scope.isBiographyExpanded = false; 
// Fungsi untuk mengatur tampilan biografi
$scope.toggleBiography = function() {
  $scope.isBiographyExpanded = !$scope.isBiographyExpanded;
};

      var url = `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`;
  
      $http.get(url).then(function(response) {
        $scope.person = response.data;

         // Mengatur title halaman berdasarkan nama person
         $document[0].title = `${$scope.person.name} - Artist`;
       
      }, function(error) {
        console.error("Error fetching data: ", error);
      });

      // Get movie and TV show credits
      var creditsUrl = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`;
      $http.get(creditsUrl).then(function(response) {
        $scope.credits = response.data;
      });

      // Ambil gambar person dari API
    $http.get(`https://api.themoviedb.org/3/person/${personId}/images?api_key=${apiKey}`)
        .then(function(response) {
            $scope.personImages = response.data.profiles; // Profiles berisi gambar profil dari person
        })
        .catch(function(error) {
            console.log('Error fetching person images:', error);
        });

      // Function to get poster image URL
      $scope.getPosterUrl = function(path) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://netmoviestvshows.github.io/movie/images/no-poster-movie-tv.png';
      };

    // Fungsi untuk mengarahkan pengguna ke halaman yang sesuai pada pencarian
  $scope.goToMediaDetail = function(media, additionalInfo) {
    var additionalInfo = media.title || media.name;
              additionalInfo = additionalInfo
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");
              additionalInfo = encodeURIComponent(additionalInfo);
    if (media.media_type === 'movie') {
      // Jika media adalah movie, redirect ke halaman movie
      $window.location.href = `/p/movie.html?id=${media.id}/${additionalInfo}`;
    } else if (media.media_type === 'tv') {
      // Jika media adalah TV show, redirect ke halaman TV
      $window.location.href = `/p/tv.html?id=${media.id}/${additionalInfo}`;
    }
  };
});
