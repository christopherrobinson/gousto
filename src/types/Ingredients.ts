export interface IngredientsProps {
  basics: string[];
  ingredients: {
    allergens: string[];
    label: string;
    image: string;
  }[];
  portion_sizes?: {
    [portions: string]: {
      is_offered: boolean;
    };
  };
}
