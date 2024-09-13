import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <Link to="/blogs/add"><button>Add Blog</button></Link>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              {blog.image_url && (
                <img
                  src={`http://localhost:5000/${blog.image_url}`}
                  alt={blog.title}
                  className="mt-2 w-full h-48 object-cover"
                />
              )}
              <p className="text-gray-500 text-sm">Author ID: {blog.user_id}</p>
              <Link to={`/blogs/${blog.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
