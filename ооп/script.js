const recipes = [
    { id: 1, "recipe title": "Червоний борщ", meta: { time: 90, diff: "Medium" }, ingredients: 12, "is spicy": false },
    { id: 2, "recipe title": "Паста Карбонара", meta: { time: 25, diff: "Easy" }, ingredients: 6, "is spicy": false },
    { id: 3, "recipe title": "Тайський карі", meta: { time: 40, diff: "Hard" }, ingredients: 15, "is spicy": true },
    { id: 4, "recipe title": "Салат Цезар", meta: { time: 15, diff: "Easy" }, ingredients: 8, "is spicy": false },
    { id: 5, "recipe title": "Чізкейк", meta: { time: 120, diff: "Hard" }, ingredients: 10, "is spicy": false }
];


const fastRecipes = recipes.filter(r => r.meta.time < 30);
console.log("Швидкі рецепти:", fastRecipes);


// 2. MAP — тільки назви
const recipeNames = recipes.map(r => r["recipe title"]);
console.log("Назви рецептів:", recipeNames);


const uniqueDiff = new Set(recipes.map(r => r.meta.diff));
console.log("Унікальні складності:", [...uniqueDiff]);


const recipeMap = new Map();
recipes.forEach(r => recipeMap.set(r["recipe title"], r.meta.time));

console.log("Час Карбонара:", recipeMap.get("Паста Карбонара"));