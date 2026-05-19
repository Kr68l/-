<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог рецептів</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="../script.js" defer></script>
</head>

<body>

<div class="container">

<header class="py-3 text-center">
    <h1>Каталог рецептів</h1>

    <nav>
        <a class="btn btn-outline-primary" href="Collection of culinary recipes.html">Головна</a>
        <a class="btn btn-primary" href="catalog.html">Каталог</a>
        <a class="btn btn-outline-primary" href="contacts.html">Контакти</a>
    </nav>
</header>

<main>
    <section class="my-4">
        <h2>Фільтр категорій</h2>
        <select id="categorySelect" class="form-select"></select>
    </section>
    
    <section class="my-4">
        <h2>Швидкий пошук</h2>
        <input id="liveSearch" class="form-control" placeholder="Введіть назву">
        <p id="priceOutput" class="mt-2"></p>
    </section>
    
    <section class="my-4">
        <h2>Кошик</h2>
        <div id="cart" class="border p-3"></div>
    </section>
    
    <section class="my-4">

        <h2>Пошук рецепту</h2>
    
        <div class="row g-3">
    
            <div class="col-md-8">
                <input
                    type="text"
                    id="searchInput"
                    class="form-control"
                    placeholder="Наприклад: борщ">
            </div>
    
            <div class="col-md-4">
                <button
                    type="button"
                    id="searchBtn"
                    class="btn btn-success w-100">
                    Пошук
                </button>
            </div>
    
        </div>
    
    </section>
    
    <section class="my-4">
    
        <h2>Результат</h2>
    
        <div id="output" class="p-3 border rounded"></div>
    
    </section>
    
    <section class="my-4">
        <h2>Каталог рецептів</h2>
        <div id="recipesContainer" class="row g-4"></div>
    </section>
    
    <section class="my-4">
    
        <h2>Розрахунок порцій</h2>
    
        <form class="row g-3">
    
            <div class="col-md-6">
                <label class="form-label">Базові порції:</label>
                <input type="number" class="form-control" value="2">
            </div>
    
            <div class="col-md-6">
                <label class="form-label">Потрібно порцій:</label>
                <input type="number" class="form-control">
            </div>
    
            <div class="col-12">
                <button class="btn btn-primary">Розрахувати</button>
            </div>
    
        </form>
    
    </section>
    
</main>
    
    <footer class="text-center py-3">
        <p>© 2026 Збірник рецептів</p>
    </footer>
    
    </div>
    
    <script src="script.js"></script>
    
</body>
</html>
