import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Sale, Order } from '../types';
import StorageService from '../services/StorageService';

interface SalesContextType {
  sales: Sale[];
  convertOrderToSale: (order: Order) => void;
  getSaleById: (id: string) => Sale | undefined;
  getSalesByDateRange: (start: Date, end: Date) => Sale[];
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

const STORAGE_KEY = 'sales';

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const stored = StorageService.load<Sale[]>(STORAGE_KEY);
    if (stored) {
      setSales(stored);
    }
  }, []);

  useEffect(() => {
    if (sales.length > 0) {
      StorageService.save(STORAGE_KEY, sales);
    }
  }, [sales]);

  const generateSaleNumber = (): string => {
    const year = new Date().getFullYear();
    const count = sales.length + 1;
    return `SAT-${year}-${String(count).padStart(4, '0')}`;
  };

  const convertOrderToSale = (order: Order) => {
    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      siparisId: order.id,
      siparisNo: order.siparisNo,
      satisNo: generateSaleNumber(),
      cariId: order.cariId,
      cariAd: order.cariAd,
      items: order.items,
      araToplam: order.araToplam,
      toplamKdv: order.toplamKdv,
      genelToplam: order.genelToplam,
      satisTarihi: new Date(),
      createdAt: new Date()
    };
    setSales(prev => [...prev, newSale]);
  };

  const getSaleById = (id: string): Sale | undefined => {
    return sales.find(sale => sale.id === id);
  };

  const getSalesByDateRange = (start: Date, end: Date): Sale[] => {
    return sales.filter(sale => {
      const saleDate = new Date(sale.satisTarihi);
      return saleDate >= start && saleDate <= end;
    });
  };

  return (
    <SalesContext.Provider
      value={{
        sales,
        convertOrderToSale,
        getSaleById,
        getSalesByDateRange
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within SalesProvider');
  }
  return context;
};
