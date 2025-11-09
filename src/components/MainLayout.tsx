import type { ReactNode } from 'react';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              Developer: 
              <a 
                href="https://x.com/suatayaz_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold ml-1 transition"
              >
                @Suat AYAZ
              </a>
            </p>
            <p className="text-gray-500 text-sm">
              <a 
                href="https://kamsis.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-blue-600 transition"
              >
                Kamsis Software
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
