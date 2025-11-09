import { useState } from 'react';
import { useCari } from '../contexts/CariContext';
import type { Cari } from '../types';
import MainLayout from '../components/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import ValidationService from '../services/ValidationService';

const CariManagementPage = () => {
  const { cariList, addCari, updateCari, deleteCari } = useCari();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCari, setEditingCari] = useState<Cari | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    kod: '',
    ad: '',
    telefon: '',
    email: '',
    adres: '',
    vergiNo: ''
  });

  const resetForm = () => {
    setFormData({
      kod: '',
      ad: '',
      telefon: '',
      email: '',
      adres: '',
      vergiNo: ''
    });
    setEditingCari(null);
    setErrors([]);
    setIsFormOpen(false);
  };

  const handleEdit = (cari: Cari) => {
    setEditingCari(cari);
    setFormData({
      kod: cari.kod,
      ad: cari.ad,
      telefon: cari.telefon || '',
      email: cari.email || '',
      adres: cari.adres || '',
      vergiNo: cari.vergiNo || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cariData: Cari = {
      id: editingCari?.id || `cari-${Date.now()}`,
      ...formData,
      createdAt: editingCari?.createdAt || new Date(),
      updatedAt: new Date()
    };

    const validation = ValidationService.validateCari(cariData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingCari) {
      updateCari(editingCari.id, cariData);
    } else {
      addCari(cariData);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu cariyi silmek istediğinizden emin misiniz?')) {
      deleteCari(id);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Cari Yönetimi</h1>
            <p className="text-gray-600">Müşteri bilgilerini yönetin</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Cari Ekle
          </Button>
        </div>

        {isFormOpen && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCari ? 'Cari Düzenle' : 'Yeni Cari Ekle'}
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
                  label="Cari Kodu *"
                  value={formData.kod}
                  onChange={(e) => setFormData({ ...formData, kod: e.target.value })}
                  required
                />
                <Input
                  label="Cari Adı *"
                  value={formData.ad}
                  onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                  required
                />
                <Input
                  label="Telefon"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                />
                <Input
                  label="E-posta"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="Vergi No"
                  value={formData.vergiNo}
                  onChange={(e) => setFormData({ ...formData, vergiNo: e.target.value })}
                />
                <Input
                  label="Adres"
                  value={formData.adres}
                  onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="success">
                  {editingCari ? 'Güncelle' : 'Kaydet'}
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
            <h2 className="text-xl font-bold text-gray-800">Cari Listesi</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Kod</TableCell>
                <TableCell isHeader>Ad</TableCell>
                <TableCell isHeader>Telefon</TableCell>
                <TableCell isHeader>E-posta</TableCell>
                <TableCell isHeader>İşlemler</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cariList.map((cari) => (
                <TableRow key={cari.id}>
                  <TableCell>{cari.kod}</TableCell>
                  <TableCell>{cari.ad}</TableCell>
                  <TableCell>{cari.telefon || '-'}</TableCell>
                  <TableCell>{cari.email || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        className="text-sm px-3 py-1"
                        onClick={() => handleEdit(cari)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="danger"
                        className="text-sm px-3 py-1"
                        onClick={() => handleDelete(cari.id)}
                      >
                        Sil
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {cariList.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Henüz cari eklenmemiş</p>
              <p className="text-gray-400 text-sm mt-2">Yeni cari eklemek için yukarıdaki butonu kullanın</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CariManagementPage;
