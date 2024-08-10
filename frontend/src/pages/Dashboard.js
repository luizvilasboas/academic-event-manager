import React from "react";
import { FaBookOpen, FaInfoCircle } from "react-icons/fa";

const assignedCourses = [
  {
    id: 1,
    name: "Introdução a Algoritmos",
  },
  {
    id: 2,
    name: "Matemática Discreta",
  },
  {
    id: 3,
    name: "Sistemas Operacionais",
  },
];

const assignedEvents = [
  { id: 1, name: "Seminário de Algoritmos" },
  { id: 2, name: "Workshop de Matemática Discreta" },
  { id: 3, name: "Conferência de Sistemas Operacionais" },
];

const Dashboard = () => {
  return (
    <div>
      <main className="flex-grow container mt-12 mx-auto p-8">
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-purple-600 mb-8">
            Todos os meus cursos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl flex items-center hover:scale-105 transition-transform duration-300"
              >
                <FaBookOpen className="text-white text-4xl mr-6" />
                <h4 className="text-white text-2xl font-bold">{course.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-purple-600 mb-8">
            Todos os meus eventos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignedEvents.map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 p-6 rounded-lg shadow-xl flex items-center hover:scale-105 transition-transform duration-300"
              >
                <FaInfoCircle className="text-white text-4xl mr-6" />
                <h4 className="text-white text-2xl font-semibold">{course.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
