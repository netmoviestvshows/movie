$(document).ready(function () {
    var apiKey = "a79576e54c5bbb893011b98ca48f2460";
    var currentPage = 1;
    var totalPages = 1;

    function updatePagination() {
      var paginationHtml = `
        <button class="btn btn-primary" id="firstPage" ${currentPage === 1 ? 'disabled' : ''}>First</button>
        <button class="btn btn-primary" id="previousPage" ${currentPage === 1 ? 'disabled' : ''}>❮</button>
      `;

      var startPage = Math.max(1, currentPage - Math.floor(5 / 2));
      var endPage = Math.min(startPage + 5 - 1, totalPages);

      for (var i = startPage; i <= endPage; i++) {
        paginationHtml += `<button class="btn ${currentPage === i ? 'btn-primary' : 'btn-default'}" data-page="${i}">${i}</button>`;
      }

      paginationHtml += `
        <button class="btn btn-primary" id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>❯</button>
        <button class="btn btn-primary" id="lastPage">${currentPage} of ${totalPages}</button>
      `;

      $('#paginationControls').html(paginationHtml);
    }

    function search(page) {
      var searchQuery = $('#searchQuery').val();
      var searchMediaType = $('#searchMediaType').val();

      if (searchQuery) {
        var apiUrl = `https://api.themoviedb.org/3/search/${searchMediaType}?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
        $.get(apiUrl, function (response) {
          var resultsHtml = '';

          if (response.results.length === 0) {
            resultsHtml = '<div class="col">n/a</div>';
          } else {
            response.results.forEach(function (result) {
              var title = result.title || result.name;
              var releaseDate = result.release_date ? ' (' + result.release_date.substr(0, 4) + ')' : '';
              resultsHtml += `
                <div class="col" data-id="${result.id}">
                  <div class="image-container">
                    <div class="labels">
                      <span class="label-hd">${searchMediaType === 'person' ? 'Person' : 'HD'}</span>
                      ${searchMediaType !== 'person' ? '<span class="label-rating"><i class="fa fa-star"></i> ' + (result.vote_average || 'N/A') + '</span>' : ''}
                    </div>
                    <img src="${getPosterUrl(result.poster_path || result.profile_path)}" class="gal-img" />
                    <div class="overlay">
                      <svg height="50" viewbox="0 0 14 14" width="50" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" stroke="yellow" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="7" cy="7" r="6.5" />
                          <path d="m5.5 4.5l4 2.5l-4 2.5v-5z" />
                        </g>
                      </svg>
                    </div>
                    <div class="caption">${title}${releaseDate}</div>
                  </div>
                </div>
              `;
            });
          }

          $('#searchResults').html(resultsHtml);
          currentPage = response.page;
          totalPages = response.total_pages;
          updatePagination();
        }).fail(function (error) {
          console.error("Error fetching search results:", error);
        });
      } else {
        $('#searchResults').empty();
        $('#paginationControls').empty();
      }
    }

    function getPosterUrl(posterPath) {
      return posterPath
        ? "https://image.tmdb.org/t/p/w300" + posterPath
        : "https://netmoviestvshows.github.io/movie/images/no-poster-movie-tv.png";
    }

    $('#searchButton').click(function () {
      search(1);
    });

    $('#paginationControls').on('click', '#firstPage', function () {
      search(1);
    });

    $('#paginationControls').on('click', '#previousPage', function () {
      if (currentPage > 1) {
        search(currentPage - 1);
      }
    });

    $('#paginationControls').on('click', '#nextPage', function () {
      if (currentPage < totalPages) {
        search(currentPage + 1);
      }
    });

    $('#paginationControls').on('click', '#lastPage', function () {
      search(totalPages);
    });

    $('#paginationControls').on('click', '.btn-default', function () {
      var page = $(this).data('page');
      search(page);
    });

    $(document).on('click', '.col', function () {
      var mediaId = $(this).data('id');
      var mediaTitle = $(this).find('.caption').text().split(' (')[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
      window.location.href = `/p/${$('#searchMediaType').val()}.html?id=${mediaId}/${encodeURIComponent(mediaTitle)}`;
    });

    $(document).on('click', '[data-toggle="offcanvas"]', function () {
      $($(this).data("target")).toggleClass("show");
    });

    $(document).on('click', '.close', function () {
      $(this).parents(".offcanvas").removeClass("show");
    });

    // Navbar icon toggle
    $('.navbar-toggle').on('click', function () {
      var icon = $('#my-icon');
      if (icon.attr('icon') === 'line-md:close-to-menu-transition') {
        icon.attr('icon', 'line-md:menu-to-close-transition');
      } else {
        icon.attr('icon', 'line-md:close-to-menu-transition');
      }
    });
  });
