import { useRef, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import RequestForm from './components/RequestForm';

export default function App() {
  // ✅ Non-null assertion to satisfy TypeScript
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    window.dispatchEvent(new CustomEvent('trigger-export'));
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#e6eef5] min-h-screen">
      {/* 🧭 Sticky Header */}
      <HeaderBar onExport={handleExport} onImportClick={handleImportClick} />

      {/* 🧱 Top Padding (matches Header height to avoid overlap) */}
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* 📂 Sidebar */}
          <div className="hidden sm:block sm:w-64">
            <Sidebar />
          </div>

          {/* 🚀 Request/Response Section */}
          <div className="flex-1">
            <RequestForm fileInputRef={fileInputRef} setAppLoading={setLoading} />
          </div>
        </div>
      </div>

      {/* ⏳ Fullscreen Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-white h-16 w-16 animate-spin"></div>
        </div>
      )}
    </div>
  );
}
