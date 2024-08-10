import React from "react";
import { FaMedal, FaUserCircle } from "react-icons/fa";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

const rankings = [
  { id: 1, name: "Alice Johnson", score: 95 },
  { id: 2, name: "Bob Smith", score: 90 },
  { id: 3, name: "Charlie Davis", score: 88 },
  { id: 4, name: "Diana White", score: 85 },
  { id: 5, name: "Edward Brown", score: 83 },
  { id: 6, name: "Fiona Green", score: 82 },
  { id: 7, name: "George Black", score: 80 },
  { id: 8, name: "Hannah Blue", score: 79 },
  { id: 9, name: "Ian Yellow", score: 78 },
  { id: 10, name: "Jack Purple", score: 77 },
  { id: 11, name: "Karen Orange", score: 76 },
  { id: 12, name: "Larry Red", score: 75 },
  { id: 13, name: "Mona Pink", score: 74 },
  { id: 14, name: "Nina Gray", score: 73 },
  { id: 15, name: "Oscar Violet", score: 72 },
];

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
  const {
    currentPage,
    currentItems: currentRankings,
    totalPages,
    paginate,
  } = usePagination(rankings, 5);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Ranking de Usuários
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentRankings.map((ranking, index) => (
          <div
            key={ranking.id}
            className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              {(index + 1 <= 3) && currentPage === 1 ? (
                <FaMedal className={`w-12 h-12 ${getMedalColor(index + 1)}`} />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {ranking.name}
              </h3>
              <p className="text-white mt-2">Score: {ranking.score}</p>
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
