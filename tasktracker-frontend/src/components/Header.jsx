import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center space-x-2">
          <img
            src="https://e7.pngegg.com/pngimages/398/1016/png-clipart-task-manager-task-management-action-item-tasks-together-orange-logo-thumbnail.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">Task Tracker</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/" className="hover:text-blue-200">Dashboard</Link>
          <Link to="#" className="hover:text-blue-200">About Us</Link>

          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
