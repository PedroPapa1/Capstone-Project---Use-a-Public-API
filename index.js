import express from "express";
import bodyParser from "body-parser";
import { getConversionResponse, getTopExchangeRates, getCurrencies } from "./service/currencyService.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const sourceCurrency = req.params.currency || "USD";

  const currencyList = await getCurrencies();
  const exchangeRates = await getTopExchangeRates(sourceCurrency);

  res.render("index.ejs", { exchangeRates, conversionData: {}, currencyList });
});

app.post("/conversion", async (req, res) => {
  const sourceCurrency = req.params.currency;
  const { from, to, amount } = req.body;

  const currencyList = await getCurrencies();
  const exchangeRates = await getTopExchangeRates(sourceCurrency);

  // free tier of currencylayer API only allows for one request per second.
  setTimeout(async () => {
    const conversionData = await getConversionResponse({ from, to, amount });
    res.render("index.ejs", { exchangeRates, conversionData, currencyList });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
