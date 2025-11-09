import type { OrderItem } from '../types';

class CalculationService {
  calculateItemTotal(item: OrderItem): number {
    const satirToplam = item.miktar * item.birimFiyat;
    const kdvTutar = (satirToplam * item.kdvOrani) / 100;
    return satirToplam + kdvTutar;
  }

  calculateOrderTotals(items: OrderItem[]): {
    araToplam: number;
    toplamKdv: number;
    genelToplam: number;
  } {
    let araToplam = 0;
    let toplamKdv = 0;

    items.forEach(item => {
      const satirToplam = item.miktar * item.birimFiyat;
      const kdvTutar = (satirToplam * item.kdvOrani) / 100;
      
      araToplam += satirToplam;
      toplamKdv += kdvTutar;
    });

    const genelToplam = araToplam + toplamKdv;

    return {
      araToplam: Math.round(araToplam * 100) / 100,
      toplamKdv: Math.round(toplamKdv * 100) / 100,
      genelToplam: Math.round(genelToplam * 100) / 100
    };
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }
}

export default new CalculationService();
