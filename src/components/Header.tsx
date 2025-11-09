import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [firmaAdi, setFirmaAdi] = useState<string>('Sipariş Yönetim');

  useEffect(() => {
    // LocalStorage'dan logo ve firma adını al
    const pdfSettings = localStorage.getItem('pdfSettings');
    if (pdfSettings) {
      const firmaInfo = JSON.parse(pdfSettings);
      setLogoUrl(firmaInfo.logoUrl || null);
      setFirmaAdi(firmaInfo.firmaAdi || 'Sipariş Yönetim');
    }

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      const pdfSettings = localStorage.getItem('pdfSettings');
      if (pdfSettings) {
        const firmaInfo = JSON.parse(pdfSettings);
        setLogoUrl(firmaInfo.logoUrl || null);
        setFirmaAdi(firmaInfo.firmaAdi || 'Sipariş Yönetim');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-100 transition">
            {logoUrl ? (
              <>
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-10 w-auto object-contain bg-white rounded px-1"
                />
                <span className="hidden sm:inline">{firmaAdi}</span>
              </>
            ) : (
              <>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">{firmaAdi}</span>
              </>
            )}
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-blue-700 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <nav className="hidden lg:flex gap-6">
            <Link to="/" className="hover:text-blue-200 transition font-medium">
              Ana Sayfa
            </Link>
            <Link to="/siparis-olustur" className="hover:text-blue-200 transition font-medium">
              Yeni Sipariş
            </Link>
            <Link to="/siparisler" className="hover:text-blue-200 transition font-medium">
              Siparişler
            </Link>
            <Link to="/satislar" className="hover:text-blue-200 transition font-medium">
              Satışlar
            </Link>
            <Link to="/cariler" className="hover:text-blue-200 transition font-medium">
              Cariler
            </Link>
            <Link to="/urunler" className="hover:text-blue-200 transition font-medium">
              Ürünler
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-blue-500 pt-4">
            <Link 
              to="/" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/siparis-olustur" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Yeni Sipariş
            </Link>
            <Link 
              to="/siparisler" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Siparişler
            </Link>
            <Link 
              to="/satislar" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Satışlar
            </Link>
            <Link 
              to="/cariler" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cariler
            </Link>
            <Link 
              to="/urunler" 
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Ürünler
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
