import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { OrderStatus, type Order } from '../types';
import StorageService from '../services/StorageService';

interface OrderContextType {
  currentOrder: Order | null;
  orders: Order[];
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (order: Order) => void;
  updateOrder: (id: string, order: Order) => void;
  deleteOrder: (id: string) => void;
  convertToSale: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'orders';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = StorageService.load<Order[]>(STORAGE_KEY);
    if (stored) {
      setOrders(stored);
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      StorageService.save(STORAGE_KEY, orders);
    }
  }, [orders]);

  const generateOrderNumber = (): string => {
    const year = new Date().getFullYear();
    const count = orders.length + 1;
    return `SIP-${year}-${String(count).padStart(4, '0')}`;
  };

  const createOrder = (order: Order) => {
    const newOrder = {
      ...order,
      siparisNo: generateOrderNumber(),
      durum: OrderStatus.TASLAK,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrder = (id: string, updatedOrder: Order) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...updatedOrder, updatedAt: new Date() }
          : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const convertToSale = (id: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, durum: OrderStatus.SATISA_DONDU, updatedAt: new Date() }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        orders,
        setCurrentOrder,
        createOrder,
        updateOrder,
        deleteOrder,
        convertToSale
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
