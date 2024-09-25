import { MouseEventHandler } from 'react';
import { create } from 'zustand';

interface orderObject {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface orders {
  itemAmount: number;
  orderId: string;
  customerName: string;
  order: orderObject[];
  total: number;
  payment: string;
  inQueue: boolean;
}

interface ordersAction {
  setItemAmount: (order: orders['itemAmount']) => void;
  // addItemAmount: (order: orders['itemAmount']) => void;
  addItemAmount: MouseEventHandler<HTMLButtonElement>;
  // removeItemAmount: (order: orders['itemAmount']) => void;
  removeItemAmount: MouseEventHandler<HTMLButtonElement>
  setOrderId: (order: orders['orderId']) => void;
  setCustomerName: (order: orders['customerName']) => void;
  setOrder: (order: orderObject) => void;
  setTotal: (order: orders['total']) => void;
  setPayment: (order: orders['payment']) => void;
  setInQueue: (order: orders['inQueue']) => void;
}

export const orderStore = create<orders & ordersAction>((set) => ({
  itemAmount: 0,
  orderId: '',
  customerName: '',
  order: [],
  total: 0,
  payment: '',
  inQueue: true,
  setItemAmount: (itemAmount) => set(() => ({ itemAmount: itemAmount })),
  addItemAmount: () => set((state) => ({ itemAmount: state.itemAmount += 1})),
  removeItemAmount: () => set((state) => ({ itemAmount: Math.max((state.itemAmount -= 1), 0) })),
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