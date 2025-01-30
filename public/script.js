const urlParams = new URLSearchParams(window.location.search);
console.log(`URLParams: ${JSON.stringify(urlParams)}`);
const mainCurrencyParams = urlParams.get("currency");
const mainCurrency = mainCurrencyParams || "USD";

if (!mainCurrencyParams) {
  urlParams.set("currency", mainCurrency);
  window.history.replaceState(null, "", `${window.location.pathname}?${urlParams.toString()}`);
}

const mainCurrencySelect = document.getElementById("main-currency");

mainCurrencySelect.value = mainCurrency;
mainCurrencySelect.addEventListener("change", (event) => {
  const urlParams = new URLSearchParams();
  urlParams.set("currency", event.target.value);
  window.location.replace(`${window.location.origin}?${urlParams.toString()}`);
});
