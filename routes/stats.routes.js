import express from 'express'
import { getStats } from '../controller/getStats.controller.js';

const router = express.Router();

router.route('')
  .get(getStats);


export default router;