import axios from "axios";

const API_URL = "http://api.currencylayer.com/";
const API_KEY = "65d96383658e1a054897c95ad6c4be85";
const TOP_CURRENCIES = ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "AUD", "ZAR", "CNY", "BRL"];

export async function getTopExchangeRates(sourceCurrency) {
  const topCurrencies = TOP_CURRENCIES.filter((topCurrency) => topCurrency !== sourceCurrency).join(",");

  try {
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
  } catch (error) {
    console.log(`Error fetching exchange rates:${error}`);
    throw new Error("Unable to get exchange rates, please try again later.");
  }
}
