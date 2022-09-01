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
      newLi.classList.add("bg-white");
      newLi.classList.add("hover:bg-slate-300");
      //   newLi.textContent = drink.strCategory;
      newLi.innerHTML = `
    <span class="text-black">${drink.strCategory}</span>
    `;
      cataroriesUl.appendChild(newLi);
    }
  });
};

const searchField = document.getElementById("search-field");

searchField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const searchInput = searchField.value;

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

    const loadDrinks = async () => {
      const res = await fetch(url);
      const data = await res.json();
      displayDrinks(data.drinks);
    };
    loadDrinks();
  }
});

const displayDrinks = (drinks) => {
  const drinksContainer = document.getElementById("drinks-container");
  drinksContainer.innerHTML = "";
  console.log(drinks);
  if (!drinks) {
  } else {
    drinks.forEach((drink) => {
      if (drinks.length === 0) {
        console.log("No data");
      }
      const drinksDiv = document.createElement("div");
      drinksDiv.classList.add("card");
      drinksDiv.classList.add("w-60");
      drinksDiv.classList.add("h-auto");

      drinksDiv.classList.add("bg-base-100");
      drinksDiv.classList.add("shadow-xl");

      const { strDrink: name, strDrinkThumb: image } = drink;
      drinksDiv.innerHTML = `
    <figure class="">
    <img src=${image} alt="Drinks" class="rounded-t-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;

      drinksContainer.appendChild(drinksDiv);
    });
  }
};

displayCatagories();
