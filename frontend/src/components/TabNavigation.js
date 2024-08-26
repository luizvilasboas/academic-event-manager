import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center mb-8 space-x-4">
    <button
      className={`px-8 py-3 text-lg font-bold rounded-full shadow-lg transform transition-transform duration-300 ${
        activeTab === "users"
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          : "bg-gray-300 text-gray-800"
      }`}
      onClick={() => setActiveTab("users")}
    >
      Usuários
    </button>
    <button
      className={`px-8 py-3 text-lg font-bold rounded-full shadow-lg transform transition-transform duration-300 ${
        activeTab === "courses"
          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:scale-105"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
      }`}
      onClick={() => setActiveTab("courses")}
    >
      Cursos
    </button>
    <button
      className={`px-8 py-3 text-lg font-bold rounded-full shadow-lg transform transition-transform duration-300 ${
        activeTab === "events"
          ? "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:scale-105"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
      }`}
      onClick={() => setActiveTab("events")}
    >
      Eventos
    </button>
  </div>
);

export default TabNavigation;
