import React, { useState } from 'react';
import StockCard from './StockCard';
import AssociationChart from './AssociationChart';
import { mockItems } from './mockData';

const ComponentStock: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Components with their stock levels
  const components = [
    { id: 'COMP001', name: 'Intel i7 Processor', stock: 89, unit: 'pcs', minStock: 30, maxStock: 150, location: 'Rack E-01' },
    { id: 'COMP002', name: '8GB DDR4 RAM', stock: 234, unit: 'pcs', minStock: 100, maxStock: 400, location: 'Rack E-02' },
    { id: 'COMP003', name: '512GB SSD', stock: 67, unit: 'pcs', minStock: 40, maxStock: 200, location: 'Rack E-03' },
    { id: 'COMP004', name: 'Motherboard B460', stock: 34, unit: 'pcs', minStock: 20, maxStock: 80, location: 'Rack F-01' },
    { id: 'COMP005', name: 'Cooling Fan', stock: 156, unit: 'pcs', minStock: 60, maxStock: 250, location: 'Rack F-02' },
    { id: 'COMP006', name: 'Power Supply 550W', stock: 42, unit: 'pcs', minStock: 25, maxStock: 100, location: 'Rack F-03' },
    { id: 'COMP007', name: 'USB 3.0 Cable', stock: 567, unit: 'mtr', minStock: 200, maxStock: 1000, location: 'Rack G-01' },
    { id: 'COMP008', name: 'HDMI Cable 1.5m', stock: 345, unit: 'pcs', minStock: 150, maxStock: 600, location: 'Rack G-02' },
  ];

  // Association data: which items use which components (reverse mapping)
  const associations = {
    'COMP001': ['ITEM001', 'ITEM004'], // Processor used in Laptop and Monitor
    'COMP002': ['ITEM002', 'ITEM005'], // RAM used in Printer and HDD
    'COMP003': ['ITEM001', 'ITEM003'], // SSD used in Laptop and Mouse
    'COMP004': ['ITEM002', 'ITEM004'], // Motherboard used in Printer and Monitor
    'COMP005': ['ITEM001', 'ITEM005'], // Fan used in Laptop and HDD
    'COMP006': ['ITEM002', 'ITEM004'], // Power supply used in Printer and Monitor
    'COMP007': ['ITEM001', 'ITEM003', 'ITEM004'], // USB cable used in many
    'COMP008': ['ITEM002', 'ITEM004'], // HDMI used in Printer and Monitor
  };

  const getItemsForComponent = (componentId: string) => {
    const itemIds = associations[componentId as keyof typeof associations] || [];
    return mockItems.filter(item => itemIds.includes(item.id));
  };

  // Get stock status color
  const getStockStatus = (stock: number, min: number, max: number) => {
    if (stock < min) return 'border-l-4 border-red-500';
    if (stock > max) return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-green-500';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🔧 Component Stock Dashboard</h1>
          <p className="text-gray-600 mt-1">Track raw materials and their usage in finished items</p>
        </div>
        
        {/* Summary Box */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">Total Components</div>
          <div className="text-2xl font-bold text-blue-600">{components.length}</div>
          <div className="text-xs text-gray-500 mt-1">Across 8 categories</div>
        </div>
      </div>

      {/* Stock Cards Grid - Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {components.map((component) => (
          <div 
            key={component.id} 
            className={`cursor-pointer transition-all duration-300 ${
              selectedComponent === component.id ? 'scale-105 z-10' : 'hover:scale-102'
            }`}
            onClick={() => setSelectedComponent(component.id === selectedComponent ? null : component.id)}
          >
            <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all ${getStockStatus(component.stock, component.minStock, component.maxStock)}`}>
              <StockCard
                title={component.name}
                stock={component.stock}
                unit={component.unit}
                minStock={component.minStock}
                maxStock={component.maxStock}
                location={component.location}
                id={component.id}
                type="component"
              />
              
              {/* Quick Usage Indicator */}
              <div className="px-4 pb-3 text-xs text-gray-500 border-t pt-2 mt-1">
                <span className="font-medium">Used in: </span>
                {getItemsForComponent(component.id).slice(0, 3).map(item => item.name.split(' ')[0]).join(' • ')}
                {getItemsForComponent(component.id).length > 3 && ' • +more'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Association Chart - Shows when component is selected */}
      {selectedComponent && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
              Usage Analysis
            </span>
            🔗 Where {components.find(c => c.id === selectedComponent)?.name} is used
          </h2>
          
          <AssociationChart
            componentName={components.find(c => c.id === selectedComponent)?.name || ''}
            items={getItemsForComponent(selectedComponent)}
            isComponentView={true}
          />
          
          {/* Additional Stats Box */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Total Usage</div>
              <div className="text-xl font-bold text-blue-600">
                {getItemsForComponent(selectedComponent).length} items
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Stock Status</div>
              <div className="text-xl font-bold">
                {(() => {
                  const comp = components.find(c => c.id === selectedComponent);
                  if (!comp) return 'N/A';
                  if (comp.stock < comp.minStock) return <span className="text-red-600">Low Stock</span>;
                  if (comp.stock > comp.maxStock) return <span className="text-yellow-600">Over Stock</span>;
                  return <span className="text-green-600">Optimal</span>;
                })()}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600">Reorder Point</div>
              <div className="text-xl font-bold text-purple-600">
                {components.find(c => c.id === selectedComponent)?.minStock}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentStock;