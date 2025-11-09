import { useState } from 'react';
import { useProduct } from '../contexts/ProductContext';
import type { Product } from '../types';
import SearchInput from './SearchInput';
import CalculationService from '../services/CalculationService';

interface ProductSearchProps {
  onSelectProduct: (product: Product) => void;
}

const ProductSearch = ({ onSelectProduct }: ProductSearchProps) => {
  const { searchProducts } = useProduct();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <SearchInput
        label="Ürün Ara"
        placeholder="Ürün adı veya kodu ile ara..."
        onSearch={handleSearch}
      />
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
              onClick={() => handleSelect(product)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{product.ad}</p>
                  <p className="text-sm text-gray-600">Kod: {product.kod} | Birim: {product.birim}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {CalculationService.formatCurrency(product.birimFiyat)}
                  </p>
                  <p className="text-sm text-gray-600">KDV: %{product.kdvOrani}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && searchResults.length === 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg p-4">
          <p className="text-gray-600 text-center">Ürün bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
