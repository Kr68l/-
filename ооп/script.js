const recipes = [
    { id: 1, "recipe title": "Червоний борщ", meta: { time: 90, diff: "Medium" }, ingredients: 12, "is spicy": false },
    { id: 2, "recipe title": "Паста Карбонара", meta: { time: 25, diff: "Easy" }, ingredients: 6, "is spicy": false },
    { id: 3, "recipe title": "Тайський карі", meta: { time: 40, diff: "Hard" }, ingredients: 15, "is spicy": true },
    { id: 4, "recipe title": "Салат Цезар", meta: { time: 15, diff: "Easy" }, ingredients: 8, "is spicy": false },
    { id: 5, "recipe title": "Чізкейк", meta: { time: 120, diff: "Hard" }, ingredients: 10, "is spicy": false }
];

const btn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const output = document.getElementById("output");

if (btn && input && output) {

    btn.addEventListener("click", () => {

        const value = input.value.trim().toLowerCase();

        if (value === "") {
            output.innerHTML = "<p class='text-muted'>Введіть назву для пошуку...</p>";
            return;
        }

        const result = recipes.find(r =>
            r["recipe title"].toLowerCase().includes(value)
        );

        if (!result) {
            output.innerHTML = "<p style='color:red;'>Рецепт не знайдено</p>";
            return;
        }

        output.innerHTML = `
            <p><b>Назва:</b> ${result["recipe title"]}</p>
            <p><b>Час:</b> ${result.meta.time} хв</p>
            <p><b>Складність:</b> ${result.meta.diff}</p>
            <p><b>Інгредієнти:</b> ${result.ingredients}</p>
        `;
    });
}

const recipesContainer = document.getElementById("recipesContainer");
const cart = document.getElementById("cart");

if (recipesContainer) {

    const fragment = document.createDocumentFragment();

    recipes.forEach(recipe => {

        const col = document.createElement("div");
        col.classList.add("col-md-4");

        const card = document.createElement("div");
        card.classList.add("card", "shadow", "h-100");

        const body = document.createElement("div");
        body.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = recipe["recipe title"];

        const time = document.createElement("p");
        time.textContent = `Час: ${recipe.meta.time} хв`;

        const diff = document.createElement("p");
        diff.textContent = `Складність: ${recipe.meta.diff}`;

        const btnDetails = document.createElement("button");
        btnDetails.classList.add("btn", "btn-primary", "me-2");
        btnDetails.textContent = "Детальніше";

        const btnCart = document.createElement("button");
        btnCart.classList.add("btn", "btn-success");
        btnCart.textContent = "В кошик";

        btnDetails.addEventListener("click", () => {
            alert(
                `Рецепт: ${recipe["recipe title"]}\n` +
                `Час: ${recipe.meta.time} хв\n` +
                `Складність: ${recipe.meta.diff}\n` +
                `Інгредієнтів: ${recipe.ingredients}`
            );
        });

        btnCart.addEventListener("click", () => {

            const clone = card.cloneNode(true);
            clone.classList.add("mb-2");

            cart.appendChild(clone);

        });

        body.append(title, time, diff, btnDetails, btnCart);
        card.append(body);
        col.append(card);
        fragment.append(col);

    });

    recipesContainer.append(fragment);
}


if (recipesContainer) {

    recipesContainer.addEventListener("click", (event) => {

        const card = event.target.closest(".card");
        if (!card) return;

        // підсвітка картки
        if (!event.target.closest("button")) {
            card.classList.toggle("active");
            return;
        }

    });
}


const categorySelect = document.getElementById("categorySelect");

if (categorySelect) {

    const categories = new Set(
        recipes.map(r => r.meta.diff)
    );

    categories.forEach(cat => {

        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;

        categorySelect.append(option);

    });
}

const liveSearch = document.getElementById("liveSearch");
const priceOutput = document.getElementById("priceOutput");

const recipeMap = new Map();

recipes.forEach(r => {
    recipeMap.set(
        r["recipe title"].toLowerCase(),
        r.meta.time
    );
});

if (liveSearch && priceOutput) {

    liveSearch.addEventListener("input", () => {

        const value = liveSearch.value.toLowerCase();

        if (recipeMap.has(value)) {
            priceOutput.textContent =
                "Час приготування: " +
                recipeMap.get(value) + " хв";
        } else {
            priceOutput.textContent = "Не знайдено";
        }

    });

}
