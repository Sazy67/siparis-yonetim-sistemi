import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Cari } from '../types';
import StorageService from '../services/StorageService';

interface CariContextType {
  cariList: Cari[];
  addCari: (cari: Cari) => void;
  updateCari: (id: string, cari: Cari) => void;
  deleteCari: (id: string) => void;
  getCariById: (id: string) => Cari | undefined;
}

const CariContext = createContext<CariContextType | undefined>(undefined);

const STORAGE_KEY = 'cariList';

export const CariProvider = ({ children }: { children: ReactNode }) => {
  const [cariList, setCariList] = useState<Cari[]>([]);

  useEffect(() => {
    const stored = StorageService.load<Cari[]>(STORAGE_KEY);
    if (stored) {
      setCariList(stored);
    }
  }, []);

  useEffect(() => {
    if (cariList.length > 0) {
      StorageService.save(STORAGE_KEY, cariList);
    }
  }, [cariList]);

  const addCari = (cari: Cari) => {
    setCariList(prev => [...prev, cari]);
  };

  const updateCari = (id: string, updatedCari: Cari) => {
    setCariList(prev =>
      prev.map(cari => (cari.id === id ? updatedCari : cari))
    );
  };

  const deleteCari = (id: string) => {
    setCariList(prev => prev.filter(cari => cari.id !== id));
  };

  const getCariById = (id: string): Cari | undefined => {
    return cariList.find(cari => cari.id === id);
  };

  return (
    <CariContext.Provider
      value={{
        cariList,
        addCari,
        updateCari,
        deleteCari,
        getCariById
      }}
    >
      {children}
    </CariContext.Provider>
  );
};

export const useCari = () => {
  const context = useContext(CariContext);
  if (!context) {
    throw new Error('useCari must be used within CariProvider');
  }
  return context;
};
