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
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">© {new Date().getFullYear()} Building in Public Analyzer</p>
            <p className="mt-3 text-gray-600">
              Built with <span className="text-red-500">❤️</span> by <a href="https://x.com/TanayVasishtha" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@TanayVasishtha</a>
            </p>
            <div className="mt-4 flex justify-center items-center space-x-4">
              <a 
                href="https://github.com/tanayvasishtha/building-in-public-analyzer" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
              <a 
                href="https://x.com/TanayVasishtha" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                Follow on X
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
