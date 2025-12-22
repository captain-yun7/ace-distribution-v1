import { useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/company/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        } else {
          setError(new Error('Failed to fetch clients'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
}
