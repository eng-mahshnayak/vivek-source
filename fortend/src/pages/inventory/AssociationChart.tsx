import React from 'react';

interface AssociationChartProps {
  itemName?: string;
  componentName?: string;
  components?: Array<{ id: string; name: string; stock: number; unit: string }>;
  items?: Array<{ id: string; name: string; stock: number; unit: string }>;
  isComponentView?: boolean;
}

const AssociationChart: React.FC<AssociationChartProps> = ({
  itemName,
  componentName,
  components = [],
  items = [],
  isComponentView = false
}) => {
  
  if (isComponentView) {
    // Component View: Shows which items use this component
    return (
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          {/* Center - Component */}
          <div className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
            <div className="font-semibold">{componentName}</div>
            <div className="text-xs text-purple-200 text-center">Component</div>
          </div>
        </div>

        {/* Items that use this component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Connection Line */}
              {index === 0 && (
                <div className="absolute -top-6 left-1/2 w-px h-6 bg-gray-300"></div>
              )}
              
              {/* Item Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Stock: {item.stock} units</p>
                  </div>
                </div>
                
                {/* Usage Percentage Indicator */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Usage in this item</span>
                    <span className="font-medium text-purple-600">{(Math.random() * 30 + 20).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items are currently using this component
          </div>
        )}
      </div>
    );
  }

  // Item View: Shows components used in this item
  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-8">
        {/* Center - Item */}
        <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg">
          <div className="font-semibold">{itemName}</div>
          <div className="text-xs text-blue-200 text-center">Finished Product</div>
        </div>
      </div>

      {/* Components used in this item */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {components.map((component, index) => (
          <div key={component.id} className="relative">
            {/* Connection Line */}
            {index === 0 && (
              <div className="absolute -top-6 left-1/2 w-px h-6 bg-gray-300"></div>
            )}
            
            {/* Component Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{component.name}</h4>
                  <p className="text-sm text-gray-500">Stock: {component.stock} {component.unit}</p>
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Required per unit</span>
                  <span className="text-xs font-medium text-gray-700">{(Math.random() * 5 + 1).toFixed(1)} pcs</span>
                </div>
                <div className="mt-1">
                  {component.stock > 50 ? (
                    <span className="text-xs text-green-600">✓ Sufficient stock</span>
                  ) : (
                    <span className="text-xs text-red-600">⚠ Low stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {components.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No components associated with this item
        </div>
      )}
    </div>
  );
};

export default AssociationChart;