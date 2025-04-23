export interface IngredientsProps {
  basics: string[];
  ingredients: {
    allergens: string[];
    label: string;
    image: string;
  }[];
}
