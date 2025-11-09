import type { Order } from '../types';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table';
import CalculationService from '../services/CalculationService';

interface OrderTableProps {
  orders: Order[];
  onViewDetails?: (order: Order) => void;
  children?: (order: Order) => React.ReactNode;
}

const OrderTable = ({ orders, children }: OrderTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Sipariş Listesi</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Sipariş No</TableCell>
            <TableCell isHeader>Cari</TableCell>
            <TableCell isHeader>Tarih</TableCell>
            <TableCell isHeader>Durum</TableCell>
            <TableCell isHeader>Toplam</TableCell>
            <TableCell isHeader>İşlemler</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.siparisNo}</TableCell>
              <TableCell>{order.cariAd}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString('tr-TR')}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.durum === 'taslak'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.durum === 'onaylandi'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.durum === 'taslak'
                    ? 'Taslak'
                    : order.durum === 'onaylandi'
                    ? 'Onaylandı'
                    : 'Satışa Döndü'}
                </span>
              </TableCell>
              <TableCell className="font-semibold">
                {CalculationService.formatCurrency(order.genelToplam)}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {children && children(order)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">Henüz sipariş bulunmuyor</p>
          <p className="text-gray-400 text-sm mt-2">Yeni sipariş oluşturmak için "Yeni Sipariş" sayfasını kullanın</p>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
