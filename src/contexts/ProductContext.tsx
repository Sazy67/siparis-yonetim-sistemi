import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';
import StorageService from '../services/StorageService';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'products';

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = StorageService.load<Product[]>(STORAGE_KEY);
    if (stored) {
      setProducts(stored);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      StorageService.save(STORAGE_KEY, products);
    }
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(product => (product.id === id ? updatedProduct : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) {
      return products;
    }
    
    const lowerQuery = query.toLowerCase();
    return products.filter(
      product =>
        product.ad.toLowerCase().includes(lowerQuery) ||
        product.kod.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
};
