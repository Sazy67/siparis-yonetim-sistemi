// Enums as const objects
export const ErrorType = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE: 'DUPLICATE',
  UNKNOWN: 'UNKNOWN'
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

export const OrderStatus = {
  TASLAK: 'taslak',
  ONAYLANDI: 'onaylandi',
  SATISA_DONDU: 'satisa_dondu'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

// Cari (Müşteri)
export interface Cari {
  id: string;
  kod: string;
  ad: string;
  telefon?: string;
  email?: string;
  adres?: string;
  vergiNo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Ürün
export interface Product {
  id: string;
  kod: string;
  ad: string;
  birim: string;
  birimFiyat: number;
  kdvOrani: number;
  stokMiktari?: number;
  aciklama?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sipariş Kalemi
export interface OrderItem {
  id: string;
  productId: string;
  productKod: string;
  productAd: string;
  birim: string;
  miktar: number;
  birimFiyat: number;
  kdvOrani: number;
  satirToplam: number;
  kdvTutar: number;
  genelToplam: number;
}

// Sipariş
export interface Order {
  id: string;
  siparisNo: string;
  cariId: string;
  cariAd: string;
  items: OrderItem[];
  araToplam: number;
  toplamKdv: number;
  genelToplam: number;
  durum: OrderStatus;
  notlar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Satış
export interface Sale {
  id: string;
  siparisId: string;
  siparisNo: string;
  satisNo: string;
  cariId: string;
  cariAd: string;
  items: OrderItem[];
  araToplam: number;
  toplamKdv: number;
  genelToplam: number;
  satisTarihi: Date;
  createdAt: Date;
}

// Error
export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
}

// Validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
