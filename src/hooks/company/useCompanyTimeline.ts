import { useState, useEffect } from 'react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  desc: string;
  imageUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useCompanyTimeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/company/timeline');
        if (res.ok) {
          const data = await res.json();
          setTimeline(data);
        } else {
          setError(new Error('Failed to fetch timeline'));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return { timeline, loading, error };
}
