import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useCari } from '../contexts/CariContext';
import { OrderStatus, type OrderItem, type Product } from '../types';
import MainLayout from '../components/MainLayout';
import CariSelector from '../components/CariSelector';
import ProductSearch from '../components/ProductSearch';
import OrderItemsList from '../components/OrderItemsList';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import Input from '../components/Input';
import CalculationService from '../services/CalculationService';
import ValidationService from '../services/ValidationService';
import PDFService from '../services/PDFService';

const OrderCreatePage = () => {
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { getCariById } = useCari();
  
  const [selectedCariId, setSelectedCariId] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notlar, setNotlar] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [kdvDahil, setKdvDahil] = useState(true); // KDV dahil mi?

  const [totals, setTotals] = useState({
    araToplam: 0,
    toplamKdv: 0,
    genelToplam: 0
  });

  useEffect(() => {
    if (orderItems.length > 0) {
      const calculated = CalculationService.calculateOrderTotals(orderItems);
      
      // KDV dahil değilse, KDV'yi sıfırla
      if (!kdvDahil) {
        setTotals({
          araToplam: calculated.araToplam,
          toplamKdv: 0,
          genelToplam: calculated.araToplam
        });
      } else {
        setTotals(calculated);
      }
    } else {
      setTotals({ araToplam: 0, toplamKdv: 0, genelToplam: 0 });
    }
  }, [orderItems, kdvDahil]);

  const handleSelectProduct = (product: Product) => {
    const existingItem = orderItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      handleUpdateQuantity(existingItem.id, existingItem.miktar + 1);
    } else {
      const newItem: OrderItem = {
        id: `item-${Date.now()}`,
        productId: product.id,
        productKod: product.kod,
        productAd: product.ad,
        birim: product.birim,
        miktar: 1,
        birimFiyat: product.birimFiyat,
        kdvOrani: product.kdvOrani,
        satirToplam: product.birimFiyat,
        kdvTutar: (product.birimFiyat * product.kdvOrani) / 100,
        genelToplam: product.birimFiyat + (product.birimFiyat * product.kdvOrani) / 100
      };
      setOrderItems([...orderItems, newItem]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === itemId) {
        const satirToplam = quantity * item.birimFiyat;
        const kdvTutar = (satirToplam * item.kdvOrani) / 100;
        return {
          ...item,
          miktar: quantity,
          satirToplam,
          kdvTutar,
          genelToplam: satirToplam + kdvTutar
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const handleSave = () => {
    const cari = getCariById(selectedCariId);
    if (!cari) {
      setErrors(['Lütfen bir cari seçiniz']);
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      siparisNo: '',
      cariId: selectedCariId,
      cariAd: cari.ad,
      items: orderItems,
      araToplam: totals.araToplam,
      toplamKdv: totals.toplamKdv,
      genelToplam: totals.genelToplam,
      durum: OrderStatus.TASLAK,
      notlar: notlar || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const validation = ValidationService.validateOrder(order);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    createOrder(order);
    alert('Sipariş başarıyla kaydedildi!');
    navigate('/siparisler');
  };

  const handleGeneratePDF = () => {
    const cari = getCariById(selectedCariId);
    if (!cari) {
      setErrors(['Lütfen bir cari seçiniz']);
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      siparisNo: `TEMP-${Date.now()}`,
      cariId: selectedCariId,
      cariAd: cari.ad,
      items: orderItems,
      araToplam: totals.araToplam,
      toplamKdv: totals.toplamKdv,
      genelToplam: totals.genelToplam,
      durum: OrderStatus.TASLAK,
      notlar: notlar || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const validation = ValidationService.validateOrder(order);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    PDFService.generateOrderPDF(order, cari);
  };

  const handleClear = () => {
    if (window.confirm('Tüm bilgileri temizlemek istediğinizden emin misiniz?')) {
      setSelectedCariId('');
      setOrderItems([]);
      setNotlar('');
      setErrors([]);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Yeni Sipariş Oluştur</h1>
          <p className="text-gray-600">Cari seçin, ürün ekleyin ve siparişi kaydedin</p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Müşteri Seçimi</h3>
            </div>
            <CariSelector
              selectedCariId={selectedCariId}
              onSelect={setSelectedCariId}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Ürün Ara ve Ekle</h3>
            </div>
            <ProductSearch onSelectProduct={handleSelectProduct} />
          </div>

          <OrderItemsList
            items={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="kdvDahil"
                checked={kdvDahil}
                onChange={(e) => setKdvDahil(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="kdvDahil" className="text-gray-700 font-medium cursor-pointer select-none">
                KDV Dahil
              </label>
              {!kdvDahil && (
                <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
                  KDV Hariç
                </span>
              )}
            </div>
          </div>

          <OrderSummary
            araToplam={totals.araToplam}
            toplamKdv={totals.toplamKdv}
            genelToplam={totals.genelToplam}
            kdvDahil={kdvDahil}
          />

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Notlar</h3>
            </div>
            <Input
              label=""
              value={notlar}
              onChange={(e) => setNotlar(e.target.value)}
              placeholder="Sipariş ile ilgili notlar..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Button variant="success" onClick={handleSave} className="flex-1 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Siparişi Kaydet
            </Button>
            <Button variant="primary" onClick={handleGeneratePDF} className="flex-1 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              PDF Oluştur
            </Button>
            <Button variant="secondary" onClick={handleClear} className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Temizle
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderCreatePage;
