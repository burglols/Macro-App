// mainLogic.js

import {
  addCaloriesForItemToDailyTotal,
  getDailyCaloriesTotal,
} from "./nutrientCalculator";

import { foodInfo, autocompleteSearch } from "./fetchData";
import foodText from "./foodText";

const input = document.querySelector(".input");
const weight = document.querySelector(".inputWeight");
const searchButton = document.querySelector(".searchButton");
const autocompleteOptions = document.querySelector("#autocompleteOptions");
const calsTotal = document.querySelector(".calsTotal");

export const setupAutocomplete = () => {
  let selectedFromDropdown = false;

  input.addEventListener("keyup", async function (e) {
    if (e.key !== "Enter") {
      selectedFromDropdown = false;
      if (input.value.length > 2) {
        const data = await autocompleteSearch(input.value);
        displayAutocompleteResults(data);
      } else {
        autocompleteOptions.innerHTML = "";
      }
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch(selectedFromDropdown);
    }
  });

  weight.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch(selectedFromDropdown);
    }
  });

  searchButton.addEventListener("click", function () {
    executeSearch(selectedFromDropdown);
  });

  function displayAutocompleteResults(data) {
    autocompleteOptions.innerHTML = ""; // Clear previous results

    data.foods.slice(0, 100).forEach((food) => {
      // Limit to 5 results
      const option = document.createElement("div");
      option.classList.add("autocomplete-option");
      option.innerText = `${food.description}  - ${food.brandOwner}`;
      option.addEventListener("click", function () {
        input.value = food.description; // Set input value to clicked result
        autocompleteOptions.innerHTML = ""; // Clear results after selection
        selectedFromDropdown = true; // Indicate that a value has been selected from the dropdown
      });
      autocompleteOptions.appendChild(option);
    });
  }

  function executeSearch(selected) {
    if (weight.value && input.value && selected) {
      foodInfo(input.value).then((data) => {
        foodText(data);
        addCaloriesForItemToDailyTotal(data, weight.value);
        const totalCaloriesForTheDay = getDailyCaloriesTotal();
        calsTotal.textContent = `Total Calories consumed: ${totalCaloriesForTheDay}`;
        calsTotal.appendChild;
      });
    } else {
      alert("Please select an option from the dropdown and enter a weight.");
    }
  }
  
};
