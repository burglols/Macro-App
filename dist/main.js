(() => {
  "use strict";
  function e(e, t) {
    const n = e.find((e) => e.nutrientId === t);
    return n ? n.value : null;
  }
  const t = { protein: 1003, carb: 1005, fat: 1004 },
    n = { protein: 4, carb: 4, fat: 9 };
  function o(n, o) {
    let r = {};
    for (let [c, a] of Object.entries(t))
      r[c] =
        (Math.round(
          (100 * e(n.foods[0].foodNutrients, a)) / n.foods[0].servingSize
        ) /
          100) *
        o;
    return r;
  }
  function r(e) {
    return [Object.entries(e).reduce((e, [t, o]) => e + o * n[t], 0)];
  }
  let c = [];
  const a = document.querySelector(".inputWeight"),
    i = document.querySelector(".input"),
    u = document.querySelector(".inputWeight"),
    d = document.querySelector(".searchButton"),
    l = document.querySelector("#autocompleteOptions"),
    s = document.querySelector(".calsTotal");
  (() => {
    let e = !1;
    function t(e) {
      u.value && i.value && e
        ? (async function (e) {
            const t = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=yOI0rvKjUCJ4h2X8BgOOxAcSRNd3nZdIcrpqAzvm&query=${e}`
              ),
              n = await t.json();
            return console.log(n), n;
          })(i.value).then((e) => {
            ((e) => {
              const t = parseFloat(a.value),
                n = o(e, t);
              !(function (e, t, n, o) {
                const r = document.querySelector(".foodContent");
                let c = document.createElement("div");
                document.querySelector(".calsTotal"),
                  (c.innerHTML = `\n      Search Input: ${e.foodSearchCriteria.generalSearchInput}<br>\n      Serving Size: ${o}g<br>\n      Protein Value: ${t.protein}g <br>\n      Carb Value: ${t.carb}g<br>\n      Fat Value: ${t.fat}g<br>\n      Total Calories: ${n}\n    `),
                  r
                    ? r.appendChild(c)
                    : console.error(
                        "Element with class 'foodContent' not found."
                      );
              })(e, n, r(n), t);
            })(e),
              (function (e, t) {
                const n = r(o(e, t));
                c.push(n[0]);
              })(e, u.value);
            const t = c.reduce((e, t) => e + t, 0);
            (s.textContent = `Total Calories consumed: ${t}`), s.appendChild;
          })
        : alert(
            "Please select an option from the dropdown and enter a weight."
          );
    }
    i.addEventListener("keyup", async function (t) {
      var n;
      "Enter" !== t.key &&
        ((e = !1),
        i.value.length > 2
          ? ((n = await (async function (e) {
              const t = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=yOI0rvKjUCJ4h2X8BgOOxAcSRNd3nZdIcrpqAzvm&query=${e}`
              );
              return await t.json();
            })(i.value)),
            (l.innerHTML = ""),
            n.foods.slice(0, 100).forEach((t) => {
              const n = document.createElement("div");
              n.classList.add("autocomplete-option"),
                (n.innerText = `${t.description}  - ${t.brandOwner}`),
                n.addEventListener("click", function () {
                  (i.value = t.description), (l.innerHTML = ""), (e = !0);
                }),
                l.appendChild(n);
            }))
          : (l.innerHTML = ""));
    }),
      i.addEventListener("keydown", function (n) {
        "Enter" === n.key && (n.preventDefault(), t(e));
      }),
      u.addEventListener("keydown", function (n) {
        "Enter" === n.key && (n.preventDefault(), t(e));
      }),
      d.addEventListener("click", function () {
        t(e);
      });
  })();
})();
