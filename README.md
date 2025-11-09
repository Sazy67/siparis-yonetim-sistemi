# Sipariş Yönetim Sistemi

Bu proje, küçük ve orta ölçekli işletmeler için tasarlanmış kapsamlı bir sipariş yönetim sistemidir. Müşteri takibi, ürün yönetimi, sipariş oluşturma ve satış raporlama gibi temel işlevleri içerir.

## Özellikler

- **Müşteri (Cari) Yönetimi**: Müşteri bilgilerini ekleyin, düzenleyin ve görüntüleyin
- **Ürün Yönetimi**: Ürün kataloğunuzu oluşturun ve yönetin
- **Sipariş Oluşturma**: Yeni siparişler oluşturun ve yönetin
- **Satış Takibi**: Siparişlerinizi satışlara dönüştürün ve takip edin
- **PDF Raporlama**: Siparişlerinizi profesyonel PDF formatında dışa aktarın
- **Responsive Tasarım**: Tüm cihaz boyutlarında sorunsuz çalışır

## Teknolojiler

- **React 19** - Modern kullanıcı arayüzü kütüphanesi
- **TypeScript** - Güçlü tip kontrolü
- **Vite** - Hızlı geliştirme sunucusu ve derleme aracı
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Uygulama yönlendirmesi
- **LocalStorage** - Tarayıcı tabanlı veri depolama
- **jsPDF** - PDF oluşturma

## Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Yükleme Adımları

1. Repoyu klonlayın:
```bash
git clone <repo-url>
cd siparis-yonetim-sistemi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:5173` adresine gidin

## Kullanım

Uygulama başlatıldığında aşağıdaki menü seçeneklerine erişebilirsiniz:

- **Ana Sayfa**: Genel istatistikler ve son siparişler
- **Yeni Sipariş**: Yeni sipariş oluştur
- **Siparişler**: Mevcut siparişleri listele ve yönet
- **Satışlar**: Siparişleri satışlara dönüştür
- **Cariler**: Müşteri bilgilerini yönet
- **Ürünler**: Ürün kataloğunu yönet
- **PDF Ayarları**: PDF çıktısı için firma bilgilerini yapılandır

## Geliştirme

### Mevcut Komutlar

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Projeyi derle
npm run build

# Kod kalitesini kontrol et
npm run lint

# Derlenmiş uygulamayı önizle
npm run preview
```

### Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── contexts/       # React Context API ile state yönetimi
├── pages/          # Sayfa bileşenleri
├── services/       # İş mantığı ve yardımcı servisler
├── types/          # TypeScript tip tanımlamaları
└── assets/         # Statik dosyalar
```

## Dağıtım

Uygulama Vercel üzerinde barındırılmak üzere yapılandırılmıştır. Deploy işlemi için:

```bash
npm run build
# Oluşan dist/ klasörünü deploy edin
```

## Katkıda Bulunma

1. Bu repoyu fork'layın
2. Yeni bir özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit'leyin (`git commit -am 'Yeni özellik ekle'`)
4. Dalınızı push'layın (`git push origin yeni-ozellik`)
5. Yeni bir Pull Request oluşturun

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim
https://x.com/suatayaz_
Proje ile ilgili sorularınız için issue oluşturabilirsiniz.