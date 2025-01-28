import express from "express";
import bodyParser from "body-parser";
import { getTopExchangeRates } from "./service/currencyService.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const sourceCurrency = req.params.currency;
    const exchangeRates = await getTopExchangeRates(sourceCurrency);

    res.render("index.ejs", { exchangeRates });
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
