export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  platforms: string;
  genre: string;
  developer: string;
  publisher: string;
  features: [
    {
      id: number;
      features: string;
    }
  ];
  images: [
    {
      url: string;
      alternativeText: string;
    }
  ];
  video: string;
  link: {
    steam: string;
    epicGames: string;
    website: string;
    youtube: string;
  };
  tag: string;
  releaseDate: string;
}
