import cryptoPrice from "../models/cryptoPriceSchema.models.js";

export const standardDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const prices = await cryptoPrice.find({ coinId: coin })
      .sort({ createdAt: -1 })
      .limit(100);

    if (!prices) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }
  
    const priceValues = prices.map((record) => record.price);
    const mean = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
    const variance = priceValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / priceValues.length;
    const stdDev = Math.sqrt(variance);

    res.status(200).json({ deviation: parseFloat(stdDev).toFixed(2) });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};