export async function foodInfo(query) {
  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=yOI0rvKjUCJ4h2X8BgOOxAcSRNd3nZdIcrpqAzvm&query=${query}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function autocompleteSearch(query) {
  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=yOI0rvKjUCJ4h2X8BgOOxAcSRNd3nZdIcrpqAzvm&query=${query}`
  );
  const data = await response.json();
  return data;
}
