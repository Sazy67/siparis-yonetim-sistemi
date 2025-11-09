import { ErrorType, type AppError } from '../types';

class StorageService {
  save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      const appError: AppError = {
        type: ErrorType.STORAGE_ERROR,
        message: 'Veri kaydedilemedi',
        details: error
      };
      throw appError;
    }
  }

  load<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as T;
    } catch (error) {
      const appError: AppError = {
        type: ErrorType.STORAGE_ERROR,
        message: 'Veri yüklenemedi',
        details: error
      };
      throw appError;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      const appError: AppError = {
        type: ErrorType.STORAGE_ERROR,
        message: 'Veri silinemedi',
        details: error
      };
      throw appError;
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      const appError: AppError = {
        type: ErrorType.STORAGE_ERROR,
        message: 'Tüm veriler temizlenemedi',
        details: error
      };
      throw appError;
    }
  }
}

export default new StorageService();
