export interface RecipeCardProps {
  cuisine: string;
  id: string;
  image: string;
  nutritional_information: {
    per_portion: {
      energy_kcal: number;
    };
  };
  prep_times: {
    for_2: number;
  };
  rating: {
    average: number;
    total: number;
  };
  title: string;
}
