//Loading Data
const loadData = async () => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
  );
  const data = await res.json();
  return data;
};

// Creating Catagories
const displayCatagories = async () => {
  const data = await loadData();
  const drinks = data.drinks;
  const uniqueCatagories = [];
  const cataroriesUl = document.getElementById("catarories-ul");
  const newLi = document.createElement("li");
  newLi.textContent = drinks.forEach((drink) => {
    // Filtering Catagories
    if (uniqueCatagories.indexOf(drink.strCategory) === -1) {
      uniqueCatagories.push(drink.strCategory);
      const newLi = document.createElement("li");
      newLi.classList.add("border-2");
      newLi.classList.add("py-2");
      newLi.classList.add("px-4");
      newLi.classList.add("rounded-lg");
      newLi.classList.add("hover:bg-orange-500");
      //   newLi.textContent = drink.strCategory;
      newLi.innerHTML = `
    <span class="">${drink.strCategory}</span>
    `;
      cataroriesUl.appendChild(newLi);
    }
  });
};
// Display Drinks

const searchField = document.getElementById("search-field");
searchField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const searchInput = searchField.value;
    searchProgress(true);
    const displayDrinks = async (search) => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await res.json();

      const drinks = data.drinks;

      const drinkContainer = document.getElementById("drinks-container");
      drinkContainer.innerHTML = "";

      drinks.forEach((drink) => {
        const drinksDiv = document.createElement("div");
        const {
          strDrink: name,
          strDrinkThumb: image,
          strInstructions: instruction,
        } = drink;
        drinksDiv.classList.add("card");
        drinksDiv.classList.add("w-94");
        drinksDiv.classList.add("bg-base-100");
        drinksDiv.classList.add("shadow-xl");
        drinksDiv.innerHTML = `
    <figure class="">
    <img src="${image}" alt="Shoes" class="rounded-t-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${name}</h2>
    <p>${instruction.slice(0, 50)}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Show Details</button>
    </div>
  </div>

    `;
        drinkContainer.appendChild(drinksDiv);
      });
      searchProgress();
    };
    displayDrinks(searchInput);
  }
});

function searchProgress(isTrue) {
  const progress = document.getElementById("progress");

  if (isTrue === true) {
    progress.classList.remove("hidden");
  } else {
    progress.classList.add("hidden");
  }
}
// displayDrinks("");
displayCatagories();
