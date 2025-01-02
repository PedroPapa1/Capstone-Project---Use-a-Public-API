import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "http://api.currencylayer.com";
const API_KEY = "0d402cae541b11d6ba5af58cc9f8585b";
const TOP_CURRENCIES = ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "AUD", "ZAR", "CNY", "BRL"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// /?currency=USD
app.get("/", async (req, res) => {
  const sourceCurrency = req.params.currency;
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

  res.render("index.ejs", { exchangeRates });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
