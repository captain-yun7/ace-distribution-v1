import { useState, useEffect } from 'react';

interface Donation {
  id: string;
  year: string;
  amount: string;
  desc: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/company/donations');
        if (res.ok) {
          const data = await res.json();
          setDonations(data);
        } else {
          setError(new Error('Failed to fetch donations'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return { donations, loading, error };
}
