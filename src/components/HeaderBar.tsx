import { FaFileExport, FaFileImport } from 'react-icons/fa';

export default function HeaderBar({
  onExport,
  onImportClick,
}: {
  onExport: () => void;
  onImportClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm h-20 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between">
        {/* Centered Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center w-full absolute left-0 right-0 mx-auto pointer-events-none">
          API Tester
        </h1>

        {/* Action Buttons (right aligned) */}
        <div className="flex space-x-3 ml-auto">
          <button
            onClick={onExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2"
          >
            <FaFileExport />
            Export
          </button>
          <button
            onClick={onImportClick}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2"
          >
            <FaFileImport />
            Import
          </button>
        </div>
      </div>
    </header>
  );
}
