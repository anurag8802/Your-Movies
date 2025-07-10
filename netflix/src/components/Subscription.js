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

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-2">
      {/* Promo Box - now above the main content and centered */}
      <div className="w-full flex justify-center mb-8">
        <div className="bg-zinc-800 rounded-xl flex items-center gap-3 px-6 py-3 shadow-lg">
          <span className="text-2xl">🎁</span>
          <span className="text-white font-semibold">Start your free month</span>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-14 flex flex-col md:flex-row gap-10 max-w-5xl w-full relative">
        {/* Left: Features */}
        <div className="flex flex-col gap-6 min-w-[220px]">
          <div className="mb-2">
            <img src="https://i.pinimg.com/1200x/6e/55/e3/6e55e3f32df259ccd7a45a3c00111293.jpg" alt="YOURMOVIES" className="h-8 mb-4" />
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Choose the plan that’s right for you</h2>
            <ul className="text-zinc-300 text-base md:text-lg list-none flex flex-col gap-1 mb-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {plans.map((plan, colIdx) => (
              <div key={plan.name} className={`bg-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-lg relative overflow-hidden ${plan.highlight ? 'border-2 border-red-500' : ''}`}>
                {/* Popular badge inside card, right-aligned, not overflowing */}
                {plan.highlight && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-red-600 text-xs text-white px-2 py-0.5 rounded flex items-center gap-1"><FaFire className="text-xs" /> Popular</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2 mt-2 w-full justify-center">
                  <span className="text-zinc-300 text-lg font-semibold">{plan.name}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-6">{plan.price}</div>
                <ul className="flex flex-col gap-7 mb-8">
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
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors" onClick={() => handleChoosePlan(plan)}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Payment Gateway</h2>
            <p className="mb-2 text-black">You selected: <span className="font-semibold">{selectedPlan.name}</span></p>
            <p className="mb-6 text-black">Amount: <span className="font-semibold">{selectedPlan.price}</span></p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg mb-2" onClick={closeModal}>
              Proceed to Payment
            </button>
            <button className="text-gray-600 hover:text-black text-sm" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Subscription; 