import { Metadata } from 'next';
import PageClient from '@/components/PageClient';

export const metadata: Metadata = {
  title: 'Cloud Softphone | Atingi',
  description: 'Descubra o formato ideal para sua operação e lance seu software de metas em 24h.',
};

export default function V4Page() {
  return <PageClient />;
}
