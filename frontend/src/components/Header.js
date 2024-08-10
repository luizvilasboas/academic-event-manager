import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaCalendarAlt,
  FaTrophy,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-white text-3xl font-extrabold tracking-wide">
              Academics
            </h1>
          </Link>
        </div>

        <nav className="flex space-x-8">
          <Link
            to="/courses"
            className="text-white hover:text-yellow-300 flex items-center"
          >
            <FaBook className="mr-2 text-yellow-300" /> Todos os cursos
          </Link>
          <Link
            to="/events"
            className="text-white hover:text-red-300 flex items-center"
          >
            <FaCalendarAlt className="mr-2 text-red-300" /> Todos os eventos
          </Link>
          <Link
            to="/ranking"
            className="text-white hover:text-green-300 flex items-center"
          >
            <FaTrophy className="mr-2 text-green-300" /> Ranking
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer text-white flex items-center space-x-2"
            >
              <FaUserCircle className="w-10 h-10" />
              <span className="hidden sm:block text-lg">Profile</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  Meu Perfil
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
