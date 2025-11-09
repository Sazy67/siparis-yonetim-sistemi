# Windows Server 2012 Deployment Talimatları

## 📋 Gereksinimler

1. **Windows Server 2012** (veya üzeri)
2. **IIS (Internet Information Services)** yüklü olmalı
3. **URL Rewrite Module** yüklü olmalı

## 🔧 IIS Kurulumu

### 1. IIS'i Etkinleştirin

```powershell
# PowerShell'i Administrator olarak çalıştırın
Install-WindowsFeature -name Web-Server -IncludeManagementTools
```

### 2. URL Rewrite Module Yükleyin

- [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite) indirin ve yükleyin
- Veya Web Platform Installer kullanın

## 📦 Deployment Adımları

### 1. Build Dosyalarını Kopyalayın

`dist` klasöründeki tüm dosyaları sunucuya kopyalayın:

```
C:\inetpub\wwwroot\siparis-yonetim\
```

### 2. IIS'de Yeni Site Oluşturun

1. **IIS Manager**'ı açın
2. **Sites** > **Add Website** tıklayın
3. Ayarları yapın:
   - **Site name**: Sipariş Yönetim Sistemi
   - **Physical path**: `C:\inetpub\wwwroot\siparis-yonetim`
   - **Port**: 80 (veya istediğiniz port)
   - **Host name**: (boş bırakabilirsiniz)

4. **OK** tıklayın

### 3. Application Pool Ayarları

1. **Application Pools** > Sitenizin pool'unu seçin
2. **Basic Settings** > **.NET CLR Version**: **No Managed Code** seçin
3. **OK** tıklayın

### 4. Firewall Ayarları

```powershell
# Port 80'i açın
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
```

## 🌐 Erişim

Tarayıcıdan şu adreslere gidin:

- **Yerel**: `http://localhost`
- **Ağdan**: `http://[SERVER-IP]`
- **Domain**: `http://yourdomain.com` (DNS ayarı yapıldıysa)

## 🔒 HTTPS Kurulumu (Opsiyonel)

### SSL Sertifikası Ekleyin

1. IIS Manager > Siteniz > **Bindings**
2. **Add** > **Type**: https
3. **SSL certificate** seçin
4. **OK**

## 📝 Notlar

- **LocalStorage** kullanıldığı için veriler tarayıcıda saklanır
- Her kullanıcının kendi verileri olacak
- Merkezi veritabanı için backend geliştirmesi gerekir

## 🆘 Sorun Giderme

### Site Açılmıyor?

1. IIS'in çalıştığını kontrol edin:
   ```powershell
   Get-Service W3SVC
   ```

2. Firewall'u kontrol edin
3. Application Pool'un çalıştığını kontrol edin

### React Router Çalışmıyor?

- URL Rewrite Module yüklü mü kontrol edin
- web.config dosyası dist klasöründe mi kontrol edin

### Dosyalar Görünmüyor?

- IIS_IUSRS kullanıcısına klasör izni verin:
  ```powershell
  icacls "C:\inetpub\wwwroot\siparis-yonetim" /grant "IIS_IUSRS:(OI)(CI)F" /T
  ```

## 📞 Destek

Developer: [@Suat AYAZ](https://x.com/suatayaz_)
Company: [Kamsis Software](https://kamsis.com)
