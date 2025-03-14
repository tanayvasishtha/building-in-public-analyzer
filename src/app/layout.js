import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Building in Public Analyzer',
  description: 'Analyze your Building in Public style on X (Twitter)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Building in Public Analyzer
            </Link>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-white py-6 mt-12 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Building in Public Analyzer</p>
            <p className="mt-2">
              Built with <span className="text-red-500">❤️</span> by a builder in public
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
