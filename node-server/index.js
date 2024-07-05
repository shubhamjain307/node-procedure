// amit@settlemint.com

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
const { sequelize } = require("./db");
const emp = require("./routes/emp");

app.use(bodyParser.json());
app.use("/employee", emp);

app.listen(PORT, () => {
  console.log("Server started running");
  sequelize
    .sync()
    .then((msg) => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(
        "Database connection could not be established,please restart the server"
      );
    });
});
