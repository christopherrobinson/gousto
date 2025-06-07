export interface DefaultLayoutProps {
  heading?: string;
  meta?: {
    description?: string;
    og?: {
      'image'?: string;
      'image:alt'?: string;
      'image:height'?: number;
      'image:width'?: number;
    };
    title?: string;
    twitter?: {
      'card'?: string;
    };
  };
}
