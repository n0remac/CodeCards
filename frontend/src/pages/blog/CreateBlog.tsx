import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../service';
import { Post, CreatePostRequest, GetTagsRequest, Tag } from '../../rpc/proto/blog/blog_pb'; 

export const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [allTags, setAllTags] = useState<Tag[]>([]); // State to store all tags
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]); // State to store selected tag IDs

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/');
    } else {
      fetchTags(); // Fetch all tags when the component mounts
    }
  }, [navigate]);

  const fetchTags = async () => {
    try {
      const request = new GetTagsRequest();
      const response = await blogService.getTags(request); 
      setAllTags(response.tags); 
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagClick = (tagId: number) => {
    setSelectedTagIds(prevState =>
      prevState.includes(tagId) ? prevState.filter(id => id !== tagId) : [...prevState, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = author;
    
    const request = new CreatePostRequest();
    request.post = post;
    request.tagIds = selectedTagIds;

    try {
      await blogService.createPost(request);
      alert('Post created successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      setSelectedTagIds([]); // Clear selected tags
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="title" 
              type="text" 
              placeholder="Post title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="content" 
              placeholder="Post content" 
              rows={5} 
              value={content} 
              onChange={e => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
              id="author" 
              type="text" 
              placeholder="Author name" 
              value={author} 
              onChange={e => setAuthor(e.target.value)} 
            />
          </div>
        </div>

        {/* Tag selection section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Tags</h2>
          <div className="flex flex-wrap">
            {allTags.map(tag => (
              <div
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={`cursor-pointer px-3 py-1 m-1 rounded-full text-sm font-medium ${
                  selectedTagIds.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <button 
              className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="submit"
            >
              Create Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
