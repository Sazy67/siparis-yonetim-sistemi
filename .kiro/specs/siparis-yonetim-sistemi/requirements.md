# Gereksinimler Dokümanı

## Giriş

Bu doküman, malzeme satan bir firma için sipariş yönetim sisteminin gereksinimlerini tanımlar. Sistem, kullanıcıların cari (müşteri) seçmesine, ürünleri hızlıca eklemesine, toplam tutarı görmesine, sipariş çıktısı/PDF oluşturmasına, siparişleri kaydetmesine, silmesine ve satışa dönüştürmesine olanak sağlar.

## Sözlük

- **Sistem**: Sipariş Yönetim Sistemi
- **Cari**: Müşteri veya tedarikçi hesabı
- **Ürün**: Satılabilir malzeme veya hizmet
- **Sipariş**: Bir cari için oluşturulan ürün listesi ve toplam tutar bilgisi
- **Satış**: Onaylanmış ve gerçekleşmiş sipariş kaydı
- **PDF Çıktısı**: Sipariş detaylarını içeren yazdırılabilir belge

## Gereksinimler

### Gereksinim 1

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, sipariş oluştururken cari seçebilmek istiyorum, böylece siparişin hangi müşteriye ait olduğunu belirleyebilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL cari listesini görüntüleme özelliği sağlar
2. WHEN kullanıcı cari seçer, THE Sistem SHALL seçilen cariyi sipariş formuna atar
3. THE Sistem SHALL her siparişte bir cari seçilmesini zorunlu kılar
4. THE Sistem SHALL cari bilgilerini (ad, kod, iletişim) sipariş ekranında gösterir

### Gereksinim 2

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, siparişe hızlıca ürün ekleyebilmek istiyorum, böylece sipariş oluşturma sürecini hızlandırabilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL ürün listesini arama ve filtreleme özelliği ile sunar
2. WHEN kullanıcı bir ürün seçer, THE Sistem SHALL ürünü sipariş listesine ekler
3. THE Sistem SHALL her ürün için miktar girişi yapılmasına izin verir
4. THE Sistem SHALL ürün birim fiyatını otomatik olarak getirir
5. WHEN kullanıcı miktar girer, THE Sistem SHALL satır toplamını hesaplar

### Gereksinim 3

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, sipariş toplam tutarını anlık olarak görebilmek istiyorum, böylece müşteriye hızlıca fiyat bilgisi verebilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL tüm sipariş kalemlerinin toplam tutarını hesaplar
2. WHEN sipariş kalemleri değişir, THE Sistem SHALL toplam tutarı otomatik günceller
3. THE Sistem SHALL toplam tutarı Türk Lirası (TL) cinsinden gösterir
4. THE Sistem SHALL ara toplam, KDV ve genel toplam bilgilerini ayrı ayrı gösterir

### Gereksinim 4

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, sipariş için PDF çıktısı alabilmek istiyorum, böylece müşteriye sipariş detaylarını sunabilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL sipariş detaylarını PDF formatında oluşturma özelliği sunar
2. THE Sistem SHALL PDF çıktısında cari bilgilerini, ürün listesini ve toplam tutarı içerir
3. WHEN kullanıcı PDF oluştur seçeneğini tıklar, THE Sistem SHALL PDF dosyasını indirilir hale getirir
4. THE Sistem SHALL PDF çıktısında tarih ve sipariş numarası bilgilerini gösterir

### Gereksinim 5

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, oluşturduğum siparişi kaydedebilmek istiyorum, böylece daha sonra siparişe erişebilir ve takip edebilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL sipariş kaydetme özelliği sunar
2. WHEN kullanıcı sipariş kaydeder, THE Sistem SHALL siparişe benzersiz bir numara atar
3. THE Sistem SHALL kaydedilen siparişi sipariş listesinde gösterir
4. THE Sistem SHALL sipariş kayıt tarih ve saat bilgisini saklar
5. THE Sistem SHALL eksik bilgi varsa (cari veya ürün yoksa) kaydetme işlemini engeller

### Gereksinim 6

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, kayıtlı siparişleri görüntüleyebilmek ve silebilmek istiyorum, böylece iptal edilen veya hatalı siparişleri yönetebilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL tüm kayıtlı siparişleri listeleme özelliği sunar
2. THE Sistem SHALL her sipariş için silme seçeneği gösterir
3. WHEN kullanıcı sipariş siler, THE Sistem SHALL onay mesajı gösterir
4. WHEN kullanıcı silme işlemini onaylar, THE Sistem SHALL siparişi sistemden kaldırır
5. THE Sistem SHALL silinen siparişin artık listede görünmemesini sağlar

### Gereksinim 7

**Kullanıcı Hikayesi:** Bir satış temsilcisi olarak, onaylanan siparişi satışa dönüştürebilmek istiyorum, böylece gerçekleşen satışları kayıt altına alabilirim.

#### Kabul Kriterleri

1. THE Sistem SHALL sipariş listesinde her sipariş için "Satışa Dönüştür" seçeneği sunar
2. WHEN kullanıcı siparişi satışa dönüştürür, THE Sistem SHALL sipariş bilgilerini satış kaydı olarak saklar
3. THE Sistem SHALL satışa dönüştürülen siparişi satış listesine ekler
4. THE Sistem SHALL satış kaydında sipariş numarası, cari, ürünler ve tutar bilgilerini korur
5. WHEN sipariş satışa dönüştürülür, THE Sistem SHALL satış tarih ve saat bilgisini kaydeder
