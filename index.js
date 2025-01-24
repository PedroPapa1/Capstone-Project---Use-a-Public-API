import express from "express";

const app = express();
const port = 3000;

const API_URL = "http://api.currencylayer.com/";
const API_KEY = "0d402cae541b11d6ba5af58cc9f8585b";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
