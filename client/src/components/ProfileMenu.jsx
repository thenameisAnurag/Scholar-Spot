import React from 'react';

const ProfileMenu = ({ user, onLogout, onClose }) => {
  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 w-48">
      <button className="absolute top-1 right-1" onClick={onClose}>X</button>
      <div className="mb-4">
        <h2 className="text-lg font-bold">{user?.name}</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
