const  search = document.getElementById('search'),
       submit = document.getElementById('submit'),
       random=  document.getElementById('random'),
       mealsEl=  document.getElementById('meals'),
       resultHeading=  document.getElementById('result-heading'),
       singleMealElm=  document.getElementById('single-meal')
       
       //Functions:
       function searchMeal(e){
           e.preventDefault();

           singleMealElm.innerHTML='';
           const term = search.value;

        //    check for empty
        if(term.trim()){
         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
             .then(res=> res.json())
             .then(data=>{
                 console.log(data)
                 resultHeading.innerHTML= `<h2>Search results for ${term} : </h2>`;
                 if(data.meals===null){
                    resultHeading.innerHTML= `<p>NO RESULTS FOUND. <i>PLEASE TRY AGAIN </i></p>`
                    meals.innerHTML= '';
                   }else{
                       mealsEl.innerHTML= data.meals.map( meal=> `<div class= 'meal'>
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
       //FETCHING MEAL BY ID FUNC
       function getMealbyId (mealId){
           fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
           .then(res=> res.json())
           .then(data =>{
            const meal = data.meal[0]
            addMealToDom(meal)

           })
       }

       //Func to add the meal to dom 
       function addMealToDom(meal){

       }
       //Event listners:
       submit.addEventListener('submit', searchMeal)
       mealsEl.addEventListener('click', e =>{
          const mealinfo =  e.path.find(item =>{
              if(item.classList){
               return item.classList.contains('meal-info')
              }else return false
            }
          )
          if(mealinfo){
             const mealId= mealinfo.getAttribute('data-mealid')
             getMealbyId(mealId)
          }
       })
       
       