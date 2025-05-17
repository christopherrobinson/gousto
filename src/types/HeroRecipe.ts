export interface HeroRecipeProps {
  id: string;
  image: string;
  rating: {
    average: number;
    total: number;
  };
  title: string;
}
