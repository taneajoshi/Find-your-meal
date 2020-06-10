const  search = document.getElementById('search'),
       submit = document.getElementById('submit'),
       random=  document.getElementById('random'),
       meals=  document.getElementById('meals'),
       resultHeading=  document.getElementById('result-heading'),
       singleMealElm=  document.getElementById('single-meal')
       
       //Functions:
       function searchMeal(e){
           e.preventDefault();

           singleMealElm.innerHTML='';
           const term = search.value;
           console.log(term)

        //    check for empty
        if(term.trim()){
         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
             .then(res=> res.json())
             .then(data=>{
                 resultHeading.innerHTML= `<h2>Search results for ${term} : </h2>`;
                 if(data.meals===null){
                    resultHeading.innerHTML= `<p>NO RESULTS FOUND. <i>PLEASE TRY AGAIN </i></p>`
                    meals.innerHTML= '';
                   }else{
                       meals.innerHTML= data.meals.map( meal=> `<div class= 'meal'>
                       <img src= "${meal.strMealThumb}" alt ="${meal.strMeal}"/>

                       <div class = "meal-info" data-mealID= "${meal.idMeal}">
                       <h3>${meal.strMeal}</h3>
                       </div>
                       </div>`
                      ).join('')
                   }
             })
       //CLEAR SEARCH TEXT AFTER DISPLAYING RESULT
       search.value= '';
             
        }else alert('Please enter a valid search term')

       
       }
       //Event listners:
       submit.addEventListener('submit', searchMeal)
       
       