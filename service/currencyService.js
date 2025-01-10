import axios, { all } from "axios";

const API_URL = "http://api.currencylayer.com/";
const API_KEY = "742c4de70e76d2d66101128577085452";
const TOP_CURRENCIES = ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "AUD", "ZAR", "CNY", "BRL"];

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
    return `${formattedKey}: ${value}`;
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

  console.log(`Teste: ${JSON.stringify(conversionResponse.data)}`);

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
    const label = `${key} • ${value}`;
    return { value: key, label };
  });

  // free tier of currencylayer API only allows for one request per second.
  return new Promise((resolve) => {
    setTimeout(() => resolve(allCurrencies), 1000);
  });
}
