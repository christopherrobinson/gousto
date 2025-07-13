export interface RecipeCardProps {
  cuisine: string;
  id: string;
  image: string;
  nutritional_information: {
    per_portion: {
      energy_kcal: number;
    };
  };
  prep_time_minutes: {
    '2': string;
  };
  rating: {
    average: number;
    total: number;
  };
  title: string;
}
