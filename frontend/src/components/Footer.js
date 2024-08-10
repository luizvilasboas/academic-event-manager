import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-red-500 to-orange-500 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="text-3xl font-bold mb-2">Academics</h3>
          <p className="text-gray-200">Eventos e cursos acadêmicos.</p>
        </div>

        <nav className="flex space-x-6 mb-6 md:mb-0">
          <Link
            to="/courses"
            className="text-gray-100 hover:text-yellow-300"
          >
            Todos os cursos
          </Link>
          <Link to="/events" className="text-gray-100 hover:text-yellow-300">
            Todos os eventos
          </Link>
          <Link to="/ranking" className="text-gray-100 hover:text-yellow-300">
            Ranking
          </Link>
        </nav>

        <div className="text-center text-gray-300">
          &copy; {new Date().getFullYear()} Academics. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
