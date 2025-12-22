import { useState, useEffect } from 'react';

type CultureType = 'CULTURE' | 'BENEFIT' | 'CSR';

interface CultureItem {
  id: string;
  type: CultureType;
  title: string;
  desc: string;
  year: string | null;
  imageUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyCulture(type?: CultureType) {
  const [culture, setCulture] = useState<CultureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        setLoading(true);
        const url = type
          ? `/api/company/culture?type=${type}`
          : '/api/company/culture';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCulture(data);
        } else {
          setError(new Error('Failed to fetch culture'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCulture();
  }, [type]);

  return { culture, loading, error };
}
