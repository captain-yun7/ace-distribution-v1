import { redirect } from 'next/navigation';

export default function NewsPage() {
  redirect('/culture/story?category=PRESS');
}
