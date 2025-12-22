import { useState, useEffect } from 'react';

interface CompanyContent {
  id: string;
  key: string;
  title: string | null;
  content: string;
  data: any;
  updatedAt: Date;
}

export function useCompanyContent(key: string) {
  const [content, setContent] = useState<CompanyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/company/content?key=${key}`);
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        } else {
          setError(new Error('Failed to fetch content'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchContent();
    }
  }, [key]);

  return { content, loading, error };
}
