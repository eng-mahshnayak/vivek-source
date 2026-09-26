import React from 'react';

const Payment: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Entries</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600">Manage payment transactions.</p>
      </div>
    </div>
  );
};

export default Payment;