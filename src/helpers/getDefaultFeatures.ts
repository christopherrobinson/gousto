import type { FeaturesProps } from '@/types/Features.ts';

const defaultFeatures: FeaturesProps = {
  featuredProducts: envBoolean(import.meta.env.FEATURE_FEATURED_PRODUCTS, false),
};

export const getDefaultFeatures = (): FeaturesProps => ({ ...defaultFeatures });
