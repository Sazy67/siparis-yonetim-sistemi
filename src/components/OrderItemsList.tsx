import type { OrderItem } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table';
import Button from './Button';
import CalculationService from '../services/CalculationService';

interface OrderItemsListProps {
  items: OrderItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const OrderItemsList = ({ items, onUpdateQuantity, onRemoveItem }: OrderItemsListProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800">Seçilen Ürünler</h3>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>No</TableCell>
            <TableCell isHeader>Kod</TableCell>
            <TableCell isHeader>Ürün</TableCell>
            <TableCell isHeader>Miktar</TableCell>
            <TableCell isHeader>Birim</TableCell>
            <TableCell isHeader>Fiyat</TableCell>
            <TableCell isHeader>KDV</TableCell>
            <TableCell isHeader>Ara Toplam</TableCell>
            <TableCell isHeader>Toplam</TableCell>
            <TableCell isHeader>İşlem</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.productKod}</TableCell>
              <TableCell>{item.productAd}</TableCell>
              <TableCell>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.miktar}
                  onChange={(e) => onUpdateQuantity(item.id, parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </TableCell>
              <TableCell>{item.birim}</TableCell>
              <TableCell>{CalculationService.formatCurrency(item.birimFiyat)}</TableCell>
              <TableCell>%{item.kdvOrani}</TableCell>
              <TableCell>{CalculationService.formatCurrency(item.satirToplam)}</TableCell>
              <TableCell className="font-semibold">
                {CalculationService.formatCurrency(item.genelToplam)}
              </TableCell>
              <TableCell>
                <Button
                  variant="danger"
                  className="text-sm px-3 py-1"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Sil
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {items.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-lg">Henüz ürün eklenmemiş</p>
          <p className="text-gray-400 text-sm mt-2">Yukarıdaki arama kutusundan ürün arayıp ekleyin</p>
        </div>
      )}
    </div>
  );
};

export default OrderItemsList;
