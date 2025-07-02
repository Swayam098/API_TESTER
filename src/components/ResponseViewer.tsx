import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export default function ResponseViewer({ response }: { response: any }) {
  const [view, setView] = useState<'raw' | 'table' | 'cards'>('raw');

  const data = response?.data;
  const isArrayOfObjects = Array.isArray(data) && data.every((item) => typeof item === 'object');

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Response</h2>
        {isArrayOfObjects && (
          <select
            value={view}
            onChange={(e) => setView(e.target.value as 'raw' | 'table' | 'cards')}
            className="border px-2 py-1 text-sm"
          >
            <option value="raw">Raw JSON</option>
            <option value="table">Table</option>
            <option value="cards">Cards</option>
          </select>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-2">Status: {response?.status}</p>

      <div className="border p-4 bg-gray-100 rounded overflow-auto">
        {/* 🌐 Raw View */}
        {view === 'raw' && <JSONPretty data={data} />}

        {/* 🧾 Table View */}
        {view === 'table' && Array.isArray(data) && (
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(data[0]).slice(0, 5).map((key) => (
                  <th key={key} className="border px-2 py-1">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((item, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  {Object.values(item).slice(0, 5).map((val, i) => (
                    <td key={i} className="border px-2 py-1 truncate max-w-xs">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 🗂️ Cards View */}
        {view === 'cards' && Array.isArray(data) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.slice(0, 12).map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 shadow bg-white flex flex-col justify-between min-h-[180px]"
              >
                <h3 className="font-bold text-sm mb-2">Item {index + 1}</h3>
                <ul className="space-y-1 text-xs overflow-hidden">
                  {Object.entries(item)
                    .slice(0, 6)
                    .map(([key, val], i) => (
                      <li key={i}>
                        <span className="font-medium">{key}:</span>{' '}
                        <span className="break-all">{JSON.stringify(val)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
