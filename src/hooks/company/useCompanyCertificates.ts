import { useState, useEffect } from 'react';

interface Certificate {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/company/certificates');
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        } else {
          setError(new Error('Failed to fetch certificates'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return { certificates, loading, error };
}
