const apiKey = 'b2b355392c45da4dad92e5cac927bab4'; // API Key Anda
        const baseUrl = 'https://api.themoviedb.org/3/';

         // Fungsi untuk mengonversi tanggal ke format Bulan, Tanggal Tahun
         function convertDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options); // "en-US" bisa disesuaikan dengan lokal yang Anda inginkan
        }

        // Fungsi untuk mengambil detail movie atau TV show
        function fetchDetails(id, type) {
            $.ajax({
                url: `${baseUrl}${type}/${id}?api_key=${apiKey}`,
                method: 'GET',
                success: function (data) {
                    displayDetails(data, type);
                },
                error: function () {
                    $('#details').html('<p>Data tidak ditemukan atau terjadi kesalahan.</p>');
                }
            });
        }

        // Fungsi untuk menampilkan detail
        function displayDetails(data, type) {
            let detailsHtml = `
            <div class="col-md-3 text-center">
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}" class="img-fluid main-poster">
            </div>
            <div class="col-md-9">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Judul</th>
                            <td>${data.title || data.name}</td>
                        </tr>
                        <tr>
                            <th>Rating</th>
                            <td>${data.vote_average}</td>
                        </tr>
                        <tr>
                            <th>Genres</th>
                            <td>${data.genres.map(genre => genre.name).join(', ')}</td>
                        </tr>
                        <tr>
                            <th>Release</th>
                            <td>${convertDate(data.release_date || data.first_air_date)}</td>
                        </tr>
                        <tr>
                            <th>Overview</th>
                            <td>${data.overview}</td>
                        </tr>
                        <tr>
                            <th>Production Companies</th>
                            <td>${data.production_companies.map(company => company.name).join(', ')}</td>
                        </tr>
                        <tr>
                            <th>Production Countries</th>
                            <td>${data.production_countries.map(country => country.name).join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            `;

            $('#details').html(detailsHtml);
        }

        // Panggil fungsi untuk menampilkan data detail
        fetchDetails(id, type);
