import type { Order } from '../types';
import Button from './Button';

interface OrderActionsProps {
  order: Order;
  onDelete: (orderId: string) => void;
  onConvertToSale: (orderId: string) => void;
  onGeneratePDF: (order: Order) => void;
}

const OrderActions = ({ order, onDelete, onConvertToSale, onGeneratePDF }: OrderActionsProps) => {
  const handleDelete = () => {
    if (window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      onDelete(order.id);
    }
  };

  const handleConvertToSale = () => {
    if (window.confirm('Bu siparişi satışa dönüştürmek istediğinizden emin misiniz?')) {
      onConvertToSale(order.id);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="text-sm px-3 py-1"
        onClick={() => onGeneratePDF(order)}
      >
        PDF
      </Button>
      {order.durum !== 'satisa_dondu' && (
        <Button
          variant="success"
          className="text-sm px-3 py-1"
          onClick={handleConvertToSale}
        >
          Satışa Dönüştür
        </Button>
      )}
      <Button
        variant="danger"
        className="text-sm px-3 py-1"
        onClick={handleDelete}
      >
        Sil
      </Button>
    </>
  );
};

export default OrderActions;
