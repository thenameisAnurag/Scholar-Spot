import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/me/blogs", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user blogs");
        }

        const data = await response.json();
        setUserBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete blog');
        setUserBlogs(userBlogs.filter(blog => blog.id !== id)); // Update state
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 w-7/12 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">My Blogs</h1>
      {userBlogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="grid gap-4">
          {userBlogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              {blog.image_url && (
                <img
                  src={`http://localhost:5000/${blog.image_url}`}
                  alt={blog.title}
                  className="mt-2 w-full h-48 object-contain"
                />
              )}
              <div className="mt-2 flex gap-2">
                <Link to={`/blogs/edit/${blog.id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
