import { Post } from './post';

export interface Tag {
  id: string;
  name: string;
  url: string;
}

export interface CollectionTag extends Tag {
  first_post: Post;
}
