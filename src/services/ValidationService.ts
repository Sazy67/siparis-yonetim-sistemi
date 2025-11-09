import type { Cari, Product, Order, ValidationResult } from '../types';

class ValidationService {
  validateCari(cari: Cari): ValidationResult {
    const errors: string[] = [];

    if (!cari.kod || cari.kod.trim() === '') {
      errors.push('Cari kodu zorunludur');
    }

    if (!cari.ad || cari.ad.trim() === '') {
      errors.push('Cari adı zorunludur');
    }

    if (cari.email && !this.isValidEmail(cari.email)) {
      errors.push('Geçerli bir e-posta adresi giriniz');
    }

    if (cari.telefon && !this.isValidPhone(cari.telefon)) {
      errors.push('Geçerli bir telefon numarası giriniz');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateProduct(product: Product): ValidationResult {
    const errors: string[] = [];

    if (!product.kod || product.kod.trim() === '') {
      errors.push('Ürün kodu zorunludur');
    }

    if (!product.ad || product.ad.trim() === '') {
      errors.push('Ürün adı zorunludur');
    }

    if (!product.birim || product.birim.trim() === '') {
      errors.push('Birim zorunludur');
    }

    if (product.birimFiyat <= 0) {
      errors.push('Birim fiyat sıfırdan büyük olmalıdır');
    }

    if (product.kdvOrani < 0 || product.kdvOrani > 100) {
      errors.push('KDV oranı 0-100 arasında olmalıdır');
    }

    if (product.stokMiktari !== undefined && product.stokMiktari < 0) {
      errors.push('Stok miktarı negatif olamaz');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateOrder(order: Order): ValidationResult {
    const errors: string[] = [];

    if (!order.cariId || order.cariId.trim() === '') {
      errors.push('Cari seçimi zorunludur');
    }

    if (!order.items || order.items.length === 0) {
      errors.push('En az bir ürün eklenmelidir');
    }

    order.items.forEach((item, index) => {
      if (item.miktar <= 0) {
        errors.push(`${index + 1}. ürün için miktar sıfırdan büyük olmalıdır`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }
}

export default new ValidationService();
