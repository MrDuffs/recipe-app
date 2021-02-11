const searchForm = document.querySelector(".search-container");
const searchResult = document.querySelector(".search-result");
let searchQuery = '';

const APP_ID = "9d4d0fa0"; 
const APP_key = "ca3216862985e9502be770982157d437";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="img">
                <div class="flex-container">
                    <h2 class="item-name">${result.recipe.label}</h2>
                    <a href="${result.recipe.url}" target="_blank" class="item-link">View recipe</a>
                </div>
                <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
                <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
            </div>
        `;
    });
    searchResult.innerHTML = generatedHTML;
}