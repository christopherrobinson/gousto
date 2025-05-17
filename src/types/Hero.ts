export interface HeroProps {
  featuredRecipes: {
    id: string;
    data: {
      image: string;
      rating: {
        average: number;
        total: number;
      };
      title: string;
    };
  }[];
  recipeCount: number;
}
