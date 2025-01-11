import express from 'express';
import startCryptoPriceJob, { saveCryptoPrice } from './controller/getCryptoPrice.jobs.js';

const app = express();

app.use(express.json());


// start the crypto price cron job
startCryptoPriceJob();

// fetch the crypto pricces at startup
saveCryptoPrice();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;