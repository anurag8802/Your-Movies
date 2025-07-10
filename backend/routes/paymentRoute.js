const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: 'order_rcptid_' + Math.random().toString(36).substring(2, 15),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 