import cryptoPrice from "../models/cryptoPriceSchema.models.js";

export const getStats = async (req, res) =>{
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const latestData = await cryptoPrice.findOne({ coinId:coin }).sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData.change24h,
    });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

