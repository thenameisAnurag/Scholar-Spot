import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import Modal from './Modal';
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to handle profile dropdown
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include", // Include cookies for session handling
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev); // Toggle the profile dropdown
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setIsProfileOpen(false); // Close the profile when logging out
  };

  return (
    <nav className=" border-y-2 px-8 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
       <img className='w-32' src={Logo} alt="" />
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-yellow-200 px-2 rounded-lg py-1">Home</Link></li>
        <li><Link to="/scholarships" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-yellow-200 px-2 rounded-lg py-1">Scholarships</Link></li>
        <li><Link to="/blogs" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-yellow-200 px-2 rounded-lg py-1">Blogs</Link></li>
        {isLoggedIn ?      <li><Link to="/myblogs" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-yellow-200 px-2 rounded-lg py-1">My Blogs</Link></li>:""}
   
        <li><Link to="/about" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-yellow-200 px-2 rounded-lg py-1">About Us</Link></li>
      </ul>
      <div className="flex space-x-2">
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle
              className="text-black text-4xl cursor-pointer"
              onClick={handleProfileClick} // Toggle profile dropdown instead of modal
            />
            {isProfileOpen && userInfo && (
              <div className="absolute top-10 right-0 bg-white shadow-lg p-4 rounded">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              className="bg-yellow-300 font-medium text-lg text-blue-600 px-4 py-1 rounded"
              onClick={() => openModal('login')}
            >
              Login
            </button>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded text-lg font-semibold border-2"
              onClick={() => openModal('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal type={modalType} onClose={() => setIsModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
