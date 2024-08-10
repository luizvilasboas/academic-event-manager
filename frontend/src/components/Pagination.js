import React from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-12">
      <nav className="inline-flex items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-lg flex items-center ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
          }`}
        >
          <FaChevronLeft className="mr-2" /> Anterior
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded-lg flex items-center ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 hover:from-purple-400 hover:to-pink-400 hover:text-white"
            }`}
          >
            <FaCircle
              className={`w-2 h-2 ${
                currentPage === i + 1 ? "text-white" : "text-purple-500"
              }`}
            />
            <span className="ml-2">{i + 1}</span>
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-lg flex items-center ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
          }`}
        >
          Próximo <FaChevronRight className="ml-2" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
