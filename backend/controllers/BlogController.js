const BlogModel = require("../models/BlogModel");

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Handle the uploaded file path
  const userId = req.session.userId;

  if (!userId || !title || !content) {
    return res
      .status(400)
      .json({ message: "User ID, title, and content are required" });
  }

  BlogModel.createBlog(userId, title, content, image, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating blog", error: err });
    }
    res
      .status(201)
      .json({ message: "Blog created successfully", blogId: results.insertId });
  });
};

// Controller function to get all blogs
const getAllBlogs = (req, res) => {
  BlogModel.getAllBlogs((err, blogs) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching blogs", error: err });
    }
    res.json(blogs);
  });
};

// Controller function to get a blog by ID
const getBlogById = (req, res) => {
  const { id } = req.params;

  BlogModel.getBlogById(id, (err, blog) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving blog", error: err });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  });
};

// Controller function to get all blogs by user ID
// BlogController.js
const getBlogsByUserId = (req, res) => {
  const userId = req.params.userId;

  BlogModel.getBlogsByUserId(userId, (err, blogs) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching blogs", error: err });
    }
    res.json(blogs);
  });
};

const getBlogsForCurrentUser = (req, res) => {
  const userId = req.session.userId; // Get the current user's ID from session

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  BlogModel.getBlogsByUserId(userId, (err, blogs) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching blogs", error: err });
    }
    res.json(blogs);
  });
};

// Controller function to update a blog by ID
const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  const userId = req.session.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  BlogModel.getBlogById(id, (err, blog) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving blog", error: err });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    console.log("Blog Data:", blog);
    console.log("Current User ID:", userId);
    console.log("Blog Author ID:", blog.user_id);

    if (blog.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the author of this blog" });
    }

    BlogModel.updateBlog(id, title, content, imageUrl, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating blog", error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog updated successfully" });
    });
  });
};

// Delete a blog
const deleteBlog = (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  BlogModel.getBlogById(id, (err, blog) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving blog", error: err });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the author of this blog" });
    }

    BlogModel.deleteBlog(id, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting blog", error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully" });
    });
  });
};

module.exports = {
  getBlogsForCurrentUser,
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  updateBlog,
  deleteBlog,
};
