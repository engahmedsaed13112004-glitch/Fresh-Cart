export interface IProducts {
  _id: string;
  id?: string;
  title: string;
  slug?: string;
  description: string;
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number; 
  imageCover: string;
  images?: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  ratingsQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: IProducts[];
}