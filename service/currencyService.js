import axios, { all } from "axios";

const API_URL = "http://api.currencylayer.com/";
const API_KEY = "ed5458f8af25cf765e91c30a86462df3";
const TOP_CURRENCIES = ["USD", "EUR", "BRL", "JPY", "GBP", "CHF", "CAD", "AUD", "ZAR", "CNY"];

let allCurrencies;

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
      return { label: formattedKey, value };
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(exchangeRates), 1000);
    });
  } catch (error) {
    console.log(`Error fetching exchange rates:${error}`);
    throw new Error("Unable to get exchange rates, please try again later.");
  }
}

export async function getConversionResponse({ from, to, amount }) {
  try {
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

    return new Promise((resolve) => {
      setTimeout(() => resolve(conversionData), 1000);
    });
  } catch (error) {
    console.log(`Error to get currency convertor:${error}`);
    throw new Error("Unable to convert the currency, please try again later.");
  }
}

export async function getCurrencies() {
  if (allCurrencies) {
    return allCurrencies;
  }

  try {
    const currencyResponse = await axios.get(`${API_URL}/list`, {
      params: {
        access_key: API_KEY,
      },
    });

    allCurrencies = Object.entries(currencyResponse.data.currencies).map(([key, value]) => {
      const formattedLabel = `${key} · ${value}`;
      return { key, label: value, formattedLabel };
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(allCurrencies), 1000);
    });
  } catch (error) {
    console.log(`Error to get currency list:${error}`);
    throw new Error("Unable to get currency list, please try again later.");
  }
}

export async function getPopularConversions({ currencyList, exchangeRates, sourceCurrency }) {
  try {
    const popularConversions = TOP_CURRENCIES.filter((currency) => currency !== sourceCurrency).map((currency) => {
      const conversionRate = exchangeRates.find((rate) => rate.label === `${sourceCurrency} -> ${currency}`);

      const currencyToSourceConversion = 1 / conversionRate.value;

      const sourceToCurrency = `${currency} 1.0000 = ${sourceCurrency} ${conversionRate.value.toFixed(4)}`;
      const currencyToSource = `${currency} ${currencyToSourceConversion.toFixed(4)} =  ${sourceCurrency} 1.0000`;

      const currencyCompleteName = currencyList.find((currencyName) => currencyName.key === currency);

      return {
        value: currencyCompleteName.label,
        sourceToCurrency,
        currencyToSource,
      };
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(popularConversions), 1000);
    });
  } catch (error) {
    console.log(`Error to get popular conversions:${error}`);
    throw new Error("Unable to get popular conversions, please try again later.");
  }
}
