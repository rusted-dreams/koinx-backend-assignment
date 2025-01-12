import express from 'express';
import startCryptoPriceJob, { saveCryptoPrice } from './controller/getCryptoPrice.jobs.js';
import statsRouter from './routes/stats.routes.js' //stats routes
import stdDevRouter from './routes/stdDev.routes.js' //stdDev routes

const app = express();

app.use(express.json());


// start the crypto price cron job
startCryptoPriceJob();

// fetch the crypto pricces at startup
saveCryptoPrice();

// use routes:
app.use('/stats', statsRouter);
app.use('/deviation', stdDevRouter);

app.get("/", (req, res) => {
  res.send("Welcome to koinX api!");
});

app.all('*', (req, res, next) => {
  res.status(404).send('404 API endpoint not found!')
})
export default app;