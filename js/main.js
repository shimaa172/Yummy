let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

/******************************Loadding*********************************/
$(document).ready(() => {
    searchByName("").then(() => {
        // loadin icone speed
        $(".loading-screen").fadeOut(500)
        // changing body css
        $("body").css("overflow", "visible")

    })
})
/*********************************Sidebar*****************************/
/* for open menu */
function openSideBar() {
    $(".sidebar").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify"); //remove menu icon
    $(".open-close-icon").addClass("fa-x"); //add close icon

    //to animate links when open the menu
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

/* for close menu*/
function closeSideBar() {
    let boxWidth = $(".sidebar .nav-tab").outerWidth()
    $(".sidebar").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify"); //add menu icon
    $(".open-close-icon").removeClass("fa-x"); //remove close icon

    //to animate links when close the menu
    $(".links li").animate({
        top: 300
    }, 500)
}

/* default for sidebar "close" */
closeSideBar()

/* to control sidebar with open and close icon*/
$(".sidebar i.open-close-icon").click(() => {
    if ($(".sidebar").css("left") == "0px") {
        closeSideBar()
    } else {
        openSideBar()
    }
})

/***************************main page************************************/
// step2------------- ======> step4 for Categories page ,Area page and Ingredients page
/*display meals*/
function displayMeals(arr) {//response.meals======>arr
    // display data in cartoona 
    let cartoona = "";
    // loop for repeat col div in row div that have id="rowData"
    for (let i = 0; i < arr.length; i++) {
        /*nots:
        idMeal:id of meal
        strMealThumb: link of mealImg
        strMeal:name of meal
       */
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" role="button" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    //display cartoona in row div that have id="rowData" in the main section
    rowData.innerHTML = cartoona

}

//step1-----------------
/* for fetch API of meals*/
async function getMeals() {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    // store data
    respone = await respone.json()
    console.log(respone.meals);
    // display data
    displayMeals(respone.meals)//respone.meals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}
getMeals()

/********************************Categories page******************************/
// step2-------------
/*display categories*/
function displayCategories(arr) {//response.categories======>arr
    // display data in cartoona 
    let cartoona = "";
    // loop for repeat col div in row div that have id="rowData"
    for (let i = 0; i < arr.length; i++) {
        /*nots:
         strCategory:name of category
         strCategoryThumb: link of categoryImg
         strCategoryDescription: description of category
        */
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" role="button" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <!-- categoryDescriptionDiv -->
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    //display cartoona in row div that have id="rowData" in the main section
    rowData.innerHTML = cartoona
}

//step1-----------------
/* for fetch API of gategories*/
async function getCategories() {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    // store data
    response = await response.json()
    // display data
    displayCategories(response.categories)//response.categories======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

// step3-------------
/* for fetch API of getCategoryMeals*/
async function getCategoryMeals(term) {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
    // store data
    response = await response.json()
    // display data ======> step4
    displayMeals(response.meals)//response.getCategoryMeals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

/**************************Area page*******************************/
// step2-------------
/*display area*/
function displayArea(arr) { //respone.meals======>arr
    // display data in cartoona 
    let cartoona = "";
    // loop for repeat col div in row div that have id="rowData"
    for (let i = 0; i < arr.length; i++) {
        /*nots:
         strArea:name of area
        */
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" role="button"  class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    //display cartoona in row div that have id="rowData" in the main section
    rowData.innerHTML = cartoona
}

//step1-----------------
/* for fetch API of are*/
async function getArea() {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    // store data
    respone = await respone.json()
    console.log(respone.meals);
    // display data
    displayArea(respone.meals) //respone.meals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

// step3-------------
/* for fetch API of getAreaMeals*/
async function getAreaMeals(term) {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
    // store data
    response = await response.json()
    // display data ======> step4
    displayMeals(response.meals)//response.getAreaMeals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}
/************************Ingredients page*******************************/
// step2-------------
/*display ingredients*/
function displayIngredients(arr) {//respone.meals======>arr
    // display data in cartoona 
    let cartoona = "";
    // loop for repeat col div in row div that have id="rowData"
    for (let i = 0; i < arr.length; i++) {
        /*nots:
         strIngredient:name of ingredient
         strDescription: description of ingredient
        */
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" role="button" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    //display cartoona in row div that have id="rowData" in the main section
    rowData.innerHTML = cartoona
}

//step1-----------------
/* for fetch API of ingredients*/
async function getIngredients() {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    // fetch data from API
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    // store data
    respone = await respone.json()
    console.log(respone.meals);
    // display data
    displayIngredients(respone.meals.slice(0, 20))//respone.meals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

// step3-------------
/* for fetch API of getIngredientsMeals*/
async function getIngredientsMeals(term) {
    // remove any content from main section 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data from API
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
    // store data
    response = await response.json()
    // display data ======> step4
    displayMeals(response.meals)//response.getIngredientsMeals======>arr
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

/******************************Search page****************************/
//step1
/* for display search page*/
function showSearchInputs() {
    //changing the inner content of the main section

    // adding content to div that have id="searchContainer"
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    // remove content of div that have id="rowData" 
    rowData.innerHTML = ""
}

// step2
/* for fetch API of search*/
async function searchByName(term) {
    //close sidebar 
    closeSideBar()
    // remove content of div that have id="rowData" 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    // fetch data from API
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    // store data
    response = await response.json()
    //display data for search("ture") or all data("false")
    response.meals ? displayMeals(response.meals) : displayMeals([])
    // loading
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    //close sidebar 
    closeSideBar()
    // remove content of div that have id="rowData" 
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    // fetch data from API
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    // store data
    response = await response.json()
    //display data for search("ture") or all data("false")
    response.meals ? displayMeals(response.meals) : displayMeals([])
    // loading
    $(".inner-loading-screen").fadeOut(300)
}


/**************************Details page***************************/
//step2---------------
/* for display details page*/
function displayMealDetails(meal) {
    // remove content of div that have id="searchContainer" 
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

// step1
/* for fetch API of search*/
async function getMealDetails(mealID) {
    // close sidebar
    closeSideBar()
    // remove content of div that have id="rowData"  
    rowData.innerHTML = ""
    // loading
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    // fetch data
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    // store data
    respone = await respone.json();
    // display data
    displayMealDetails(respone.meals[0])
    // loading
    $(".inner-loading-screen").fadeOut(300)
}


/***************************Contacts page*************************/
/* for display contacts page*/
function showContacts() {
    //changing the inner content of div that have id="rowData" in the main section
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="CheckValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameError" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="CheckValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailError" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="CheckValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="CheckValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="CheckValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup="CheckValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `

    submitBtn = document.getElementById("submitBtn")

    // remove content of div that have id="rowData"
    searchContainer.innerHTML = ""

    // adding focus action to inputs as a ture
    document.getElementById("name").addEventListener("focus", () => {
        nameFocus = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        emailFocus = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        phoneFocus = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageFocus = true
    })

    document.getElementById("password").addEventListener("focus", () => {
        passwordFocus = true
    })

    document.getElementById("repassword").addEventListener("focus", () => {
        repasswordFocus = true
    })
}
// default values for inputsFocus
let nameFocus = false;
let emailFocus = false;
let phoneFocus = false;
let ageFocus = false;
let passwordFocus = false;
let repasswordFocus = false;

//Name Validation
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

//Email Validation
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

//Phone Validation
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

// Age Validation
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

// Password Validation
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

// Repassword Validation
function repasswordValidation() {
    return document.getElementById("repassword").value == document.getElementById("password").value
}

// for check formValidation
function CheckValidation() {
    // check focus action for nameInput is ture
    if (nameFocus) {
        // check validation
        if (nameValidation()) {
            // hidding error masg
            document.getElementById("nameError").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameError").classList.replace("d-none", "d-block")

        }
    }

    // check focus action for emailInput is ture
    if (emailFocus) {
        // check validation
        if (emailValidation()) {
            // hidding error masg
            document.getElementById("emailError").classList.replace("d-block", "d-none")
        } else {
            // showing error masg
            document.getElementById("emailError").classList.replace("d-none", "d-block")

        }
    }

    // check focus action for phoneInput is ture
    if (phoneFocus) {
        // check validation
        if (phoneValidation()) {
            // hidding error masg
            document.getElementById("phoneError").classList.replace("d-block", "d-none")
        } else {
            // showing error masg
            document.getElementById("phoneError").classList.replace("d-none", "d-block")

        }
    }

    // check focus action for ageInput is ture
    if (ageFocus) {
        // check validation
        if (ageValidation()) {
            // hidding error masg
            document.getElementById("ageError").classList.replace("d-block", "d-none")
        } else {
            // showing error masg
            document.getElementById("ageError").classList.replace("d-none", "d-block")

        }
    }

    // check focus action for passwordInput is ture
    if (passwordFocus) {
        // check validation
        if (passwordValidation()) {
            // hidding error masg
            document.getElementById("passwordError").classList.replace("d-block", "d-none")
        } else {
            // showing error masg
            document.getElementById("passwordError").classList.replace("d-none", "d-block")

        }
    }

    // check focus action for repasswordInput is ture
    if (repasswordFocus) {
        // check validation
        if (repasswordValidation()) {
            // hidding error masg
            document.getElementById("repasswordError").classList.replace("d-block", "d-none")
        } else {
            // showing error masg
            document.getElementById("repasswordError").classList.replace("d-none", "d-block")

        }
    }

    // check all inputsValidation is ture at the same time
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        // submitBtn is Enabled
        submitBtn.removeAttribute("disabled")
    } else {
        // submitBtn is disabled
        submitBtn.setAttribute("disabled", true)
    }
}