import { Link } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useSales } from '../contexts/SalesContext';
import { useCari } from '../contexts/CariContext';
import { useProduct } from '../contexts/ProductContext';
import MainLayout from '../components/MainLayout';
import CalculationService from '../services/CalculationService';

const HomePage = () => {
  const { orders } = useOrder();
  const { sales } = useSales();
  const { cariList } = useCari();
  const { products } = useProduct();

  const totalSales = sales.reduce((sum, sale) => sum + sale.genelToplam, 0);
  const totalOrders = orders.reduce((sum, order) => sum + order.genelToplam, 0);
  const recentOrders = orders.slice(-5).reverse();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {/* Başlık kaldırıldı */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-blue-100 mb-1">Toplam Sipariş</p>
            <p className="text-3xl font-bold mb-2">{orders.length}</p>
            <p className="text-sm text-blue-100">
              {CalculationService.formatCurrency(totalOrders)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-100 mb-1">Toplam Satış</p>
            <p className="text-3xl font-bold mb-2">{sales.length}</p>
            <p className="text-sm text-green-100">
              {CalculationService.formatCurrency(totalSales)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-purple-100 mb-1">Toplam Cari</p>
            <p className="text-3xl font-bold">{cariList.length}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-orange-100 mb-1">Toplam Ürün</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/siparis-olustur"
            className="group bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg group-hover:bg-opacity-30 transition">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Yeni Sipariş Oluştur</h2>
                <p className="text-blue-100">Hızlıca yeni bir sipariş oluşturun</p>
              </div>
            </div>
          </Link>

          <Link
            to="/siparisler"
            className="group bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg group-hover:bg-opacity-30 transition">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Siparişleri Görüntüle</h2>
                <p className="text-green-100">Tüm siparişleri listeleyin</p>
              </div>
            </div>
          </Link>
        </div>

        {recentOrders.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Son Siparişler</h2>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition border border-gray-200"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-gray-800 text-lg">{order.siparisNo}</p>
                    <p className="text-sm text-gray-600">{order.cariAd}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-blue-600 text-lg">
                      {CalculationService.formatCurrency(order.genelToplam)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
