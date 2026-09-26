export const mockItems = [
  { 
    id: 'ITEM001', 
    name: 'Laptop Dell XPS 15', 
    stock: 45, 
    unit: 'pcs', 
    minStock: 20, 
    maxStock: 100, 
    location: 'Rack A-01',
    category: 'Electronics',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'ITEM002', 
    name: 'HP LaserJet Printer', 
    stock: 23, 
    unit: 'pcs', 
    minStock: 10, 
    maxStock: 50, 
    location: 'Rack B-03',
    category: 'Electronics',
    lastUpdated: '2024-01-14'
  },
  { 
    id: 'ITEM003', 
    name: 'Logitech Mouse', 
    stock: 156, 
    unit: 'pcs', 
    minStock: 50, 
    maxStock: 200, 
    location: 'Rack C-02',
    category: 'Accessories',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'ITEM004', 
    name: 'Samsung Monitor 24"', 
    stock: 18, 
    unit: 'pcs', 
    minStock: 15, 
    maxStock: 40, 
    location: 'Rack A-04',
    category: 'Electronics',
    lastUpdated: '2024-01-13'
  },
  { 
    id: 'ITEM005', 
    name: 'Seagate 1TB HDD', 
    stock: 67, 
    unit: 'pcs', 
    minStock: 30, 
    maxStock: 120, 
    location: 'Rack D-01',
    category: 'Storage',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'ITEM006', 
    name: 'iPhone 13 Cover', 
    stock: 234, 
    unit: 'pcs', 
    minStock: 100, 
    maxStock: 500, 
    location: 'Rack H-01',
    category: 'Accessories',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'ITEM007', 
    name: 'USB-C Hub', 
    stock: 89, 
    unit: 'pcs', 
    minStock: 40, 
    maxStock: 150, 
    location: 'Rack H-02',
    category: 'Accessories',
    lastUpdated: '2024-01-14'
  },
  { 
    id: 'ITEM008', 
    name: 'Wireless Keyboard', 
    stock: 34, 
    unit: 'pcs', 
    minStock: 25, 
    maxStock: 80, 
    location: 'Rack C-03',
    category: 'Accessories',
    lastUpdated: '2024-01-13'
  },
  { 
    id: 'ITEM009', 
    name: 'External DVD Drive', 
    stock: 12, 
    unit: 'pcs', 
    minStock: 15, 
    maxStock: 40, 
    location: 'Rack D-02',
    category: 'Storage',
    lastUpdated: '2024-01-12'
  },
  { 
    id: 'ITEM010', 
    name: 'Network Switch 8-Port', 
    stock: 28, 
    unit: 'pcs', 
    minStock: 20, 
    maxStock: 60, 
    location: 'Rack E-04',
    category: 'Networking',
    lastUpdated: '2024-01-15'
  }
];

export const mockComponents = [
  { 
    id: 'COMP001', 
    name: 'Intel i7 Processor', 
    stock: 89, 
    unit: 'pcs', 
    minStock: 30, 
    maxStock: 150, 
    location: 'Rack E-01',
    category: 'CPU',
    supplier: 'Intel Corp',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'COMP002', 
    name: '8GB DDR4 RAM', 
    stock: 234, 
    unit: 'pcs', 
    minStock: 100, 
    maxStock: 400, 
    location: 'Rack E-02',
    category: 'Memory',
    supplier: 'Samsung',
    lastUpdated: '2024-01-15'
  },
  // ... rest of your components
];