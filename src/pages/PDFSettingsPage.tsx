import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';

interface PDFSettings {
  firmaAdi: string;
  firmaAdres: string;
  firmaTelefon: string;
  firmaEmail: string;
  logoUrl?: string;
}

// Varsayılan ayarlar
const DEFAULT_PDF_SETTINGS: PDFSettings = {
  firmaAdi: 'Yusuf Altaş Metal Ltd Şti',
  firmaAdres: 'İstanbul, Türkiye',
  firmaTelefon: '0212 123 45 67',
  firmaEmail: 'info@yusufaltas.com',
  logoUrl: '/logo.png' // Public klasöründeki logo dosyası
};

const PDFSettingsPage = () => {
  const [settings, setSettings] = useState<PDFSettings>({
    firmaAdi: '',
    firmaAdres: '',
    firmaTelefon: '',
    firmaEmail: '',
    logoUrl: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('pdfSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      // Varsayılan ayarları yükle
      setSettings(DEFAULT_PDF_SETTINGS);
      localStorage.setItem('pdfSettings', JSON.stringify(DEFAULT_PDF_SETTINGS));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('pdfSettings', JSON.stringify(settings));
    alert('PDF ayarları kaydedildi!');
    // Sayfayı yenile ki header'daki logo güncellensin
    window.location.reload();
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PDF Ayarları</h1>
          <p className="text-gray-600">Sipariş PDF'lerinde görünecek firma bilgilerini düzenleyin</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Firma Bilgileri</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Firma Adı"
              value={settings.firmaAdi}
              onChange={(e) => setSettings({ ...settings, firmaAdi: e.target.value })}
              placeholder="Örn: ABC Malzeme Ltd. Şti."
            />

            <Input
              label="Adres"
              value={settings.firmaAdres}
              onChange={(e) => setSettings({ ...settings, firmaAdres: e.target.value })}
              placeholder="Firma adresi"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Telefon"
                value={settings.firmaTelefon}
                onChange={(e) => setSettings({ ...settings, firmaTelefon: e.target.value })}
                placeholder="0555 123 45 67"
              />

              <Input
                label="E-posta"
                type="email"
                value={settings.firmaEmail}
                onChange={(e) => setSettings({ ...settings, firmaEmail: e.target.value })}
                placeholder="info@firma.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Logo (Opsiyonel)
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSettings({ ...settings, logoUrl: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                Logo dosyanızı seçin (PNG veya JPG). Önerilen boyut: 200x150 piksel.
              </p>
              {settings.logoUrl && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-green-600 font-medium mb-2">✓ Logo yüklendi</p>
                  <img 
                    src={settings.logoUrl} 
                    alt="Logo önizleme" 
                    className="h-16 object-contain border border-gray-200 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button variant="success" onClick={handleSave} className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Kaydet
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Bilgi</h3>
              <p className="text-blue-800 text-sm">
                Bu bilgiler sipariş PDF'lerinin üst kısmında görünecektir. 
                Firma adı ve iletişim bilgilerinizi girerek profesyonel görünümlü PDF'ler oluşturabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PDFSettingsPage;
