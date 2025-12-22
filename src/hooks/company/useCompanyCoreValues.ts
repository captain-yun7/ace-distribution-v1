import { useState, useEffect } from 'react';

interface CoreValue {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyCoreValues() {
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoreValues = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/company/core-values');
        if (res.ok) {
          const data = await res.json();
          setCoreValues(data);
        } else {
          setError(new Error('Failed to fetch core values'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoreValues();
  }, []);

  return { coreValues, loading, error };
}
