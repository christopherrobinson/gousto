export interface IngredientsProps {
  basics: string[];
  ingredients: {
    allergens: string[];
    label: string;
    image: string;
  }[];
  portion_sizes?: {
    is_offered: boolean;
    portions: number;
  }[],
}
