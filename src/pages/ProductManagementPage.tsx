import { useState } from 'react';
import { useProduct } from '../contexts/ProductContext';
import type { Product } from '../types';
import MainLayout from '../components/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import ValidationService from '../services/ValidationService';
import CalculationService from '../services/CalculationService';

const ProductManagementPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    kod: '',
    ad: '',
    birim: '',
    birimFiyat: '',
    kdvOrani: '',
    stokMiktari: '',
    aciklama: ''
  });

  const resetForm = () => {
    setFormData({
      kod: '',
      ad: '',
      birim: '',
      birimFiyat: '',
      kdvOrani: '',
      stokMiktari: '',
      aciklama: ''
    });
    setEditingProduct(null);
    setErrors([]);
    setIsFormOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      kod: product.kod,
      ad: product.ad,
      birim: product.birim,
      birimFiyat: product.birimFiyat.toString(),
      kdvOrani: product.kdvOrani.toString(),
      stokMiktari: product.stokMiktari?.toString() || '',
      aciklama: product.aciklama || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      kod: formData.kod,
      ad: formData.ad,
      birim: formData.birim,
      birimFiyat: parseFloat(formData.birimFiyat),
      kdvOrani: parseFloat(formData.kdvOrani),
      stokMiktari: formData.stokMiktari ? parseFloat(formData.stokMiktari) : undefined,
      aciklama: formData.aciklama || undefined,
      createdAt: editingProduct?.createdAt || new Date(),
      updatedAt: new Date()
    };

    const validation = ValidationService.validateProduct(productData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      deleteProduct(id);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Ürün Yönetimi</h1>
            <p className="text-gray-600">Ürün bilgilerini ve fiyatları yönetin</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Ürün Ekle
          </Button>
        </div>

        {isFormOpen && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
            </div>
            
            {errors.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Ürün Kodu *"
                  value={formData.kod}
                  onChange={(e) => setFormData({ ...formData, kod: e.target.value })}
                  required
                />
                <Input
                  label="Ürün Adı *"
                  value={formData.ad}
                  onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                  required
                />
                <Input
                  label="Birim *"
                  value={formData.birim}
                  onChange={(e) => setFormData({ ...formData, birim: e.target.value })}
                  placeholder="adet, kg, m, m2, vb."
                  required
                />
                <Input
                  label="Birim Fiyat *"
                  type="number"
                  step="0.01"
                  value={formData.birimFiyat}
                  onChange={(e) => setFormData({ ...formData, birimFiyat: e.target.value })}
                  required
                />
                <Input
                  label="KDV Oranı (%) *"
                  type="number"
                  step="1"
                  value={formData.kdvOrani}
                  onChange={(e) => setFormData({ ...formData, kdvOrani: e.target.value })}
                  placeholder="0, 1, 8, 18, 20"
                  required
                />
                <Input
                  label="Stok Miktarı"
                  type="number"
                  step="0.01"
                  value={formData.stokMiktari}
                  onChange={(e) => setFormData({ ...formData, stokMiktari: e.target.value })}
                />
                <div className="col-span-2">
                  <Input
                    label="Açıklama"
                    value={formData.aciklama}
                    onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="success">
                  {editingProduct ? 'Güncelle' : 'Kaydet'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  İptal
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Ürün Listesi</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Kod</TableCell>
                <TableCell isHeader>Ad</TableCell>
                <TableCell isHeader>Birim</TableCell>
                <TableCell isHeader>Fiyat</TableCell>
                <TableCell isHeader>KDV</TableCell>
                <TableCell isHeader>Stok</TableCell>
                <TableCell isHeader>İşlemler</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.kod}</TableCell>
                  <TableCell>{product.ad}</TableCell>
                  <TableCell>{product.birim}</TableCell>
                  <TableCell>{CalculationService.formatCurrency(product.birimFiyat)}</TableCell>
                  <TableCell>%{product.kdvOrani}</TableCell>
                  <TableCell>{product.stokMiktari || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        className="text-sm px-3 py-1"
                        onClick={() => handleEdit(product)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="danger"
                        className="text-sm px-3 py-1"
                        onClick={() => handleDelete(product.id)}
                      >
                        Sil
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-lg">Henüz ürün eklenmemiş</p>
              <p className="text-gray-400 text-sm mt-2">Yeni ürün eklemek için yukarıdaki butonu kullanın</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductManagementPage;
