import { useSales } from '../contexts/SalesContext';
import MainLayout from '../components/MainLayout';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/Table';
import CalculationService from '../services/CalculationService';

const SalesListPage = () => {
  const { sales } = useSales();

  const totalSales = sales.reduce((sum, sale) => sum + sale.genelToplam, 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Satışlar</h1>
            <p className="text-gray-600">Gerçekleşen satışlarınızı görüntüleyin</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 px-8 py-4 rounded-xl shadow-lg text-white">
            <p className="text-sm text-green-100 mb-1">Toplam Satış</p>
            <p className="text-3xl font-bold">
              {CalculationService.formatCurrency(totalSales)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Satış Listesi</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Satış No</TableCell>
                <TableCell isHeader>Sipariş No</TableCell>
                <TableCell isHeader>Cari</TableCell>
                <TableCell isHeader>Satış Tarihi</TableCell>
                <TableCell isHeader>Toplam</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.satisNo}</TableCell>
                  <TableCell>{sale.siparisNo}</TableCell>
                  <TableCell>{sale.cariAd}</TableCell>
                  <TableCell>
                    {new Date(sale.satisTarihi).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {CalculationService.formatCurrency(sale.genelToplam)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {sales.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Henüz satış bulunmuyor</p>
              <p className="text-gray-400 text-sm mt-2">Siparişleri satışa dönüştürdüğünüzde burada görünecek</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SalesListPage;
