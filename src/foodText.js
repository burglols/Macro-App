import {
  calculateNutrientValues,
  computeTotalCalories,
} from "./nutrientCalculator";
import { appendFoodDataToDOM } from "./domManipulator";

const weight = document.querySelector(".inputWeight");

const foodText = (data) => {
  const weightValue = parseFloat(weight.value);
  const nutrientValues = calculateNutrientValues(data, weightValue);
  const totalCalories = computeTotalCalories(nutrientValues);

  appendFoodDataToDOM(data, nutrientValues, totalCalories, weightValue);
};

export default foodText;
