import React from 'react';

const Inventory: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600">Track stock and products.</p>
      </div>
    </div>
  );
};

export default Inventory;