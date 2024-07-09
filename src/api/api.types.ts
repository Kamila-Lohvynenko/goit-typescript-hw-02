export interface IImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    [key: string]: string;
  };
  likes: number;
  user: {
    name: string;
    profile_image: {
      [key: string]: string;
    };
    [key: string]: any;
  };
}
export interface IResponse {
  total: number;
  total_pages: number;
  results: IImage[];
}
