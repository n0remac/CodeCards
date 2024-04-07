// PostComponent.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../rpc/proto/blog/blog_pb';

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
    navigate(`/post/${post.id}`); // Navigate to the full post view
  };

  return (
    <div 
      className="bg-gray-800 text-white rounded-lg p-6 m-4 w-full max-w-3xl cursor-pointer"
      onClick={handlePostClick}
    >
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-base mb-4">{formatContent(post.content.slice(0, 300))}...</p>
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
