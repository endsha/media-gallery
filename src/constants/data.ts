import { Post } from '@customTypes/post';

export const Posts: Post[] = [
  {
    id: 'post-1',
    name: 'Post 1',
    thumbnail:
      'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998608',
    images: [
      {
        id: 'image-1',
        post_id: 'post-1',
        url: 'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998774',
      },
      {
        id: 'image-2',
        post_id: 'post-1',
        url: 'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998991',
      },
    ],
  },
  {
    id: 'post-2',
    name: 'Post 2',
    thumbnail:
      'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998608',
    images: [
      {
        id: 'image-1',
        post_id: 'post-1',
        url: 'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998774',
      },
      //   {
      //     id: 'image-2',
      //     post_id: 'post-1',
      //     url: 'https://images.devroundwithus.com/shop/FeIB8YX3ljRcjIB7NxzKE/1721371998991',
      //   },
    ],
  },
];
