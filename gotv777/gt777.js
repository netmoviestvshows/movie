<!-- <script src="js/marge.js"></script> -->

      function fetchAndUpdateSchedules() {
        fetch("https://dapiab.apcqwd.com/api/merge/schedules?lang=1")
        // https://dapiab.apcqwd.com/api/ftb/detail?lang=1&id=2653048
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);

            const schedulesContainer = document.getElementById("live-schedules");
            const nbaSchedulesContainer = document.getElementById("nba-schedules");
            const othersContainer = document.getElementById("others-content");
            let schedulesHTML = "";
            let nbaSchedulesHTML = "";
            let othersHTML = "";

            const matchList = data.matchList || [];

            matchList.forEach((match) => {
              const homeLogoUrl = match.homeLogoUrl.includes("nba.titan007.com")
                ? match.homeLogoUrl.replace(
                    "http://nba.titan007.com/",
                    "https://cfcdn.apcqwd.com/nbawin007/"
                  )
                : match.homeLogoUrl.replace(
                    "http://zq.win007.com/",
                    "https://cfcdn.apcqwd.com/zqwin007/"
                  );

              let updatedHomeLogoUrl = homeLogoUrl.includes("cdn.livesports808.com")
                ? homeLogoUrl.replace("https://cdn.livesports808.com/", "https://cfcdn.apcqwd.com/")
                : homeLogoUrl;

              if (homeLogoUrl.includes("http://zq.titan007.com/Image/team/images/") && match.homeId) {
                  updatedHomeLogoUrl = homeLogoUrl.replace("http://zq.titan007.com/Image/team/images/", "https://cfcdn.apcqwd.com/zqwin007/Image/team/images/");
              }

              const awayLogoUrl = match.awayLogoUrl.includes("nba.titan007.com")
                ? match.awayLogoUrl.replace(
                    "http://nba.titan007.com/",
                    "https://cfcdn.apcqwd.com/nbawin007/"
                  )
                : match.awayLogoUrl.replace(
                    "http://zq.win007.com/",
                    "https://cfcdn.apcqwd.com/zqwin007/"
                  );

              let updatedAwayLogoUrl = awayLogoUrl.includes("cdn.livesports808.com")
                ? awayLogoUrl.replace("https://cdn.livesports808.com/", "https://cfcdn.apcqwd.com/")
                : awayLogoUrl;

              if (awayLogoUrl.includes("http://zq.titan007.com/Image/team/images/") && match.awayId) {
                  updatedAwayLogoUrl = awayLogoUrl.replace("http://zq.titan007.com/Image/team/images/", "https://cfcdn.apcqwd.com/zqwin007/Image/team/images/");
              }

              const leagueLogoUrl = match.leagueLogo
                ? match.leagueLogo.includes("nba.titan007.com")
                  ? match.leagueLogo.replace(
                      "http://nba.titan007.com/",
                      "https://cfcdn.apcqwd.com/nbawin007/"
                    )
                  : match.leagueLogo.replace(
                      "http://zq.titan007.com/",
                      "https://cfcdn.apcqwd.com/zqwin007/"
                    )
                : "";

              const leagueLogoDisplay = leagueLogoUrl
                ? `<img src="${leagueLogoUrl}" alt="${match.leagueEn} Logo" />`
                : '<img src="https://netmoviestvshows.github.io/movie/image-sports/default.png" alt="Default Logo" />';

              const matchStartTime = new Date(match.matchTime_t);
              const currentTime = new Date();
              const timeDiff = Math.floor((currentTime - matchStartTime) / 60000);

              let matchStatus = "";
              let matchTime = "";
              let hideScore = false;

              if (match.matchType === 1) {
                  if (match.state === -1) {
                      matchStatus = '<span class="status-finished">Finished</span>';
                  } else if (match.state === -14) {
                      matchStatus = '<span class="status-postponed">Postponed</span>';
                  } else if (match.state === 0) {
                      const upcomingMinutes = -timeDiff;
                      const upcomingTime = new Date(
                          currentTime.getTime() + upcomingMinutes * 60000
                      );
                      const formattedTime = upcomingTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                      });
                      matchStatus =
                          '<span class="status-not-started">Not Started</span>';
                      matchTime = formattedTime;
                  } else if (match.startTime_t === 0 && match.state === 2) {
                      matchStatus = '<span class="status-half-time">Half Time</span>';
                  } else if (match.state === 1) {
                      const totalMinutes = timeDiff;
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>';
                      matchTime = `${totalMinutes}${totalMinutes > 45 ? "+" : ""} <span class="minutes">mins</span>`;
                  } else if (match.state === 3) {
                      const secondHalfStartTime = new Date(match.startTime_t);
                      const secondHalfTimeDiff = Math.floor(
                          (currentTime - secondHalfStartTime) / 60000
                      );
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>';
                      matchTime = `${45 + secondHalfTimeDiff}${45 + secondHalfTimeDiff > 90 ? "+" : ""} <span class="minutes">mins</span>`;
                  } else if (match.state === 4) {
                      matchStatus = '<span class="status-extra-time">Extra Time</span>';
                      matchTime = `${timeDiff} <span class="minutes">mins</span>`;
                  } else if (match.state === 5) {
                      matchStatus = '<span class="status-penalty">Penalty</span>';
                  } else {
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>';
                      matchTime = `${timeDiff} <span class="minutes">mins</span>`;
                  }
              } else if (match.matchType === 2) {
                  if (match.state === -1) {
                      matchStatus = '<span class="status-finished">Finished</span>';
                  } else if (match.state === -14) {
                      matchStatus = '<span class="status-postponed">Postponed</span>';
                  } else if (match.state === 0) {
                      const upcomingMinutes = -timeDiff;
                      const upcomingTime = new Date(
                          currentTime.getTime() + upcomingMinutes * 60000
                      );
                      const formattedTime = upcomingTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                      });
                      matchStatus =
                          '<span class="status-not-started">Not Started</span>';
                      matchTime = formattedTime;
                  } else if (match.state === 1 || match.state === 2 || match.state === 3 || match.state === 4) {
                      const currentQuarter = match.state;
                      const remainTime = match.remainTime;
                      matchTime = `Q${currentQuarter} ${remainTime}`;
                      if (currentQuarter === 1 || currentQuarter === 2) {
                          matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
                      } else if (currentQuarter === 3) {
                          matchStatus = '<span class="status-half-time">Half Time</span>';
                      } else if (currentQuarter === 4) {
                          matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
                      }
                  } else {
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
                      matchTime = `${timeDiff} <span class="minutes">mins</span>`;
                  }
              } else if (match.matchType === 99) {
                  hideScore = true;
                  if (match.state === -1) {
                      matchStatus = '<span class="status-finished">Finished</span>';
                  } else if (match.state === -14) {
                      matchStatus = '<span class="status-postponed">Postponed</span>';
                  } else if (match.state === 0) {
                      matchStatus = '<span class="status-not-started">Not Started</span>';
                  } else if (match.state === 1) {
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
                  } else {
                      matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
                  }
              } else {
                  matchStatus = '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span>';
              }

              const leagueNameFormatted = match.leagueEn.replace(/[\s/.]/g, "-");

              let cardsHTML = '<div class="cards-wrapper">';

              let homeCardsHTML = "";
              if (match.homeRed > 0) {
                homeCardsHTML += `<div class="card-info card-red">${match.homeRed}</div>`;
              }
              if (match.homeYellow > 0) {
                homeCardsHTML += `<div class="card-info card-yellow">${match.homeYellow}</div>`;
              }

              let awayCardsHTML = "";
              if (match.awayRed > 0) {
                awayCardsHTML += `<div class="card-info card-red">${match.awayRed}</div>`;
              }
              if (match.awayYellow > 0) {
                awayCardsHTML += `<div class="card-info card-yellow">${match.awayYellow}</div>`;
              }

              cardsHTML += `<div class="cards-container">${homeCardsHTML}</div>`;
              cardsHTML += `<div class="cards-container">${awayCardsHTML}</div>`;
              cardsHTML += "</div>";

              const scoreHTML = hideScore ? '' : `
                  <div class="match-score">
                      <span class="match-score-number match-score-number--leading">${match.homeScore}</span>
                      <span class="match-score-divider">:</span>
                      <span class="match-score-number">${match.awayScore}</span>
                  </div>
              `;

              const homeLogoClass = match.matchType === 99 ? 'match-type-99' : '';
              const awayLogoClass = match.matchType === 99 ? 'match-type-99' : '';

              let matchHTML = `
                  <div class="match" onclick="redirectToPage('${match.matchType}',   '${match.teamLink}', '${leagueNameFormatted}', '${match.matchId}')">
                      <div class="match-header">
                          <div class="match-status">${matchStatus}</div>
                          <div class="match-tournament">
                              ${leagueLogoDisplay}
                              ${match.leagueEn}
                          </div>
                          <div class="time-to-watch">
                              <span class="ic--baseline-live-tv ${matchStatus.includes('Not Started') || matchStatus.includes('Finished') || matchStatus.includes('Postponed') ? 'icon-grey' : ''}"></span>
                          </div>
                      </div>
                      <div class="match-content">
                          <div class="column">
                              <div class="team team--home">
                                  <div class="team-logo">
                                      <img class="${homeLogoClass}" src="${updatedHomeLogoUrl}?v=1" alt="${match.homeName} Logo" />
                                  </div>
                                  <h5 class="team-name">${match.homeName}</h5>
                              </div>
                          </div>
                          <div class="column">
                              <div class="match-details">                       
                                  ${scoreHTML}
                                  <div class="cards-wrapper">
                                      ${cardsHTML}
                                  </div>
                                  <div class="match-date">${new Date(match.matchTime_t).toLocaleString([], { hour12: false })}</div>
                                  <div class="match-time-lapsed">${matchTime}</div>
                              </div>
                          </div>
                          <div class="column">
                              <div class="team team--away">
                                  <div class="team-logo">
                                      <img class="${awayLogoClass}" src="${updatedAwayLogoUrl}?v=1" alt="${match.awayName} Logo" />
                                  </div>
                                  <h5 class="team-name">${match.awayName}</h5>
                              </div>
                          </div>
                      </div>
                  </div>
              `;

              if (match.matchType === 1) {
                  schedulesHTML += matchHTML;
              } else if (match.matchType === 2) {
                  nbaSchedulesHTML += matchHTML;
              } else if (match.matchType === 99) {
                  othersHTML += matchHTML;
              }
            });

            schedulesContainer.innerHTML = schedulesHTML;
            nbaSchedulesContainer.innerHTML = nbaSchedulesHTML;
            othersContainer.innerHTML = othersHTML;
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
            document.getElementById("live-schedules").innerText =
              "Terjadi kesalahan saat mengambil data.";
            document.getElementById("nba-schedules").innerText =
              "Terjadi kesalahan saat mengambil data.";
            document.getElementById("others-content").innerText =
              "Terjadi kesalahan saat mengambil data.";
          });
      }

      // Memanggil fungsi untuk pertama kali
      fetchAndUpdateSchedules();

      // Mengatur interval untuk memperbarui data setiap 60 detik (60000 ms)
      setInterval(fetchAndUpdateSchedules, 60000);

      // Fungsi untuk mengambil dan memperbarui data NFL
      function fetchAndUpdateNFLData() {
          fetch('https://stats-api.sportsnet.ca/ticker?league=nfl')
              .then(response => response.json())
              .then(data => {
                  console.log(data); // Menampilkan data di console log

                  const nflDataElement = document.getElementById('nflData');
                  nflDataElement.innerHTML = ''; // Kosongkan konten sebelumnya

                  // Memeriksa apakah ada game yang tersedia
                  if (data.data && data.data.games && data.data.games.length > 0) {
                      data.data.games.forEach(game => {
                          const gameDiv = document.createElement('div');
                          gameDiv.className = 'match'; // Menggunakan kelas yang sama dengan live-schedules

                           // Menentukan nama negara
                           const countryName = game.country === "USA" ? "American" : game.country;

                           // Menambahkan informasi waktu pertandingan
let matchTimeLapsedHTML = '';
if (game.period && game.period > 0) {
    let periodSuffix;
    switch (game.period) {
        case 1:
            periodSuffix = 'st';
            break;
        case 2:
            periodSuffix = 'nd';
            break;
        case 3:
            periodSuffix = 'rd';
            break;
        default:
            periodSuffix = 'th'; // Untuk nilai 4 dan seterusnya
            break;
    }
    matchTimeLapsedHTML = `<div class="match-time-lapsed">${game.period}${periodSuffix} ${game.clock}</div>`;
}

                      // Menambahkan informasi game
                      gameDiv.innerHTML = `
                          <div class="match-header">
                              <div class="match-status">${game.game_status === "In-Progress" ? '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>' : game.game_status === "Final" ? '<span class="status-finished">Finished</span>' : game.game_status}</div>
                              <div class="match-tournament">
                                  ${countryName} ${game.sport} : <span style="text-transform: uppercase;">${game.league}</span>, <span style="text-transform: lowercase;">${game.type}</span>
                              </div>
                              <div onclick="window.location.href=''" class="time-to-watch"><span class="ic--baseline-live-tv "></span>
                              </div>
                          </div>
                          <div class="match-content">
                              <div class="column">
                                  <div class="team team--home">
                                      <div class="team-logo">
                                          <img src="${game.home_team.img_url_90}" alt="${game.home_team.name} Logo" />
                                      </div>
                                      <h5 class="team-name">${game.home_team.name}</h5>
                                  </div>
                              </div>
                              <div class="column">
                                  <div class="match-details">
                                      <div class="match-score">
                                          <span class="match-score-number match-score-number--leading">${game.home_team.score}</span>
                                          <span class="match-score-divider">:</span>
                                          <span class="match-score-number">${game.visiting_team.score}</span>
                                      </div>
                                      <div class="match-date">${new Date(game.datetime).toLocaleString()}</div>
                                      ${matchTimeLapsedHTML} <!-- Menampilkan waktu jika ada -->
                                  </div>
                              </div>
                              <div class="column">
                                  <div class="team team--away">
                                      <div class="team-logo">
                                          <img src="${game.visiting_team.img_url_90}" alt="${game.visiting_team.name} Logo" />
                                      </div>
                                      <h5 class="team-name">${game.visiting_team.name}</h5>
                                  </div>
                              </div>
                          </div>
                          <div class="match-stadium">Stadium: ${game.location}</div>
                      `;

                      // Menambahkan background image
                      gameDiv.style.backgroundImage = `url(/images/bg-american-football.jpg)`;
                      gameDiv.style.backgroundSize = 'contain'; // Mengatur ukuran background
                      gameDiv.style.backgroundPosition = 'center'; // Mengatur posisi background
                      gameDiv.style.backgroundRepeat = 'no-repeat'; // Mengatur pengulangan background
                      // gameDiv.style.color = 'black'; // Mengubah warna teks agar kontras dengan background

                      nflDataElement.appendChild(gameDiv);
                  });
              } else {
                  nflDataElement.innerHTML = '<p>No Match</p>';
              }
          })
          .catch(error => console.error('Error fetching NFL data:', error));
      }

      // Memanggil fungsi untuk pertama kali
      fetchAndUpdateNFLData();

      // Mengatur interval untuk memperbarui data NFL setiap 60 detik (60000 ms)
      setInterval(fetchAndUpdateNFLData, 60000);

      // Fungsi untuk mengambil dan memperbarui data MLB
      function fetchAndUpdateMLBData() {
          fetch('https://stats-api.sportsnet.ca/ticker?league=mlb')
              .then(response => response.json())
              .then(data => {
                  console.log(data); // Menampilkan data di console log

                  const mlbDataElement = document.getElementById('mlbData'); // Ganti dengan ID yang sesuai
                  mlbDataElement.innerHTML = ''; // Kosongkan konten sebelumnya

                  // Memeriksa apakah ada game yang tersedia
                  if (data.data && data.data.games && data.data.games.length > 0) {
                      data.data.games.forEach(game => {
                          const gameDiv = document.createElement('div');
                          gameDiv.className = 'match'; // Menggunakan kelas yang sama dengan live-schedules

                          // Menentukan nama negara
                          const countryName = game.country === "USA" ? "American" : game.country;

                          // Menambahkan informasi waktu pertandingan
                          let matchTimeLapsedHTML = '';
                          if (game.period && game.period > 0) {
                              let periodSuffix;
                              switch (game.period) {
                                  case 1:
                                      periodSuffix = 'st';
                                      break;
                                  case 2:
                                      periodSuffix = 'nd';
                                      break;
                                  case 3:
                                      periodSuffix = 'rd';
                                      break;
                                  default:
                                      periodSuffix = 'th'; // Untuk nilai 4 dan seterusnya
                                      break;
                              }
                              matchTimeLapsedHTML = `<div class="match-time-lapsed">${game.period}${periodSuffix} ${game.clock}</div>`;
                          }

                          // Menambahkan informasi game
                          gameDiv.innerHTML = `
                              <div class="match-header">
                                  <div class="match-status">${game.game_status === "In-Progress" ? '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>' : game.game_status === "Final" ? '<span class="status-finished">Finished</span>' : game.game_status}</div>
                                  <div class="match-tournament">
                                      ${countryName} ${game.sport} : <span style="text-transform: uppercase;">${game.league}</span>, <span style="text-transform: lowercase;">${game.type}</span>
                                  </div>
                                  <div onclick="window.location.href=''" class="time-to-watch"><span class="ic--baseline-live-tv "></span>
                                  </div>
                              </div>
                              <div class="match-content">
                                  <div class="column">
                                      <div class="team team--home">
                                          <div class="team-logo">
                                              <img src="${game.home_team.img_url_90}" alt="${game.home_team.name} Logo" />
                                          </div>
                                          <h5 class="team-name">${game.home_team.name}</h5>
                                      </div>
                                  </div>
                                  <div class="column">
                                      <div class="match-details">
                                          <div class="match-score">
                                              <span class="match-score-number match-score-number--leading">${game.home_team.score}</span>
                                              <span class="match-score-divider">:</span>
                                              <span class="match-score-number">${game.visiting_team.score}</span>
                                          </div>
                                          <div class="match-date">${new Date(game.datetime).toLocaleString()}</div>
                                          ${matchTimeLapsedHTML} <!-- Menampilkan waktu jika ada -->
                                      </div>
                                  </div>
                                  <div class="column">
                                      <div class="team team--away">
                                          <div class="team-logo">
                                              <img src="${game.visiting_team.img_url_90}" alt="${game.visiting_team.name} Logo" />
                                          </div>
                                          <h5 class="team-name">${game.visiting_team.name}</h5>
                                      </div>
                                  </div>
                              </div>
                              <div class="match-stadium">Stadium: ${game.location}</div>
                          `;

                          // Menambahkan background image
                          gameDiv.style.backgroundImage = `url(/images/bg-baseball.jpg)`; // Ganti dengan gambar yang sesuai
                          gameDiv.style.backgroundSize = 'contain'; // Mengatur ukuran background
                          gameDiv.style.backgroundPosition = 'center'; // Mengatur posisi background
                          gameDiv.style.backgroundRepeat = 'no-repeat'; // Mengatur pengulangan background
                          // gameDiv.style.color = 'black'; // Mengubah warna teks agar kontras dengan background

                          mlbDataElement.appendChild(gameDiv);
                      });
                  } else {
                      mlbDataElement.innerHTML = '<p>No Match</p>';
                  }
              })
              .catch(error => console.error('Error fetching MLB data:', error));
      }

      // Memanggil fungsi untuk pertama kali
      fetchAndUpdateMLBData();

      // Mengatur interval untuk memperbarui data MLB setiap 60 detik (60000 ms)
      setInterval(fetchAndUpdateMLBData, 60000);

    //  NHL DISINI
     // Fungsi untuk mengambil dan memperbarui data MLB
     function fetchAndUpdateMLBData() {
          fetch('https://stats-api.sportsnet.ca/ticker?league=nhl')
              .then(response => response.json())
              .then(data => {
                  console.log(data); // Menampilkan data di console log

                  const mlbDataElement = document.getElementById('nhlData'); // Ganti dengan ID yang sesuai
                  mlbDataElement.innerHTML = ''; // Kosongkan konten sebelumnya

                  // Memeriksa apakah ada game yang tersedia
                  if (data.data && data.data.games && data.data.games.length > 0) {
                      data.data.games.forEach(game => {
                          const gameDiv = document.createElement('div');
                          gameDiv.className = 'match'; // Menggunakan kelas yang sama dengan live-schedules

                          // Menentukan nama negara
                          const countryName = game.country === "USA" ? "American" : game.country;

                          // Menambahkan informasi waktu pertandingan
                          let matchTimeLapsedHTML = '';
                          if (game.period && game.period > 0) {
                              let periodSuffix;
                              switch (game.period) {
                                  case 1:
                                      periodSuffix = 'st';
                                      break;
                                  case 2:
                                      periodSuffix = 'nd';
                                      break;
                                  case 3:
                                      periodSuffix = 'rd';
                                      break;
                                  default:
                                      periodSuffix = 'th'; // Untuk nilai 4 dan seterusnya
                                      break;
                              }
                              matchTimeLapsedHTML = `<div class="match-time-lapsed">${game.period}${periodSuffix} ${game.clock}</div>`;
                          }

                          // Menambahkan informasi game
                          gameDiv.innerHTML = `
                              <div class="match-header">
                                  <div class="match-status">${game.game_status === "In-Progress" ? '<span class="status-live">Live <span class="nrk--media-direkte-golive blink"></span></span>' : game.game_status === "Final" ? '<span class="status-finished">Finished</span>' : game.game_status}</div>
                                  <div class="match-tournament">
                                      ${countryName} ${game.sport} : <span style="text-transform: uppercase;">${game.league}</span>, <span style="text-transform: lowercase;">${game.type}</span>
                                  </div>
                                  <div onclick="window.location.href=''" class="time-to-watch"><span class="ic--baseline-live-tv "></span>
                                  </div>
                              </div>
                              <div class="match-content">
                                  <div class="column">
                                      <div class="team team--home">
                                          <div class="team-logo">
                                              <img src="${game.home_team.img_url_90}" alt="${game.home_team.name} Logo" />
                                          </div>
                                          <h5 class="team-name">${game.home_team.name}</h5>
                                      </div>
                                  </div>
                                  <div class="column">
                                      <div class="match-details">
                                          <div class="match-score">
                                              <span class="match-score-number match-score-number--leading">${game.home_team.score}</span>
                                              <span class="match-score-divider">:</span>
                                              <span class="match-score-number">${game.visiting_team.score}</span>
                                          </div>
                                          <div class="match-date">${new Date(game.datetime).toLocaleString()}</div>
                                          ${matchTimeLapsedHTML} <!-- Menampilkan waktu jika ada -->
                                      </div>
                                  </div>
                                  <div class="column">
                                      <div class="team team--away">
                                          <div class="team-logo">
                                              <img src="${game.visiting_team.img_url_90}" alt="${game.visiting_team.name} Logo" />
                                          </div>
                                          <h5 class="team-name">${game.visiting_team.name}</h5>
                                      </div>
                                  </div>
                              </div>
                              <div class="match-stadium">Stadium: ${game.location}</div>
                          `;

                          // Menambahkan background image
                          gameDiv.style.backgroundImage = `url(/images/bg-baseball.jpg)`; // Ganti dengan gambar yang sesuai
                          gameDiv.style.backgroundSize = 'contain'; // Mengatur ukuran background
                          gameDiv.style.backgroundPosition = 'center'; // Mengatur posisi background
                          gameDiv.style.backgroundRepeat = 'no-repeat'; // Mengatur pengulangan background
                          // gameDiv.style.color = 'black'; // Mengubah warna teks agar kontras dengan background

                          mlbDataElement.appendChild(gameDiv);
                      });
                  } else {
                      mlbDataElement.innerHTML = '<p>No Match</p>';
                  }
              })
              .catch(error => console.error('Error fetching MLB data:', error));
      }

      // Memanggil fungsi untuk pertama kali
      fetchAndUpdateMLBData();

      // Mengatur interval untuk memperbarui data MLB setiap 60 detik (60000 ms)
      setInterval(fetchAndUpdateMLBData, 60000);
     
      function openTab(tabName) {
        // Sembunyikan semua konten tab
        const tabContents = document.getElementsByClassName('tab-content');
        for (let content of tabContents) {
          content.classList.remove('active');
        }

        // Nonaktifkan semua tombol tab
        const tabButtons = document.getElementsByClassName('tab-btn');
        for (let button of tabButtons) {
          button.classList.remove('active');
        }

        // Tampilkan konten tab yang dipilih
        document.getElementById(tabName).classList.add('active');
        
        // Aktifkan tombol tab yang dipilih
        event.currentTarget.classList.add('active');
      }

      function redirectToPage(matchType, teamLink, leagueNameFormatted, matchId) {
        let url = '';
        if (matchType === '1') {
          url = `/p/soccer.html?live=${teamLink}&p=${leagueNameFormatted}&id=${matchId}`;
        } else if (matchType === '2') {
          url = `/p/basketball.html?live=${teamLink}&p=${leagueNameFormatted}&id=${matchId}`;
        // } else if (matchType === 'nfl') {
        //   url = `/p/football.html?live=${homeName}-vs-${awayName}&p=${leagueNameFormatted}&id=${matchId}`;
        } else {
          url = `/p/others.html?live=${teamLink}&p=${leagueNameFormatted}&id=${matchId}`;
        }
        window.location.href = url; // Redirect ke URL yang sesuai
      }
