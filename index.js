const express = require("express");
const cors = require("cors");
const app = express();
const port = 5173;
app.use(cors());
require("dotenv").config();

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/generate-text", async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Get the text from the request
    const prompt = req.query.text;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      mode: 'no-cors', 
      prompt: prompt,
      // maxTokens: 5,
      temperature: 0.9,
      // topP: 1,
      // presencePenalty: 0,
      // frequencyPenalty: 0,
      // bestOf: 1,
      // n: 1,
      // stream: false,
      // stop: ["\n", " Human:", " AI:"],
    });
    console.log(response.data.choices[0].text);
    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    // console.error(error);
    console.error(error.response.data);
    // Send error message
    let msg = error.response.data;
    res.status(500).send(msg);
  }
});
