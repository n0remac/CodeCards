import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../../service';
// Ensure the import path matches where your generated code lives
import { GetPostRequest, Post, DeletePostRequest } from '../../rpc/proto/blog/blog_pb';
import { formatContent } from './PostComponent';

export const FullPostComponent = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const isLoggedIn = Boolean(localStorage.getItem('userToken'));
  const [deleteConfirm, setDeleteConfirm] = useState(''); // State to track the input value

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

  const handleDelete = async () => {
    if (!postId) return;

    // Implement custom confirmation logic
    const confirmDelete = () => {
      return new Promise(resolve => {
        const userInput = prompt("Type 'DELETE' to confirm deletion:", "");
        resolve(userInput === "DELETE");
      });
    };

    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
      try {
        const request = new DeletePostRequest();
        request.id = parseInt(postId, 10);
        await blogService.deletePost(request);
        alert('Post deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting the post:', error);
        alert('Failed to delete post.');
      }
    }
  };


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
        {isLoggedIn && (
                <button 
                    onClick={handleDelete} 
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete Post
                </button>
            )}
    </div>
  );
};
