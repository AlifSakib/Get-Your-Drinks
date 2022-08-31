//Loading Data
const loadData = async () => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all`
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
      newLi.classList.add("bg-red-500");
      //   newLi.textContent = drink.strCategory;
      newLi.innerHTML = `
    <span class="text-white">${drink.strCategory}</span>
    `;
      cataroriesUl.appendChild(newLi);
    }
  });
};

const displayDrinks = async () => {
  const data = await loadData();
  const drinks = data.drinks;
  console.log(drinks[0]);
  const drinkContainer = document.getElementById("drinks-container");

  drinks.forEach((drink) => {
    const drinksDiv = document.createElement("div");
    const { strDrink: name, strDrinkThumb: image } = drink;
    drinksDiv.classList.add("card");
    drinksDiv.classList.add("w-96");
    drinksDiv.classList.add("bg-base-100");
    drinksDiv.classList.add("shadow-xl");
    drinksDiv.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>

    `;
    drinkContainer.appendChild(drinksDiv);
  });
};

displayDrinks();
displayCatagories();
