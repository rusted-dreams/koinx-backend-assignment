import express from 'express'
const router = express.Router();
import { standardDeviation as stdDev} from '../controller/stdDev.controller.js';


router.route('')
  .get(stdDev);

export default router;