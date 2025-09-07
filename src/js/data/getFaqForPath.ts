import { faqBundles } from '@/js/data/faqData.ts';
import type { FaqItem } from '@/js/types/faqTypes.ts';

export function getFaqForPath(pathname: string): FaqItem[] {
  const bundle = faqBundles.find((b) => b.routes.some((r) => r.test(pathname)));
  return bundle?.items ?? [];
}

