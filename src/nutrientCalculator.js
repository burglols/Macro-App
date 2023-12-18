function getNutrientValueByNutrientId(foodNutrients, nutrientId) {
  const nutrient = foodNutrients.find((n) => n.nutrientId === nutrientId);
  return nutrient ? nutrient.value : null;
}

const nutrientIds = {
  protein: 1003,
  carb: 1005,
  fat: 1004,
};

const multipliers = {
  protein: 4,
  carb: 4,
  fat: 9,
};

export function calculateNutrientValues(data, weightValue) {
  let nutrientValues = {};

  for (let [key, nutrientId] of Object.entries(nutrientIds)) {
    nutrientValues[key] =
      (Math.round(
        (100 *
          getNutrientValueByNutrientId(
            data.foods[0].foodNutrients,
            nutrientId
          )) /
          data.foods[0].servingSize
      ) /
        100) *
      weightValue;
  }

  return nutrientValues;
}

export function computeTotalCalories(nutrientValues) {
  const totalCalories = Object.entries(nutrientValues).reduce(
    (acc, [key, value]) => acc + value * multipliers[key],
    0
  );

  return [totalCalories];
}

let dailyCalories = [];

export function addCaloriesForItemToDailyTotal(data, weightValue) {
  const nutrientValues = calculateNutrientValues(data, weightValue);
  const itemCalories = computeTotalCalories(nutrientValues);
  dailyCalories.push(itemCalories[0]);
}

export function getDailyCaloriesTotal() {
  return dailyCalories.reduce((acc, val) => acc + val, 0);
}
