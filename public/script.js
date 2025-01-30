const switchCurrency = document.getElementById("switch-currency");

switchCurrency.addEventListener("click", () => {
  const conversionTo = document.getElementById("conversion-to");
  const conversionFrom = document.getElementById("conversion-from");

  const newConversionTo = conversionFrom.value;
  const newConversionFrom = conversionTo.value;

  conversionTo.value = newConversionTo;
  conversionFrom.value = newConversionFrom;
});

const urlParams = new URLSearchParams(window.location.search);
console.log(`URLParams: ${JSON.stringify(urlParams)}`);
const mainCurrencyParams = urlParams.get("currency");
const mainCurrency = mainCurrencyParams || "USD";

if (!mainCurrencyParams) {
  urlParams.set("currency", mainCurrency);
  window.history.replaceState(null, "", `${window.location.pathname}?${urlParams.toString()}`);
}

console.log(`Main currency: ${mainCurrencyParams}`);

const mainCurrencySelect = document.getElementById("main-currency");
console.log(`TESTE: ${window.location.host}`);

mainCurrencySelect.value = mainCurrency;
mainCurrencySelect.addEventListener("change", (event) => {
  const urlParams = new URLSearchParams();
  urlParams.set("currency", event.target.value);
  window.location.replace(`${window.location.origin}?${urlParams.toString()}`);
});
