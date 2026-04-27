const recipes = [
    { id: 1, "recipe title": "Червоний борщ", meta: { time: 90, diff: "Medium" }, ingredients: 12, "is spicy": false },
    { id: 2, "recipe title": "Паста Карбонара", meta: { time: 25, diff: "Easy" }, ingredients: 6, "is spicy": false },
    { id: 3, "recipe title": "Тайський карі", meta: { time: 40, diff: "Hard" }, ingredients: 15, "is spicy": true },
    { id: 4, "recipe title": "Салат Цезар", meta: { time: 15, diff: "Easy" }, ingredients: 8, "is spicy": false },
    { id: 5, "recipe title": "Чізкейк", meta: { time: 120, diff: "Hard" }, ingredients: 10, "is spicy": false }
];

const fastRecipes = recipes.filter(r => r.meta.time < 40);
console.log("Швидкі рецепти (filter):", fastRecipes);

const recipeNames = recipes.map(r => r["recipe title"]);
console.log("Список назв (map):", recipeNames);

const uniqueDiffs = new Set(recipes.map(r => r.meta.diff));
console.log("Унікальні складності (Set):", [...uniqueDiffs]);

const timeList = new Map();
recipes.forEach(r => timeList.set(r["recipe title"], r.meta.time));
console.log("Час приготування 'Тайський карі' (Map):", timeList.get("Тайський карі") + " хв");



const btn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const output = document.getElementById("output");

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