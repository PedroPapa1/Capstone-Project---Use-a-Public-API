import express from "express";
import bodyParser from "body-parser";
import {
  getConversionResponse,
  getTopExchangeRates,
  getCurrencies,
  getPopularConversions,
} from "./service/currencyService.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const sourceCurrency = req.query.currency || "USD";

  try {
    const currencyList = await getCurrencies();
    const exchangeRates = await getTopExchangeRates(sourceCurrency);
    const popularConversions = await getPopularConversions({ currencyList, sourceCurrency, exchangeRates });

    res.render("index.ejs", {
      exchangeRates,
      conversionData: {},
      currencyList,
      popularConversions,
      sourceCurrency,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/conversion", async (req, res) => {
  const sourceCurrency = req.query.currency || "USD";
  const { from, to, amount } = req.body;

  try {
    const currencyList = await getCurrencies();
    const exchangeRates = await getTopExchangeRates(sourceCurrency);
    const popularConversions = await getPopularConversions({ currencyList, sourceCurrency, exchangeRates });
    const conversionData = await getConversionResponse({ from, to, amount });

    res.render("index.ejs", { exchangeRates, conversionData, currencyList, popularConversions, sourceCurrency });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
