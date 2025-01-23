import axios, { all } from "axios";

const API_URL = "http://api.currencylayer.com/";
const API_KEY = "833e014a389a103c2861f946d9368ef1";
const TOP_CURRENCIES = ["USD", "EUR", "BRL", "JPY", "GBP", "CHF", "CAD", "AUD", "ZAR", "CNY"];

let allCurrencies;

export async function getTopExchangeRates(sourceCurrency) {
  const topCurrencies = TOP_CURRENCIES.filter((topCurrency) => topCurrency !== sourceCurrency).join(",");

  const exchangeRatesResponse = await axios.get(`${API_URL}/live`, {
    params: {
      access_key: API_KEY,
      source: sourceCurrency,
      currencies: topCurrencies,
    },
  });

  const exchangeRates = Object.entries(exchangeRatesResponse.data.quotes).map(([key, value]) => {
    const formattedKey = `${key.slice(0, 3)} -> ${key.slice(3)}`;
    return { label: formattedKey, value };
  });

  return exchangeRates;
}

export async function getConversionResponse({ from, to, amount }) {
  const conversionResponse = await axios.get(`${API_URL}/convert`, {
    params: {
      access_key: API_KEY,
      from,
      to,
      amount,
    },
  });

  const conversionData = {
    conversionFrom: conversionResponse.data.query.from,
    conversionTo: conversionResponse.data.query.to,
    conversionAmount: conversionResponse.data.query.amount,
    conversionResult: conversionResponse.data.result,
  };

  return conversionData;
}

export async function getCurrencies() {
  if (allCurrencies) {
    return allCurrencies;
  }

  const currencyResponse = await axios.get(`${API_URL}/list`, {
    params: {
      access_key: API_KEY,
    },
  });

  allCurrencies = Object.entries(currencyResponse.data.currencies).map(([key, value]) => {
    const formattedLabel = `${key} · ${value}`;
    return { key, label: value, formattedLabel };
  });

  // free tier of currencylayer API only allows for one request per second.
  return new Promise((resolve) => {
    setTimeout(() => resolve(allCurrencies), 1000);
  });
}

export async function getPopularConversions({ currencyList, sourceCurrency, exchangeRates }) {
  const popularConversions = TOP_CURRENCIES.filter((currency) => currency !== sourceCurrency).map((currency) => {
    const conversionRate = exchangeRates.find((rate) => rate.label === `${sourceCurrency} -> ${currency}`);

    const currencyToSourceConversion = 1 / conversionRate.value;

    const sourceToCurrency = `${currency} 1.00 = ${conversionRate.value.toFixed(2)} ${sourceCurrency}`;
    const currencyToSource = `${currency} ${currencyToSourceConversion.toFixed(2)} -> 1.00  ${sourceCurrency}`;

    const currencyCompleteName = currencyList.find((currencyName) => currencyName.key === currency);

    return {
      value: currencyCompleteName.label,
      sourceToCurrency,
      currencyToSource,
    };
  });

  return popularConversions;
}
