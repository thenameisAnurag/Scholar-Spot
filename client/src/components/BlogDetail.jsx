import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`); // Ensure correct endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        console.log('Blog data:', data); // Debugging line

        // Directly set blog data since it's an object, not an array
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {blog ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          {blog.image_url && (
            <img
              src={`http://localhost:5000/${blog.image_url.replace(/\\/g, '/')}`} // Ensure correct path for images
              alt={blog.title}
              className="mt-2 w-full h-48 object-cover"
            />
          )}
          <p className="mt-4">{blog.content}</p>
          <p className="text-gray-500 text-sm">Author ID: {blog.user_id}</p>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default BlogDetail;
