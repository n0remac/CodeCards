import React, { useEffect, useState } from 'react';
import { blogService } from '../../service'; // Adjust this path to where your service is defined
import { Post, Posts, GetPostsRequest } from '../../rpc/proto/blog/blog_pb'; // Adjust these imports based on your actual file structure
import { useNavigate } from 'react-router-dom';

export const AllPosts = () => {
  const [posts, setPosts] = useState<Posts>();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRequest = new GetPostsRequest(); // Adjust based on your actual request class, if needed

      try {
        const response = await blogService.getPosts(postsRequest);
        if (response.posts) {
          console.log('Fetched blog posts:', response.posts);
          setPosts(response.posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center my-8">
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      
      {posts && posts.posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export const formatContent = (content: string) => {
  return content
    .split('\n') // Split by newline to process line breaks
    .map((line, index) => (
      <React.Fragment key={index}>
        {
          // Use regular expression to find consecutive spaces and replace them with non-breaking spaces
          line.split(/(\s+)/).map((segment, segIndex) => (
            <React.Fragment key={segIndex}>
              {segment.length > 1 && /\s/.test(segment) ? segment.replace(/ /g, '\u00A0') : segment}
            </React.Fragment>
          ))
        }
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
};

interface PostComponentProps {
  post: Post;
}

export const PostComponent: React.FC<PostComponentProps> = ({ post }) => {

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post.id}`); // Assuming post.id is sufficient to uniquely identify the post
  };

  return (
    <div 
      className="bg-gray-800 text-white rounded-lg p-6 m-4 w-full max-w-3xl cursor-pointer"
      onClick={handlePostClick}
    >
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-base mb-4">{formatContent(post.content.slice(0, 100))}...</p>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap">
          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{tag.name}</span>
          ))}
        </div>
        <div className="text-sm">{post.author}</div>
      </div>
    </div>
  );
};

