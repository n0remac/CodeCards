import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../service'; // Update this path based on your actual file structure
import { Tag, CreateTagRequest, GetTagsRequest } from '../../rpc/proto/blog/blog_pb'; // Update these imports based on your actual file structure

export const CreateTag = () => {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/'); // Redirect to the home page if not logged in
    } else {
      fetchTags(); // Fetch tags when the component mounts and the user is logged in
    }
  }, [navigate]);

  const fetchTags = async () => {
    try {
      const request = new GetTagsRequest();
      const response = await blogService.getTags(request);
      setTags(response.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = new CreateTagRequest();
    request.name = tagName;

    try {
      await blogService.createTag(request);
      alert('Tag created successfully!');
      setTagName(''); // Clear input field
      fetchTags(); // Refresh the list of tags
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Failed to create tag.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Tag</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mb-6">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tag-name">
              Tag Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="tag-name" type="text" placeholder="Tag name" value={tagName} onChange={e => setTagName(e.target.value)} />
          </div>
          <div className="w-full px-3">
            <button className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Create Tag
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Tags</h2>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} className="mb-2">
              {tag.name} {/* Assuming Tag has a getName method */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
