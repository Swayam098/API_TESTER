import { useState, useEffect } from 'react';
import { sendApiRequest } from '../utils/apiClient';
import ResponseViewer from './ResponseViewer';
import type { APIResponse } from '../types';

interface RequestFormProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  setAppLoading: (loading: boolean) => void;
}

export default function RequestForm({ fileInputRef, setAppLoading }: RequestFormProps) {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setResponse(null);
    setAppLoading(true);

    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    let parsedHeaders: Record<string, string> = {};
    try {
      parsedHeaders = headers ? JSON.parse(headers) : {};
    } catch {
      setErrorMessage('❌ Headers must be valid JSON');
      setAppLoading(false);
      return;
    }

    let parsedBody: unknown = {};
    if (['POST', 'PUT'].includes(method)) {
      try {
        parsedBody = body ? JSON.parse(body) : {};
      } catch {
        setErrorMessage('❌ Body must be valid JSON');
        setAppLoading(false);
        return;
      }
    }

    const result = await sendApiRequest(method, finalUrl, parsedHeaders, parsedBody);
    setResponse(result);
    setAppLoading(false);
  };

  const handleExport = () => {
    const request = { method, url, headers, body };
    const blob = new Blob([JSON.stringify(request, null, 2)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'api-request.json';
    downloadLink.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setMethod(json.method || 'GET');
        setUrl(json.url || '');
        setHeaders(JSON.stringify(json.headers || {}, null, 2));
        setBody(json.body || '');
      } catch {
        alert('❌ Invalid JSON format in file');
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const onExport = () => handleExport();
    window.addEventListener('trigger-export', onExport);
    return () => window.removeEventListener('trigger-export', onExport);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6 border">
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
      />

      {/* Method & URL */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="method" className="block text-sm font-medium mb-1">
            Method
          </label>
          <select
            id="method"
            title="HTTP Method"
            value={method}
            onChange={(e) => setMethod(e.target.value as typeof method)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            title="Request URL"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Body (POST/PUT) */}
      {['POST', 'PUT'].includes(method) && (
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Body (JSON)
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{ "key": "value" }'
            title="Request Body"
            className="w-full border p-2 rounded font-mono text-sm"
            rows={6}
          />
        </div>
      )}

      {/* Headers */}
      <div className="mb-4">
        <label htmlFor="headers" className="block text-sm font-medium mb-1">
          Headers (JSON)
        </label>
        <textarea
          id="headers"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder='{ "Authorization": "Bearer token" }'
          title="Request Headers"
          className="w-full border p-2 rounded font-mono text-sm"
          rows={4}
        />
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-red-600 mb-4 font-semibold">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-center transition-all"
      >
        🚀 Send Request
      </button>

      {/* Response */}
      {response && (
        <div className="mt-8">
          <ResponseViewer response={response} />
        </div>
      )}
    </div>
  );
}
