import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const usersResponse = await fetch(
          "http://localhost:5000/api/users/all"
        );
        const usersData = await usersResponse.json();
        setUsers(usersData);
        // console.log(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch("http://localhost:5000/api");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        // console.log(data);
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to get the author's name
  const getAuthorName = (authorId) => {
    const user = users.find((user) => user.id === authorId);
    return user ? user.name : "Unknown Author";
  };

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

 // Function to get 5 random blogs
 const getRandomBlogs = (blogs, count) => {
  // Shuffle blogs array
  const shuffled = [...blogs].sort(() => Math.random() - 0.5);
  // Return the first `count` blogs
  return shuffled.slice(0, count);
};

const randomBlogs = getRandomBlogs(blogs, 5);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 mx-5">
      <div className=" h-56 bg-sky-200 rounded-xl gap-8 flex flex-col justify-center content-center">
        <h1 className="text-4xl text-center font-bold mb-4">Blogs</h1>
        <p className="text-xl text-center px-32">
          Stay informed with our latest scholarship blogs, offering insights
          into funding opportunities, application tips, and success stories. Our
          expert content helps you navigate the scholarship landscape with ease
          and confidence
        </p>
      </div>
      <Link
        to="/blogs/add"
        className="inline-flex m-4 items-center bg-yellow-200 space-x-2 text-blue-600 hover:underline px-4 py-2 rounded"
      >
        <span>Add Blog</span>
        <MdPostAdd size={20} />
      </Link>
      <div className="flex gap-10">
        <div className="blogs w-7/12">
          <h1 className="text-center text-3xl font-semibold py-4">All Blogs </h1>

          {sortedBlogs.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            <div className="grid gap-4">
              {sortedBlogs.map((blog) => (
                <div key={blog.id} className="border p-4 rounded shadow">
                  {blog.image_url && (
                    <img
                      src={`http://localhost:5000/${blog.image_url}`}
                      alt={blog.title}
                      className="mt-2 w-full h-48 object-contain"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-gray-500 text-sm">
                    Author: {getAuthorName(blog.user_id)}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Published on: {formatDate(blog.created_at)}
                  </p>
                  <Link to={`/blogs/${blog.id}`}>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="recentBlogs w-5/12">
          <h1 className="text-center text-3xl font-semibold py-4">Popular Blogs</h1>
          {randomBlogs.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            <div className="grid gap-4">
              {randomBlogs.map((blog) => (
                <div key={blog.id} className="border p-4 rounded shadow">
                  {blog.image_url && (
                    <img
                      src={`http://localhost:5000/${blog.image_url}`}
                      alt={blog.title}
                      className="mt-2 w-full h-48 object-contain rounded-md"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-gray-500 text-sm">
                    Author: {getAuthorName(blog.user_id)}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Published on: {formatDate(blog.created_at)}
                  </p>
                  <Link to={`/blogs/${blog.id}`}>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
