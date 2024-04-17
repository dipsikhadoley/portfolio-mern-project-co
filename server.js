const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// dotenv configuruation
dotenv.config();
// rest object
const app = express();

// midlewares
app.use(cors());
app.use(express.json());

//  static files  acces
app.use(express.static(path.join(__dirname, "./dipsikha/build")));
// routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dipsikha/build/index.html"));
});
// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
