import { create } from 'zustand';

interface orderObject {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface orders {
  orderId: string;
  customerName: string;
  order: orderObject[];
  total: number;
  payment: string;
  inQueue: boolean;
}

interface ordersAction {
  setOrderId: (order: orders['orderId']) => void;
  setCustomerName: (order: orders['customerName']) => void;
  setOrder: (order: orderObject) => void;
  setTotal: (order: orders['total']) => void;
  setPayment: (order: orders['payment']) => void;
  setInQueue: (order: orders['inQueue']) => void;
}

export const orderStore = create<orders & ordersAction>((set) => ({
  orderId: '',
  customerName: '',
  order: [],
  total: 0,
  payment: '',
  inQueue: true,
  setOrderId: (orderId) => set(() => ({ orderId: orderId })),
  setCustomerName: (customerName) => set(() => ({ customerName: customerName })),
  setOrder: (newOrder) => set((state) => ({ 
    order: [
      ...state.order,
      newOrder
    ] 
  })),
  setTotal: (total) => set(() => ({ total: total })),
  setPayment: (payment) => set(() => ({ payment: payment })),
  setInQueue: (inQueue) => set(() => ({ inQueue: inQueue }))
}));