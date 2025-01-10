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
