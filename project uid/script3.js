// SELECTED INGREDIENTS ARRAY

let selectedIngredients = [];

// SELECT INGREDIENT

function selectIngredient(item){

    // CHECK DUPLICATE

    if(!selectedIngredients.includes(item)){

        selectedIngredients.push(item);

        displayIngredients();
    }
}
// DISPLAY INGREDIENTS INSIDE INPUT

function displayIngredients(){

    const ingredientInput =

    document.getElementById(
        "ingredientInput"
    );

    ingredientInput.value =

    selectedIngredients.join(", ");
}
// SEARCH USING INGREDIENTS
function searchByIngredients(){

    // GET INPUT VALUE

    const ingredientInput =

    document.getElementById(
        "ingredientInput"
    ).value;

    // CONVERT TO ARRAY

    const ingredients =

    ingredientInput
    .split(",")

    .map(item => item.trim())

    .filter(item => item !== "");

    // SAVE

    localStorage.setItem(

        "ingredients",

        JSON.stringify(ingredients)
    );
    // GO TO RECIPE PAGE
    window.location.href =
    "recipe.html";
}
// SEARCH RECIPE DIRECTLY

function searchRecipe(){

    const recipeName =

    document.getElementById(
        "recipeSearch"
    ).value.toLowerCase();

    // CHECK AVAILABLE

    const recipeExists =

    recipes.some(recipe =>

        recipe.name
        .toLowerCase()
        .includes(recipeName)
    );
    // IF FOUND

    if(recipeExists){

        localStorage.setItem(

            "recipeSearch",

            recipeName
        );

        window.location.href =
        "recipe.html";
    }

    // NOT FOUND

    else{

        alert(
            "No such recipe available!"
        );
    }
}
// SHOW ALL RECIPES
function showAllRecipes(){

    localStorage.removeItem(
        "ingredients"
    );

    localStorage.removeItem(
        "recipeSearch"
    );

    localStorage.setItem(
        "showAll",
        "true"
    );

    window.location.href =
    "recipe.html";
}















// RECIPE DATABASE

const recipes = [

{
    name:"Veg Fried Rice",

    image:
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",

    ingredients:
    ["Rice","Onion","Carrot"],

    time:"25 mins",

    calories:"320 Calories",

    steps:[
        "Boil rice.",
        "Fry vegetables.",
        "Mix rice and vegetables.",
        "Cook for 5 minutes."
    ]
},

{
    name:"Cheese Pizza",

    image:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",

    ingredients:
    ["Cheese","Tomato","Butter"],

    time:"30 mins",

    calories:"500 Calories",

    steps:[
        "Prepare pizza base.",
        "Add cheese and tomato.",
        "Bake properly.",
        "Serve hot."
    ]
},

{
    name:"Chicken Burger",

    image:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",

    ingredients:
    ["Chicken","Onion","Cheese"],

    time:"20 mins",

    calories:"450 Calories",

    steps:[
        "Cook chicken.",
        "Toast buns.",
        "Add cheese and onion.",
        "Assemble burger."
    ]
},
{
    name:"Omelette",
    image:
    "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1000&auto=format&fit=crop",

    ingredients:
    ["Egg","Butter","Onion"],

    time:"10 mins",

    calories:"220 Calories",

    steps:[
        "Beat eggs.",
        "Heat butter.",
        "Cook eggs.",
        "Serve hot."
    ]
}

];

// RECIPE PAGE

const recipeContainer =
document.getElementById(
    "recipeContainer"
);

// CHECK PAGE

