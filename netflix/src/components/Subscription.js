import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaFire, FaRegSquare, FaTv, FaMobileAlt, FaUsers, FaStar } from 'react-icons/fa';
import Header from './Header';

const plans = [
  {
    name: 'Basic',
    price: '₹199',
    features: [false, false, true, true, '1'],
    highlight: false,
  },
  {
    name: 'Standart',
    price: '₹499',
    features: [true, false, true, true, '2'],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₹649',
    features: [true, true, true, true, '4'],
    highlight: true,
  },
];

const featureList = [
  { label: 'HD available', highlight: false, icon: <FaRegSquare className="inline text-xl mr-2" /> },
  { label: '4k+HDR available', highlight: true, icon: <FaStar className="inline text-xl mr-2 text-red-400" /> },
  { label: 'Watch on your laptop and TV', highlight: false, icon: <FaTv className="inline text-xl mr-2" /> },
  { label: 'Watch on your mobile phone and tablet', highlight: false, icon: <FaMobileAlt className="inline text-xl mr-2" /> },
  { label: 'Screens you can watch on at the same time', highlight: false, icon: <FaUsers className="inline text-xl mr-2" /> },
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const RAZORPAY_KEY_ID = 'YOUR_KEY_ID'; // TODO: Replace with your Razorpay key_id

const Subscription = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  // Razorpay payment handler
  const handlePayment = async () => {
    if (!selectedPlan) return;
    try {
      // 1. Create order on backend
      const res = await fetch(`${BACKEND_URL}/api/v1/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(selectedPlan.price.replace('₹', '')) }),
      });
      const order = await res.json();
      if (!order.id) throw new Error('Failed to create order');

      // 2. Open Razorpay modal
      const options = {
        key: RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: 'Netflix Clone',
        description: `Subscription: ${selectedPlan.name}`,
        order_id: order.id,
        handler: function (response) {
          // TODO: Optionally verify payment on backend
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          closeModal();
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: { color: '#F37254' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-2 w-full">
        {/* Promo Box */}
        <div className="w-full flex justify-center mb-8">
          <div className="bg-gradient-to-r from-red-600 to-yellow-400 rounded-xl flex items-center gap-3 px-6 py-3 shadow-xl">
            <span className="text-2xl">🎁</span>
            <span className="text-white font-semibold text-lg md:text-xl">Start your free month</span>
          </div>
        </div>
        <div className="bg-zinc-900/90 rounded-3xl shadow-2xl p-4 md:p-10 flex flex-col md:flex-row gap-10 max-w-6xl w-full relative border border-zinc-800">
          {/* Left: Features */}
          <div className="flex flex-col gap-6 min-w-[220px] md:w-1/3">
            <div className="mb-2">
              <img src="https://i.pinimg.com/1200x/6e/55/e3/6e55e3f32df259ccd7a45a3c00111293.jpg" alt="YOURMOVIES" className="h-10 mb-4 rounded-lg shadow-md" />
              <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-2 leading-tight">Choose the plan that’s right for you</h2>
              <ul className="text-zinc-300 text-base md:text-lg flex flex-col gap-1 mb-2">
                <li className="flex items-center gap-2"><span className="text-red-500">✔</span> Unlimited movies and TV shows. Watch all you want ad-free.</li>
                <li className="flex items-center gap-2"><span className="text-red-500">✔</span> Change or cancel your plan anytime.</li>
              </ul>
            </div>
            <ul className="flex flex-col gap-6 mt-6">
              {featureList.map((feature, idx) => (
                <li key={feature.label} className={feature.highlight ? 'text-red-500 font-semibold flex items-center gap-2' : 'text-zinc-200 flex items-center gap-2'}>
                  {feature.icon}
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Plans Table */}
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, colIdx) => (
                <div
                  key={plan.name}
                  className={`relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 flex flex-col items-center shadow-xl border-2 transition-all duration-200 overflow-hidden
                    ${plan.highlight ? 'border-red-500 shadow-2xl scale-105 z-10' : 'border-zinc-700 hover:border-yellow-400 hover:shadow-2xl'}
                  `}
                >
                  {/* Popular badge inside card, right-aligned, not overflowing */}
                  {plan.highlight && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-red-600 text-xs text-white px-2 py-0.5 rounded flex items-center gap-1 shadow"><FaFire className="text-xs" /> Popular</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2 mt-2 w-full justify-center">
                    <span className="text-zinc-300 text-lg font-bold tracking-wide uppercase">{plan.name}</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow">{plan.price}</div>
                  <ul className="flex flex-col gap-7 mb-8 w-full">
                    {plan.features.map((feature, rowIdx) => (
                      <li key={rowIdx} className="flex items-center justify-center">
                        {typeof feature === 'boolean' ? (
                          feature ? <FaCheckCircle className="text-red-500 text-xl" /> : <FaTimesCircle className="text-zinc-500 text-xl" />
                        ) : (
                          <span className="text-white text-lg font-bold">{feature}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-auto bg-gradient-to-r from-red-600 to-yellow-400 hover:from-yellow-400 hover:to-red-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition-all text-lg tracking-wide"
                    onClick={() => handleChoosePlan(plan)}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Payment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-10 max-w-sm w-full flex flex-col items-center shadow-2xl border-2 border-red-500">
              <h2 className="text-2xl font-extrabold mb-4 text-black">Payment Gateway</h2>
              <p className="mb-2 text-black text-lg">You selected: <span className="font-semibold">{selectedPlan.name}</span></p>
              <p className="mb-6 text-black text-lg">Amount: <span className="font-semibold">{selectedPlan.price}</span></p>
              <button className="bg-gradient-to-r from-red-600 to-yellow-400 hover:from-yellow-400 hover:to-red-600 text-white font-bold py-2 px-8 rounded-lg mb-2 shadow-lg text-lg" onClick={handlePayment}>
                Proceed to Payment
              </button>
              <button className="text-gray-600 hover:text-black text-sm mt-2 underline" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription; 