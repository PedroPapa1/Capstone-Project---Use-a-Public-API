const myButton = document.getElementById("switch-currency");

myButton.addEventListener("click", () => {
  const conversionTo = document.getElementById("conversion-to");
  const conversionFrom = document.getElementById("conversion-from");

  const newConversionTo = conversionFrom.value;
  const newConversionFrom = conversionTo.value;

  conversionTo.value = newConversionTo;
  conversionFrom.value = newConversionFrom;
});
