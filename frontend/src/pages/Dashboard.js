import React from "react";
import { FaBookOpen, FaInfoCircle } from "react-icons/fa";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { courses, events } = useUser();

  return (
    <div>
      <main className="flex-grow container mx-auto p-8">
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-purple-600 mb-8">
            Todos os meus cursos
          </h3>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  to={`/courses/${course.id}`}
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl flex items-center hover:scale-105 transition-transform duration-300"
                >
                  <FaBookOpen className="text-white text-4xl mr-6" />
                  <h4 className="text-white text-2xl font-bold">
                    {course.title}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-xl">
              Nenhum curso cadastrado.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-purple-600 mb-8">
            Todos os meus eventos
          </h3>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Link
                  key={index}
                  to={`/events/${event.id}`}
                  className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 p-6 rounded-lg shadow-xl flex items-center hover:scale-105 transition-transform duration-300"
                >
                  <FaInfoCircle className="text-white text-4xl mr-6" />
                  <h4 className="text-white text-2xl font-semibold">
                    {event.name}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-xl">
              Nenhum evento cadastrado.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
