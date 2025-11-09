import { useOrder } from '../contexts/OrderContext';
import { useCari } from '../contexts/CariContext';
import { useSales } from '../contexts/SalesContext';
import type { Order } from '../types';
import MainLayout from '../components/MainLayout';
import OrderTable from '../components/OrderTable';
import OrderActions from '../components/OrderActions';
import PDFService from '../services/PDFService';

const OrderListPage = () => {
  const { orders, deleteOrder, convertToSale } = useOrder();
  const { getCariById } = useCari();
  const { convertOrderToSale } = useSales();

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId);
  };

  const handleConvertToSale = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      convertOrderToSale(order);
      convertToSale(orderId);
      alert('Sipariş başarıyla satışa dönüştürüldü!');
    }
  };

  const handleGeneratePDF = (order: Order) => {
    const cari = getCariById(order.cariId);
    if (cari) {
      PDFService.generateOrderPDF(order, cari);
    } else {
      alert('Cari bilgisi bulunamadı!');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Siparişler</h1>
          <p className="text-gray-600">Tüm siparişlerinizi görüntüleyin ve yönetin</p>
        </div>
        
        <OrderTable orders={orders}>
          {(order) => (
            <OrderActions
              order={order}
              onDelete={handleDelete}
              onConvertToSale={handleConvertToSale}
              onGeneratePDF={handleGeneratePDF}
            />
          )}
        </OrderTable>
      </div>
    </MainLayout>
  );
};

export default OrderListPage;
