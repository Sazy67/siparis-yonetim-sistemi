import { Routes, Route } from 'react-router-dom'
import { CariProvider } from './contexts/CariContext'
import { ProductProvider } from './contexts/ProductContext'
import { OrderProvider } from './contexts/OrderContext'
import { SalesProvider } from './contexts/SalesContext'
import HomePage from './pages/HomePage'
import OrderCreatePage from './pages/OrderCreatePage'
import OrderListPage from './pages/OrderListPage'
import SalesListPage from './pages/SalesListPage'
import CariManagementPage from './pages/CariManagementPage'
import ProductManagementPage from './pages/ProductManagementPage'
import PDFSettingsPage from './pages/PDFSettingsPage'

function App() {
  return (
    <CariProvider>
      <ProductProvider>
        <OrderProvider>
          <SalesProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/siparis-olustur" element={<OrderCreatePage />} />
              <Route path="/siparisler" element={<OrderListPage />} />
              <Route path="/satislar" element={<SalesListPage />} />
              <Route path="/cariler" element={<CariManagementPage />} />
              <Route path="/urunler" element={<ProductManagementPage />} />
              <Route path="/pdf-ayarlari" element={<PDFSettingsPage />} />
              <Route path="*" element={<div className="p-8 text-center"><h1 className="text-3xl font-bold text-gray-800">404 - Sayfa Bulunamadı</h1></div>} />
            </Routes>
          </SalesProvider>
        </OrderProvider>
      </ProductProvider>
    </CariProvider>
  )
}

export default App
