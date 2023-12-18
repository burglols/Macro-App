export function appendFoodDataToDOM(
  data,
  nutrientValues,
  totalCalories,
  weightValue
) {
  const foodContainer = document.querySelector(".foodContent");

  let newItem = document.createElement("div");
  const calsTotal = document.querySelector(".calsTotal");

  newItem.innerHTML = `
      Search Input: ${data.foodSearchCriteria.generalSearchInput}<br>
      Serving Size: ${weightValue}g<br>
      Protein Value: ${nutrientValues.protein}g <br>
      Carb Value: ${nutrientValues.carb}g<br>
      Fat Value: ${nutrientValues.fat}g<br>
      Total Calories: ${totalCalories}
    `;

  if (foodContainer) {
    foodContainer.appendChild(newItem);
  } else {
    console.error("Element with class 'foodContent' not found.");
  }

  // Add a click event listener to the new foodItem
  newItem.addEventListener("click", function () {
    console.log("hi");
  });
}
