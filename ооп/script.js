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

        if (!value) {
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
            const item = document.createElement("div");
            item.classList.add("border", "p-2", "mb-2");
            item.textContent = recipe["recipe title"];
            cart.appendChild(item);
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

        if (!event.target.closest("button")) {
            card.classList.toggle("active");
        }
    });
}

const categorySelect = document.getElementById("categorySelect");

if (categorySelect) {
    const categories = [...new Set(recipes.map(r => r.meta.diff))];

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
    recipeMap.set(r["recipe title"].toLowerCase(), r.meta.time);
});

if (liveSearch && priceOutput) {
    liveSearch.addEventListener("input", () => {
        const value = liveSearch.value.toLowerCase();

        const found = [...recipeMap.keys()].find(key =>
            key.includes(value)
        );

        if (found) {
            priceOutput.textContent =
                "Час приготування: " + recipeMap.get(found) + " хв";
        } else {
            priceOutput.textContent = "Не знайдено";
        }
    });
}


const form = document.forms.contactForm;

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const messageField = form.elements.message;
        const messageValue = messageField.value.toLowerCase();

        messageField.setCustomValidity(
            messageValue.includes("спам") || messageValue.includes("реклама")
                ? "Заборонено"
                : ""
        );

        if (form.checkValidity()) {

            const formObject = Object.fromEntries(new FormData(form));

            console.log("Зібрані дані форми:", formObject);

            alert("OK");
            form.reset();

        } else {
            form.reportValidity();
        }
    });
}

/* Клієнтська валідація не є безпечною, тому що користувач може її обійти
(змінити HTML, вимкнути JavaScript або відправити запит напряму).
Тому серверна валідація є обов’язковою — це "золоте правило безпеки". */

class CartManager {

    constructor() {
        this.cart = JSON.parse(localStorage.getItem("recipeCart")) || [];
    }

    addToCart(product) {
        this.cart.push(product);
        this.saveCart();
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem("recipeCart", JSON.stringify(this.cart));
    }

    getCart() {
        return this.cart;
    }
}

const cartManager = new CartManager();

async function loadProducts() {

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );

        if (!response.ok) {
            throw new Error("Fetch error");
        }

        const data = await response.json();

        renderProducts(data.meals);

    } catch (error) {

        console.error(error);

        const container = document.getElementById("recipesContainer");

        if (container) {
            container.innerHTML =
                "<p class='text-danger'>Не вдалося завантажити рецепти</p>";
        }
    }
}

function renderProducts(meals) {

    const container = document.getElementById("recipesContainer");
    if (!container) return;

    container.innerHTML = "";

    meals.forEach(meal => {

        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card shadow h-100">

                <img src="${meal.strMealThumb}" class="card-img-top">

                <div class="card-body">

                    <h5>${meal.strMeal}</h5>

                    <p>${meal.strCategory || ""}</p>

                    <button class="btn btn-success add-btn"
                        data-id="${meal.idMeal}"
                        data-title="${meal.strMeal}">
                        В кошик
                    </button>

                </div>
            </div>
        `;

        container.appendChild(col);
    });

    initCartButtons();
}

function initCartButtons() {

    document.querySelectorAll(".add-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const item = {
                id: btn.dataset.id,
                title: btn.dataset.title
            };

            cartManager.addToCart(item);

            renderCart();
            updateCounter();
        });
    });
}


function renderCart() {

    const cartBox = document.getElementById("cart");
    if (!cartBox) return;

    cartBox.innerHTML = "";

    cartManager.getCart().forEach(item => {

        const div = document.createElement("div");

        div.className = "border p-2 mb-2 d-flex justify-content-between";

        div.innerHTML = `
            <span>${item.title}</span>
            <button class="btn btn-sm btn-danger"
                onclick="deleteItem('${item.id}')">
                X
            </button>
        `;

        cartBox.appendChild(div);
    });
}


function deleteItem(id) {

    cartManager.removeFromCart(id);

    renderCart();
    updateCounter();
}

function updateCounter() {

    const counter = document.getElementById("cartCounter");

    if (!counter) return;

    counter.textContent =
        `Кошик: ${cartManager.getCart().length} рецептів`;
}

const clearBtn = document.getElementById("clearCartBtn");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        cartManager.clearCart();

        renderCart();
        updateCounter();
    });
}

loadProducts();
renderCart();
updateCounter();