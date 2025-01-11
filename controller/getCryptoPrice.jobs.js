import axios from 'axios'
import cryptoPrice from '../models/cryptoPriceSchema.models.js';
import cron from 'node-cron';

const COINS = ["bitcoin", "matic-network", "ethereum"];
const COINGECKO_API = process.env.COINGECKO_API_BASE || "https://api.coingecko.com/api/v3";

const saveCryptoPrice = async () => {
  try {

    // fetch current prices from coingecko:
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: COINS.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
      timeout: 5000,
    });
    const data = response.data;

    // save to db
    for(const coinId of COINS) {
      const coinData = data[coinId];
      if(coinData) {
        const coinPrice = coinData.usd;
        const coinMarketCap = coinData.usd_market_cap;
        const coinChange24h = coinData.usd_24h_change;

        const cryptoPriceData = new cryptoPrice({
          coinId,
          price: coinPrice,
          marketCap: coinMarketCap,
          change24h: coinChange24h,          
        });

        // commit to db
        await cryptoPriceData.save();
        console.log(`Price for ${coinId} saved successfully`);
      }
    }
   

  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}


// setup cron job to run every 2 hours:
const startCryptoPriceJob = () => {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running cron job: Fetching cryptocurrency prices");
    try {
      await saveCryptoPrice();
      console.log("Crypto prices saved successfully.");
    } catch (error) {
      console.error("Error in cron job:", error.message);
    }
  });
};

// start the job immediately on startup:
export { saveCryptoPrice };

export default startCryptoPriceJob;

