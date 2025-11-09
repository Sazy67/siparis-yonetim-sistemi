# İmplementasyon Planı

- [x] 1. Proje yapısını ve temel konfigürasyonu oluştur





  - React + TypeScript projesi oluştur (Vite kullanarak)
  - Tailwind CSS konfigürasyonu yap
  - Temel klasör yapısını oluştur (components, contexts, services, types, utils)
  - React Router konfigürasyonu yap
  - _Gereksinimler: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1_

- [x] 2. Veri modellerini ve tip tanımlarını oluştur


  - TypeScript interface'lerini tanımla (Cari, Product, OrderItem, Order, Sale)
  - Enum ve constant değerleri tanımla (ErrorType, OrderStatus)
  - Validation type'larını oluştur
  - _Gereksinimler: 1.1, 1.2, 2.1, 2.2, 3.1, 5.1, 7.1_

- [-] 3. Storage ve utility servislerini implement et

  - [x] 3.1 StorageService oluştur (LocalStorage CRUD operasyonları)


    - save, load, remove, clear metodlarını implement et
    - Generic tip desteği ekle
    - _Gereksinimler: 5.2, 5.3, 6.4_
  

  - [x] 3.2 CalculationService oluştur

    - calculateItemTotal fonksiyonunu yaz
    - calculateOrderTotals fonksiyonunu yaz
    - formatCurrency fonksiyonunu yaz
    - _Gereksinimler: 2.5, 3.1, 3.2, 3.4_
  
  - [x] 3.3 ValidationService oluştur


    - validateCari fonksiyonunu yaz
    - validateProduct fonksiyonunu yaz
    - validateOrder fonksiyonunu yaz
    - _Gereksinimler: 5.5_
  
  - [ ] 3.4 Servis fonksiyonları için unit testler yaz
    - CalculationService testleri
    - ValidationService testleri
    - _Gereksinimler: 2.5, 3.1, 3.2, 5.5_

- [x] 4. Context provider'ları oluştur


  - [x] 4.1 CariContext ve provider implement et


    - State yönetimi (cariList)
    - addCari, updateCari, deleteCari, getCariById fonksiyonları
    - LocalStorage entegrasyonu
    - _Gereksinimler: 1.1, 1.2_
  
  - [x] 4.2 ProductContext ve provider implement et


    - State yönetimi (products)
    - addProduct, updateProduct, deleteProduct fonksiyonları
    - searchProducts fonksiyonunu implement et
    - LocalStorage entegrasyonu
    - _Gereksinimler: 2.1, 2.2, 2.4_
  
  - [x] 4.3 OrderContext ve provider implement et


    - State yönetimi (currentOrder, orders)
    - createOrder, updateOrder, deleteOrder fonksiyonları
    - Sipariş numarası otomatik oluşturma
    - LocalStorage entegrasyonu
    - _Gereksinimler: 5.1, 5.2, 5.3, 6.1, 6.4_
  
  - [x] 4.4 SalesContext ve provider implement et


    - State yönetimi (sales)
    - convertToSale fonksiyonunu implement et
    - getSaleById, getSalesByDateRange fonksiyonları
    - Satış numarası otomatik oluşturma
    - LocalStorage entegrasyonu
    - _Gereksinimler: 7.1, 7.2, 7.3, 7.4, 7.5_



- [x] 5. PDF servisini implement et

  - [x] 5.1 PDFService oluştur ve jsPDF entegrasyonu yap

    - jsPDF ve jspdf-autotable kütüphanelerini kur
    - generateOrderPDF fonksiyonunu yaz
    - PDF formatını tasarla (header, tablo, footer)
    - Türkçe karakter desteği ekle
    - _Gereksinimler: 4.1, 4.2, 4.3, 4.4_

- [x] 6. Temel UI bileşenlerini oluştur


  - [x] 6.1 Layout bileşenlerini oluştur


    - Header component (logo, navigasyon)
    - MainLayout component
    - Navigation menu component
    - _Gereksinimler: Tüm gereksinimler için temel UI_
  
  - [x] 6.2 Form bileşenlerini oluştur


    - Input component (text, number)
    - Select/Dropdown component
    - Button component
    - SearchInput component
    - _Gereksinimler: 1.1, 2.1, 2.3_
  
  - [x] 6.3 Tablo bileşenlerini oluştur


    - Table component (generic)
    - TableRow component
    - TableCell component
    - _Gereksinimler: 2.1, 6.1_



- [x] 7. Cari yönetimi sayfasını implement et

  - [x] 7.1 CariManagementPage component oluştur

    - Cari listesi tablosu
    - Cari ekleme formu
    - Cari düzenleme formu
    - Cari silme fonksiyonu
    - CariContext entegrasyonu
    - _Gereksinimler: 1.1_

