import mongoose from 'mongoose';

const cryptoPriceSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now },
});

export default mongoose.model('CryptoPrice', cryptoPriceSchema);