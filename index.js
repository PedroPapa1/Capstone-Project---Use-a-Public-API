import express from "express";
import bodyParser from "body-parser";
import { getTopExchangeRates, getCurrencies } from "./service/currencyService.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const sourceCurrency = req.query.currency || "USD";

    const currencyList = await getCurrencies();
    const exchangeRates = await getTopExchangeRates(sourceCurrency);

    res.render("index.ejs", { exchangeRates, currencyList, sourceCurrency });
  } catch (error) {
    res.status(500).send(error.mesage);
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
