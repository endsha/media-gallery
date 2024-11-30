import { Image } from './image';
import { Tag } from './tag';

export interface Post {
  id: string;
  name: string;
  thumbnail: string;
  images: Image[];
  hot: number;
  tags: Tag[];
}
