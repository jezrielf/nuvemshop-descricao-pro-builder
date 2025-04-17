export interface SEOCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  category: string;
  suggestion?: string;
}
