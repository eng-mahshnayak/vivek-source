export interface SaleItem {
  id: number;
  time: string;
  invoice: string;
  customer: string;
  items: number;
  amount: number;
  payment: 'Cash' | 'Card' | 'UPI' | 'Credit';
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface ProfitData {
  category: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  location: string;
  value: number;
}

export interface CreditOutstanding {
  customerId: string;
  customerName: string;
  invoiceNo: string;
  date: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'Current' | 'Overdue' | 'Paid';
}

export interface DeliveryBoyCollection {
  boyId: string;
  boyName: string;
  totalCollections: number;
  cashCollected: number;
  upiCollected: number;
  pendingAmount: number;
  lastCollection: string;
  status: 'Active' | 'Inactive';
}

export interface ShortageItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minRequired: number;
  shortage: number;
  unit: string;
  urgency: 'High' | 'Medium' | 'Low';
}

export interface PurchaseVsSale {
  month: string;
  purchases: number;
  sales: number;
  ratio: number;
  trend: 'up' | 'down' | 'stable';
}