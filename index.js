import bodyParser from "body-parser";
import express from "express";
import constrollers from "./controller.js";
import kafkaConfig from "./config.js";

const app = express()
const jsonParser = bodyParser.json()

app.post('/api/send', jsonParser, constrollers.sendMessageToKafka);

//consume from topic "test-topic"
kafkaConfig.consume('my-topic', (data) => {

  console.log('consuming message...')
  console.log(`key : ${data.key}`);
  console.log(`value : ${data.value}`);
  console.log(`headers : ${data.headers['correlation-id']}`);

})

app.listen(8080, () => {
  console.log("Server is running on port 8080.")
})