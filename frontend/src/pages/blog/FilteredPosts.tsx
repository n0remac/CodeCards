import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { blogService } from '../../service';
import { Posts, GetPostsRequest } from '../../rpc/proto/blog/blog_pb';
import { PostComponent } from './PostComponent'; // Assuming this component exists

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const FilteredPosts = () => {
  const [posts, setPosts] = useState<Posts>();
  const query = useQuery();
  const tags = query.getAll('tag');

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const postsRequest = new GetPostsRequest();
      postsRequest.tags = tags;

      try {
        const response = await blogService.getPosts(postsRequest);
        if (response.posts) {
          setPosts(response.posts);
        }
      } catch (error) {
        console.error('Error fetching filtered blog posts:', error);
      }
    };

    fetchFilteredPosts();
  }, [tags]);

  return (
    <div className="flex flex-col items-center my-8">
      <h1 className="text-3xl font-bold mb-8">Filtered Blog Posts</h1>
      {posts && posts.posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};
