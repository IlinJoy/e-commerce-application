export const FILTER_KEYS = ['price', 'color', 'brand', 'width', 'height', 'depth'] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

export type FilterAttribute = {
  terms?: Array<{ term: string; count: number }>;
  max?: number;
  key: FilterKey;
  label: string;
};
