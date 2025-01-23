const switchCurrency = document.getElementById("switch-currency");

switchCurrency.addEventListener("click", () => {
  const conversionTo = document.getElementById("conversion-to");
  const conversionFrom = document.getElementById("conversion-from");

  const newConversionTo = conversionFrom.value;
  const newConversionFrom = conversionTo.value;

  conversionTo.value = newConversionTo;
  conversionFrom.value = newConversionFrom;
});

// ?currency=USD | query params | js set query params

const urlParams = new URLSearchParams(window.location.search);
const mainCurrencyParams = urlParams.get("currency");
const mainCurrency = mainCurrencyParams || "USD";

if (!mainCurrencyParams) {
  urlParams.set("currency", mainCurrency);
  window.history.replaceState(null, "", `${window.location.pathname}?${urlParams.toString()}`);
}

console.log(`Main currency: ${mainCurrencyParams}`);

const mainCurrencySelect = document.getElementById("main-currency");

mainCurrencySelect.value = mainCurrency;
mainCurrencySelect.addEventListener("change", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("currency", event.target.value);
  window.location.search = urlParams.toString();
});

// function updateCurrencyParam(currency) {
//   const urlParams = new URLSearchParams(window.location.search);

//   urlParams.set("currency", currency);
// }

// const urlParams = new URLSearchParams(window.location.search);
// const nameParam = urlParams.get("currency");