- [x] 8. Ürün yönetimi sayfasını implement et



  - [x] 8.1 ProductManagementPage component oluştur

    - Ürün listesi tablosu
    - Ürün ekleme formu
    - Ürün düzenleme formu
    - Ürün silme fonksiyonu
    - ProductContext entegrasyonu
    - _Gereksinimler: 2.1, 2.4_

- [x] 9. Sipariş oluşturma sayfasını implement et



  - [x] 9.1 CariSelector component oluştur

    - Cari dropdown listesi
    - Cari arama özelliği
    - Seçilen cariyi gösterme
    - _Gereksinimler: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 9.2 ProductSearch component oluştur


    - Ürün arama input'u
    - Debounce ile arama
    - Arama sonuçları dropdown
    - Ürün seçme ve ekleme
    - _Gereksinimler: 2.1, 2.2_
  
  - [x] 9.3 OrderItemsList component oluştur


    - Seçilen ürünler tablosu
    - Miktar input'u ve güncelleme
    - Satır toplamı hesaplama
    - Ürün silme butonu
    - _Gereksinimler: 2.2, 2.3, 2.4, 2.5_
  

  - [x] 9.4 OrderSummary component oluştur


    - Ara toplam gösterimi
    - KDV hesaplama ve gösterimi
    - Genel toplam gösterimi
    - Otomatik güncelleme
    - _Gereksinimler: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 9.5 OrderCreatePage component oluştur ve tüm alt bileşenleri entegre et


    - Tüm alt bileşenleri bir araya getir
    - Kaydet butonu ve fonksiyonu
    - PDF oluştur butonu ve fonksiyonu
    - Temizle butonu
    - Form validasyonu
    - OrderContext entegrasyonu
    - PDFService entegrasyonu
    - _Gereksinimler: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 10. Sipariş listesi sayfasını implement et



  - [x] 10.1 OrderTable component oluştur

    - Sipariş listesi tablosu
    - Sipariş detaylarını gösterme
    - Sıralama ve filtreleme
    - _Gereksinimler: 6.1_
  
  - [x] 10.2 OrderActions component oluştur


    - Sil butonu ve onay modalı
    - Satışa dönüştür butonu
    - PDF oluştur butonu
    - _Gereksinimler: 6.2, 6.3, 6.4, 7.1_
  



  - [ ] 10.3 OrderListPage component oluştur
    - OrderTable ve OrderActions entegrasyonu
    - OrderContext entegrasyonu
    - Silme fonksiyonu
    - Satışa dönüştürme fonksiyonu
    - _Gereksinimler: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5_



- [ ] 11. Satış listesi sayfasını implement et
  - [x] 11.1 SalesListPage component oluştur


    - Satış listesi tablosu
    - Satış detaylarını gösterme
    - Tarih filtreleme
    - Toplam satış özeti
    - SalesContext entegrasyonu
    - _Gereksinimler: 7.2, 7.3, 7.4, 7.5_

- [x] 12. Ana sayfa ve routing'i tamamla



  - [x] 12.1 HomePage component oluştur

    - Özet istatistikler (toplam sipariş, satış, vb.)
    - Hızlı erişim butonları
    - Son siparişler listesi
    - _Gereksinimler: Genel sistem kullanımı_
  
  - [x] 12.2 App routing'ini tamamla


    - Tüm sayfalar için route tanımla
    - 404 sayfası ekle
    - Navigation entegrasyonu
    - _Gereksinimler: Tüm gereksinimler_




- [ ] 13. Hata yönetimi ve kullanıcı bildirimleri ekle
  - [x] 13.1 Error boundary component oluştur

    - Global hata yakalama
    - Kullanıcı dostu hata mesajları
    - _Gereksinimler: Tüm gereksinimler_
  

  - [x] 13.2 Toast notification sistemi ekle


    - Başarı mesajları
    - Hata mesajları
    - Uyarı mesajları
    - _Gereksinimler: 5.2, 6.4, 7.2_

- [ ] 14. UI/UX iyileştirmeleri ve responsive tasarım





  - [x] 14.1 Responsive tasarım optimizasyonları

    - Mobile görünüm düzenlemeleri
    - Tablet görünüm düzenlemeleri
    - Desktop görünüm optimizasyonları
    - _Gereksinimler: Tüm gereksinimler_
  

  - [x] 14.2 Loading state'leri ve skeleton ekranlar

    - Loading spinner'lar
    - Skeleton loader'lar
    - Progress indicator'lar
    - _Gereksinimler: Tüm gereksinimler_
  
  - [x] 14.3 Kullanıcı deneyimi iyileştirmeleri

    - Keyboard navigation desteği
    - Focus management
    - Accessibility iyileştirmeleri
    - _Gereksinimler: Tüm gereksinimler_

- [ ] 15. Test coverage'ı tamamla
  - Component testleri yaz
  - Integration testleri yaz
  - E2E test senaryoları oluştur
  - _Gereksinimler: Tüm gereksinimler_
