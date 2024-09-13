import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Auth from "./components/Auth";
import AddBlog from "./components/AddBlog";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";
import { useSelector } from "react-redux";
import Footer from './components/Footer';
import Chatbot from "./components/ChatBot";

const App = () => {
  // Accessing the Redux state to check if the user is logged in
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  console.log("isLoggedIn:", isLoggedIn); // Debugging to see the current login state

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/blogs/add"
          element={isLoggedIn ? <AddBlog /> : <Auth />}
        />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/blogs/edit/:id" element={ isLoggedIn ? <EditBlog />:<Auth></Auth>} />

        {/* Protected route: Only accessible when logged in */}
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/myBlogs"
          element={isLoggedIn ? <UserBlogs /> : <Auth />}
        />
        {/* Protected route: Only accessible when logged in */}
        <Route
          path="/myBlogs/:id"
          element={isLoggedIn ? <BlogDetail /> : <Auth />}
        />
        {/* Protected route: Only accessible when logged in */}
      </Routes>
      {
        isLoggedIn ? <Chatbot></Chatbot> : ""
      }
      <Footer></Footer>
    </Router>
  );
};

export default App;
