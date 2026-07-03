import { useCallback, useState } from 'react';

interface PortixPrintOptions {
  baseUrl: string;
  apiKey: string;
}

type PrintStatus = 'idle' | 'printing' | 'success' | 'error';

/**
 * Minimal PortixOne integration via fetch — no SDK install required.
 * Mirrors what @portixone/sdk-js does under the hood.
 */
export function usePortixPrint({ baseUrl, apiKey }: PortixPrintOptions) {
  const [status, setStatus] = useState<PrintStatus>('idle');
  const [message, setMessage] = useState('');

  const print = useCallback(
    async (content: string) => {
      setStatus('printing');
      try {
        const response = await fetch(`${baseUrl}/print`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-portix-api-key': apiKey,
          },
          body: JSON.stringify({ content }),
        });
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.message ?? `Print failed (${response.status})`);
        }
        setStatus('success');
        setMessage(`Job ${body.jobId} queued`);
      } catch (error) {
        setStatus('error');
        setMessage((error as Error).message);
      }
    },
    [baseUrl, apiKey],
  );

  return { print, status, message };
}
