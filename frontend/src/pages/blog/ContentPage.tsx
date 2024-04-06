import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../../service';
// Ensure the import path matches where your generated code lives
import { GetPostRequest, Post } from '../../rpc/proto/blog/blog_pb';
import { formatContent } from './Blog';

export const FullPostComponent = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        // Convert postId to a number, as gRPC expects an int32
        const id = parseInt(postId, 10);
        if (isNaN(id)) {
          console.error('Invalid post ID');
          navigate('/'); // Redirect or handle invalid ID error as appropriate
          return;
        }

        const request = new GetPostRequest();
        request.id = id;

        // Assuming blogService.getPost returns a promise of GetPostResponse
        const response = await blogService.getPost(request);
        if (response && response.post) {
          setPost(response.post);
        } else {
          console.log('Post not found');
          navigate('/'); // Redirect or handle not found as appropriate
        }
      } catch (error) {
        console.error('Error fetching the post:', error);
        // Handle error (e.g., show a message or redirect)
      }
    };

    fetchPost();
  }, [postId, navigate]);

  if (!post) return <div>Loading...</div>;


  return (
    <div className="flex flex-col items-center my-8">
        <div className="bg-gray-800 text-white rounded-lg p-6 m-4 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-base mb-4">{formatContent(post.content)}</p>
            <div className="flex justify-between items-end">
                <div className="flex flex-wrap">
                {post.tags.map((tag, index) => ( // Adjust based on generated field name for the list of tags
                    <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{tag.name}</span>
                ))}
                </div>
                <div className="text-sm">{post.author}</div>
            </div>
        </div>
    </div>
  );
};
