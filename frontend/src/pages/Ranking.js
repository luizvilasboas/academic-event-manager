import React from "react";
import { FaMedal, FaUserCircle } from "react-icons/fa";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import useScores from "../hooks/useScores";

const getMedalColor = (rank) => {
  switch (rank) {
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-yellow-700";
    default:
      return "text-blue-500";
  }
};

const Ranking = () => {
  const { scores, loading, error } = useScores();
  const {
    currentPage,
    currentItems: currentRankings,
    totalPages,
    paginate,
  } = usePagination(scores, 5);

  if (loading) {
    return <p className="text-center text-blue-600">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Ranking de Usuários
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentRankings.map((scores, index) => (
          <div
            key={scores.id}
            className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              {index + 1 <= 3 && currentPage === 1 ? (
                <FaMedal className={`w-12 h-12 ${getMedalColor(index + 1)}`} />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {scores.name}
              </h3>
              <p className="text-white mt-2">Score: {scores.points}</p>
              <p className="text-white mt-2">Rank: {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default Ranking;
