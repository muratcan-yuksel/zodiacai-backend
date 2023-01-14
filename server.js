const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const schedule = require("node-schedule");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");

let rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 32;

async function getAllUsers() {
  try {
    const response = await axios.get(
      "https://www.zodiacai.net/api/getAllUsers"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const triggerFunction = () => {
  getAllUsers();
};

schedule.scheduleJob(rule, function () {
  triggerFunction();
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