if(recipeContainer){

    // GET SEARCH DATA

    const selectedIngredients =

    JSON.parse(
        localStorage.getItem("ingredients")
    ) || [];

    const recipeSearch =

    localStorage.getItem(
        "recipeSearch"
    ) || "";

    // LOOP RECIPES

    recipes.forEach(recipe => {

        let showRecipe = false;

        // SEARCH BY INGREDIENTS

        if(selectedIngredients.length > 0){

            const missingIngredients =

            recipe.ingredients.filter(item =>

                !selectedIngredients.includes(item)

            );

            // SHOW EVEN IF 1 INGREDIENT MISSING

            if(missingIngredients.length <= 1){

                showRecipe = true;
            }
        }

        // SEARCH BY NAME

        if(recipe.name
            .toLowerCase()
            .includes(recipeSearch.toLowerCase())){

            showRecipe = true;
        }

        // DISPLAY CARD

        if(showRecipe){

            const card =
            document.createElement("div");

            card.className =
            "col-md-4";

            // MISSING INGREDIENTS

            const missingIngredients =

            recipe.ingredients.filter(item =>

                !selectedIngredients.includes(item)

            );

            card.innerHTML = `

                <div class="recipe-card">

                    <img src="${recipe.image}">

                    <div class="recipe-content">

                        <h3>
                            ${recipe.name}
                        </h3>

                        <p>
                            ⏰ ${recipe.time}
                        </p>

                        <p>
                            🔥 ${recipe.calories}
                        </p>

                        <p class="missing">

                            Missing:
                            ${missingIngredients.join(", ")
                            || "None"}

                        </p>

                        <button class="details-btn">

                            View Details

                        </button>

                    </div>

                </div>

            `;

            recipeContainer.appendChild(card);

            // BUTTON

            const button =
            card.querySelector(".details-btn");

            button.addEventListener("click", () => {

                localStorage.setItem(

                    "selectedRecipe",

                    JSON.stringify(recipe)

                );

                window.location.href =
                "recipe-details.html";

            });

        }

    });

}








// DETAILS PAGE

const recipeName =
document.getElementById(
    "recipeName"
);

if(recipeName){

    // GET RECIPE

    const recipe =

    JSON.parse(
        localStorage.getItem(
            "selectedRecipe"
        )
    );

    // ELEMENTS

    const recipeImage =
    document.getElementById(
        "recipeImage"
    );

    const recipeCalories =
    document.getElementById(
        "recipeCalories"
    );

    const ingredientsList =
    document.getElementById(
        "ingredientsList"
    );

    const stepsList =
    document.getElementById(
        "stepsList"
    );

    const favoriteBtn =
    document.getElementById(
        "favoriteBtn"
    );

    // DISPLAY DATA

    recipeImage.src =
    recipe.image;

    recipeName.innerText =
    recipe.name;

    recipeCalories.innerText =
    "🔥 " + recipe.calories;

    // INGREDIENTS

    recipe.ingredients.forEach(item => {

        const li =
        document.createElement("li");

        li.innerText = item;

        ingredientsList.appendChild(li);

    });

    // STEPS

    recipe.steps.forEach(step => {

        const li =
        document.createElement("li");

        li.innerText = step;

        stepsList.appendChild(li);

    });

    // FAVORITES

    favoriteBtn.addEventListener("click", () => {

        let favorites =

        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];

        // CHECK DUPLICATE

        const alreadyExists =

        favorites.some(item =>

            item.name === recipe.name

        );

        if(!alreadyExists){

            favorites.push(recipe);

            localStorage.setItem(

                "favorites",

                JSON.stringify(favorites)

            );

            // TOAST

            const toast =
            document.getElementById(
                "toastMessage"
            );

            toast.classList.add("show");

            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            },2000);

            // BUTTON CHANGE

            favoriteBtn.innerText =
            "❤️ Added";

        }

    });

}







// FAVORITES PAGE

const favoriteContainer =
document.getElementById(
    "favoriteContainer"
);

if(favoriteContainer){

    // GET FAVORITES

    let favorites =

    JSON.parse(
        localStorage.getItem(
            "favorites"
        )
    ) || [];

    const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );

    // EMPTY CHECK

    if(favorites.length === 0){

        emptyMessage.style.display =
        "block";
    }

    else{

        emptyMessage.style.display =
        "none";
    }

    // DISPLAY FAVORITES

    favorites.forEach((recipe,index) => {

        const card =
        document.createElement("div");

        card.className =
        "col-md-4";

        card.innerHTML = `

            <div class="favorite-card">

                <img src="${recipe.image}">

                <div class="favorite-content">

                    <h3>
                        ${recipe.name}
                    </h3>

                    <p>
                        ⏰ ${recipe.time}
                    </p>

                    <p>
                        🔥 ${recipe.calories}
                    </p>

                    <button class="remove-btn">

                        ❤️ Remove

                    </button>

                </div>

            </div>

        `;

        favoriteContainer.appendChild(card);

        // REMOVE BUTTON

        const removeBtn =
        card.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            // REMOVE RECIPE

            favorites.splice(index,1);

            // UPDATE STORAGE

            localStorage.setItem(

                "favorites",

                JSON.stringify(favorites)

            );

            // RELOAD PAGE

            location.reload();

        });

    });

}