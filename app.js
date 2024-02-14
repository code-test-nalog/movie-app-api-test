const apiKey = "e546593458598efbf84e3498ddc6db6a";
const posterPath = "https://image.tmdb.org/t/p/w500";
const apiUrl = "https://api.themoviedb.org/3/search/movie?";

const searchInput = document.querySelector("input");
const resultsContainer = document.querySelector("#results");
const loader = document.querySelector(".lds-roller");

const getResults = async (event) => {
  if (event.key === "Enter") {
    resultsContainer.innerHTML = "";
    loader.style.display = "block";
    const data = await getData();
    loader.style.display = "none";
    renderResults(data.results);
  }
};

const getData = async () => {
  try {
    const response = await fetch(
      `${apiUrl}query=${searchInput.value}&api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderResults = (data) => {
  resultsContainer.innerHTML = "";

  if (!data.length) {
    resultsContainer.innerHTML = `<p class="no-results">No results found for your search</p>`;
  } else {
    let html = "";
    for (let i in data) {
      html += `
      <div class="card">`;
      if (!data[i].poster_path) {
        html += `
        <div class="card-image">
          <img src="placeholder.png" alt="Movie Poster" loading="lazy">
        </div>`;
      } else {
        html += `
        <div class="card-image">
          <img src="${posterPath}${data[i].poster_path}" alt="Movie Poster" loading="lazy">
        </div>`;
      }
      html += `
      <div class="card-info">
        <h3>${data[i].title}</h3>
        <p>${data[i].release_date}</p>
        <p>User Score: ${data[i].vote_average.toFixed(1)}/10</p>
      </div>

      </div>`;
    }

    resultsContainer.innerHTML = html;
  }
};

searchInput.addEventListener("keypress", getResults);
