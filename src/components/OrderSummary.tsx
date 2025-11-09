import CalculationService from '../services/CalculationService';

interface OrderSummaryProps {
  araToplam: number;
  toplamKdv: number;
  genelToplam: number;
  kdvDahil?: boolean;
}

const OrderSummary = ({ araToplam, toplamKdv, genelToplam, kdvDahil = true }: OrderSummaryProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Sipariş Özeti</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
          <span className="text-gray-700 font-medium text-lg">Ara Toplam:</span>
          <span className="text-xl font-semibold text-gray-800">
            {CalculationService.formatCurrency(araToplam)}
          </span>
        </div>
        {kdvDahil && (
          <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
            <span className="text-gray-700 font-medium text-lg">Toplam KDV:</span>
            <span className="text-xl font-semibold text-gray-800">
              {CalculationService.formatCurrency(toplamKdv)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center pt-4 bg-white rounded-lg p-4 shadow-md">
          <div>
            <span className="text-2xl font-bold text-gray-800">Genel Toplam:</span>
            {!kdvDahil && (
              <span className="ml-2 text-sm text-orange-600 font-semibold">(KDV Hariç)</span>
            )}
          </div>
          <span className="text-3xl font-bold text-blue-600">
            {CalculationService.formatCurrency(genelToplam)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
