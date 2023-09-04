const dataRow=document.querySelector("#dataRow")
const category= document.querySelector("#category")
const area= document.querySelector("#area")
const ingredients= document.querySelector("#ingredients")
const contact= document.querySelector("#contact")
const search= document.querySelector("#search")
const searchContainer= document.querySelector("#searchContainer")
const linkes=document.querySelectorAll(".alink a")
let navWidth = $(".navBar").innerWidth();
console.log(navWidth);
$(document).ready(function () {
    $(".spinner").fadeOut(1000,function(){
        $(".spin").slideUp(1000,function(){
            $("body").css("overflow","auto")
        });
      
    });
});
$("#close").click(function () {
   
    $("#tab").animate({left:-navWidth},1000)
})
$(".alink").click(function () {
   
    $("#tab").animate({left:-navWidth},1000)
})
$(".open").click(function () {
   if($("#tab").css("left")=="0px"){
    $("#tab").animate({left:-navWidth},1000)
    $("#openClose").removeClass("open-close-icon")
    $("#openClose").addClass("fa-xmark")
  
   } else {
    $("#tab").animate({left:"0px"},1000)
    $("#openClose").addClass("open-close-icon")
    $("#openClose").removeClass("fa-xmark")
   }
 
});

    //show lunch info
    async function lunchInfo(datain){
        $("#tab").animate({left:-navWidth},1000)
        var apiResponce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${datain}`)
        var myData=await apiResponce.json()
        var finalDesp=await myData.meals[0]
        let recipesContainer=""
        for(k=1;k<20;k++){
            var resEx = finalDesp[`strIngredient${k}`]
            if (resEx !== ""){
                recipesContainer+=`<li class="alert alert-info m-2 p-1">${resEx}</li>`
            }else{
                continue;
            }
        }



        var cartone=``
        cartone+=`      <div class="col-md-4 text-white">
        <img class="w-100 rounded-3" src="${finalDesp.strMealThumb}" alt="">
            <h2>${finalDesp.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${finalDesp.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${finalDesp.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${finalDesp.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        
            ${recipesContainer}
        </ul>
     

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
<li class="alert alert-danger m-2 p-1">SideDish</li>
        </ul>
        <a target="_blank" href="${finalDesp.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${finalDesp.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
        dataRow.innerHTML=cartone
    }
//main page
async function getData(){
    var apiResponce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    var myData=await apiResponce.json()
    var finalDesp=myData.meals
    var cartone=``
    for ( var i=0;i<finalDesp.length;i++){
        let valtxt1=(myData.meals[i].strMeal).split(" ").join("_")
        cartone+=`    <div class="col-md-3" value="${valtxt1}" onclick="lunchInfo('${valtxt1}')" >
        <div   class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${myData.meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                <h3>${myData.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`
    }
    dataRow.innerHTML=cartone
}
getData()
//search section
async function searchByName(inval){
    var apiResponce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inval}`)
    var myData=await apiResponce.json()
    var finalDesp=myData.meals
    var cartone=``
    for ( var i=0;i<finalDesp.length;i++){
        let valtxt2=(myData.meals[i].strMeal).split(" ").join("_")
        cartone+=`    <div class="col-md-3" value="${valtxt2}" onclick="lunchInfo('${valtxt2}')">
        <div   class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${myData.meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                <h3>${myData.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`
    }
    dataRow.innerHTML=cartone
}
async function searchByFLetter(mera){
    var apiResponce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mera}`)
    var myData=await apiResponce.json()
    var finalDesp=myData.meals
    var cartone=``
    for ( var i=0;i<finalDesp.length;i++){
        let valtxt3=(myData.meals[i].strMeal).split(" ").join("_")
        cartone+=`    <div class="col-md-3" value="${valtxt3}" onclick="lunchInfo('${valtxt3}')">
        <div   class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${myData.meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                <h3>${myData.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`
    }
    dataRow.innerHTML=cartone
}
search.addEventListener("click",function(){
    searchContainer.innerHTML=`
    <div class="col-md-6 ">
    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
</div>
<div class="col-md-6">
    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
</div>`
dataRow.innerHTML=""
})
//category section
async function getCategory() {
    var apiResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    var myData = await apiResponse.json();
    var finalDesp = myData.categories;
    var cartone = ``;
    for (var i = 0; i < finalDesp.length; i++) {
      cartone += `
        <div class="col-md-3" value="${myData.categories[i].strCategory}">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${myData.categories[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">            
              <h5>${myData.categories[i].strCategory}</h5>    
              <p>${myData.categories[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>`;
    }
    dataRow.innerHTML = cartone;
  
    // Add click event listener to category items
    $(".meal").click(function () {
      let catName = $(this).find("h5").text();
      getMealsByCategory(catName);
    });
  }
  
  category.addEventListener("click", function () {
    getCategory();
  });

  async function getMealsByCategory(catName) {
    var apiResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
    );
    var myData = await apiResponse.json();
    var finalDesp = myData.meals;
    var cartone = ``;
    for (var i = 0; i < finalDesp.length; i++) {
      let valtxtMeal = myData.meals[i].strMeal.split(" ").join("_");
      cartone += `
        <div class="col-md-3" value="${valtxtMeal}" onclick="lunchInfo('${valtxtMeal}')">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${myData.meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
              <h3>${myData.meals[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
    dataRow.innerHTML = cartone;
  }


//area section

async function getNcont(cuntname){
  var apiResponce=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuntname}`)
  
  var myData=await apiResponce.json()
  var finalDesp=myData.meals
  var cartone=``
  for ( let j=0;j<finalDesp.length;j++){
   
    let valtxtCont=(myData.meals[j].strMeal).split(" ").join("_")
    console.log(valtxtCont);
      cartone+=`    
      <div class="col-md-3" onclick="lunchInfo('${valtxtCont}')">
      <div   class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${myData.meals[j].strMealThumb}" alt="" srcset="">

          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
              <h3>${myData.meals[j].strMeal}</h3>
          </div>
      </div>
</div>`
  }
  dataRow.innerHTML=cartone
}

area.addEventListener("click",function(){
      const counteryName=["British","American","Canadian","Chinese","Croatian","Dutch","Egyptian","Filipino",
      "French","Greek","Indian","Irish","Italian","Jamaican","Japanese","Kenyan","Malaysian","Mexican",
      "Moroccan","Polish","Portuguese","Russian","Spanish","Thai","Tunisian","Turkish","Unknown","Vietnamese"]
      var cartone=``
      for (let i=0; i<counteryName.length; i++) {
          
          cartone+=`
          <div value="${counteryName[i]}" onclick="getNcont('${counteryName[i]}')"  class="col-md-3 text-white count">
          <div  class="rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                  <h3 >${counteryName[i]}</h3>
          </div>
    </div>
          `
          
      }
      dataRow.innerHTML=cartone
    })


    //ingredients section
    
    async function ingredCate(gredVal) {
        var apiResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${gredVal}`
        );
        var myData = await apiResponse.json();
        var finalDesp = myData.meals;
        var cartone = ``;
        for (var i = 0; i < finalDesp.length; i++) {
          cartone += `<div class="col-md-3" onclick="lunchInfo('${myData.meals[i].strMeal}')">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${myData.meals[i].strMealThumb}" alt="" srcset="">
              <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${myData.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>`;
        }
        dataRow.innerHTML = cartone;
      }
    async function ingred() {
        var apiResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
        );
        var myData = await apiResponse.json();
        var finalDesp = myData.meals;
        var cartone = ``;
        for (var i = 0; i < 20; i++) {
          let valtxt = myData.meals[i].strIngredient.split(" ").join("_");
          cartone += `<div value="${valtxt}" onclick="ingredCate('${valtxt}')" class="col-md-3 text-white">
            <div class="rounded-2 text-center meal">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${myData.meals[i].strIngredient}</h3>
              <p>${myData.meals[i].strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>`;
        }
        dataRow.innerHTML = cartone;
      }
    ingredients.addEventListener("click",async function(){
        ingred()
    })

    //validation section    
 let validName= function validationName(valname){
        var regexName = /^([A-Z][a-z]{3,10})(\s)?([A-Z]{1}[a-z]{3,10})?$/i
    if (regexName.test(valname)){
        document.querySelector("#nameInput").classList.add("is-valid")
        document.querySelector("#nameInput").classList.remove("is-invalid")
        document.querySelector("#nameAlert").classList.add("d-none")
        return true

    }else{
        document.querySelector("#nameInput").classList.add("is-invalid")
        document.querySelector("#nameInput").classList.remove("is-valid")
        document.querySelector("#nameAlert").classList.remove("d-none")
        return false
    }
}
let validEmail=function validationEmail(valEmail){
    var regexEmail = /^\w{3,}.?\w{4,}?@(\w{3,}).(\w{3,})$/i
if (regexEmail.test(valEmail)){
    document.querySelector("#emailInput").classList.add("is-valid")
    document.querySelector("#emailInput").classList.remove("is-invalid")
    document.querySelector("#emailAlert").classList.add("d-none")
    return true

}else{
    document.querySelector("#emailInput").classList.add("is-invalid")
    document.querySelector("#emailInput").classList.remove("is-valid")
    document.querySelector("#emailAlert").classList.remove("d-none")
    return false
}
}
let validPhone=function validationPhone(valPhone){
    var regexPhone=/^(01(0|1|2))\d{8}$/
if (regexPhone.test(valPhone)){
    document.querySelector("#phoneInput").classList.add("is-valid")
    document.querySelector("#phoneInput").classList.remove("is-invalid")
    document.querySelector("#phoneAlert").classList.add("d-none")
    return true

}else{
    document.querySelector("#phoneInput").classList.add("is-invalid")
    document.querySelector("#phoneInput").classList.remove("is-valid")
    document.querySelector("#phoneAlert").classList.remove("d-none")
    return false
}}
let validAge=function validationAge(valAge){
    var regexAge=/^[1-7][1-9]|80$/
if (regexAge.test(valAge)){
    document.querySelector("#ageInput").classList.add("is-valid")
    document.querySelector("#ageInput").classList.remove("is-invalid")
    document.querySelector("#ageAlert").classList.add("d-none")
    return true

}else{
    document.querySelector("#ageInput").classList.add("is-invalid")
    document.querySelector("#ageInput").classList.remove("is-valid")
    document.querySelector("#ageAlert").classList.remove("d-none")
    return false
}}
let validPass=function validationPass(valPass){
    var regexPass = /^\d{6,10}[A-Z]{1}[a-z]{1}$/
if (regexPass.test(valPass)){
    document.querySelector("#passwordInput").classList.add("is-valid")
    document.querySelector("#passwordInput").classList.remove("is-invalid")
    document.querySelector("#passwordAlert").classList.add("d-none")
    return true

}else{
    document.querySelector("#passwordInput").classList.add("is-invalid")
    document.querySelector("#passwordInput").classList.remove("is-valid")
    document.querySelector("#passwordAlert").classList.remove("d-none")
    return false
}}
let validRePass=function validationPassre(valPassre){
    var regexPass = /^\d{6,10}[A-Z]{1}[a-z]{1}$/
if ((regexPass.test(valPassre))&&document.querySelector("#passwordInput").value===valPassre){
    document.querySelector("#repasswordInput").classList.add("is-valid")
    document.querySelector("#repasswordInput").classList.remove("is-invalid")
    document.querySelector("#repasswordAlert").classList.add("d-none")
    return true

}else{
    document.querySelector("#repasswordInput").classList.add("is-invalid")
    document.querySelector("#repasswordInput").classList.remove("is-valid")
    document.querySelector("#repasswordAlert").classList.remove("d-none")
    return false
}}

    contact.addEventListener("click",function(){
        dataRow.innerHTML=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="validationName(this.value)" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed start with upercase at least 4 char
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="validationEmail(this.value)" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email must be as *exemple.evsb@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="validationPhone(this.value)" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="validationAge(this.value)" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age from 11 year to 80 year
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" onkeyup="validationPass(this.value)" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter upercase one char lowercase and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="validationPassre(this.value)" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`
    }
    
    )
    if(validName()&&validEmail()&&validPhone()&&validAge()&&validPass()&&validRePass()){
        document.querySelector("#submitBtn").removeAttribute("disabled")
    }


