import { useState } from 'react';
import { usePortixPrint } from './usePortixPrint';

export default function App() {
  const [apiKey, setApiKey] = useState('dev-local-key');
  const { print, status, message } = usePortixPrint({
    baseUrl: 'http://127.0.0.1:17321',
    apiKey,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 480, margin: '40px auto' }}>
      <h1>PortixOne — React print button</h1>
      <p>Requires the PortixOne runtime running locally (see the portixone repo).</p>

      <label>
        API key
        <br />
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </label>
      <br />
      <br />

      <button disabled={status === 'printing'} onClick={() => print('Test ticket from React')}>
        {status === 'printing' ? 'Printing…' : 'Print test ticket'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
