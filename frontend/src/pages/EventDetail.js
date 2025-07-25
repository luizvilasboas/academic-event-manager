import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import { FaCalendarAlt, FaClock, FaBook } from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const { event, getEvent } = useEvent();

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id, getEvent]);

  return (
    <div className="max-w-6xl mx-auto mt-16 p-10">
      {event && (
        <>
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
            {event.name}
          </h2>
          <p className="text-xl text-gray-800 mb-10 leading-relaxed">
            {event.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md">
              <FaCalendarAlt className="text-blue-500 w-8 h-8 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Data de Início</h4>
                <p className="text-gray-700">
                  {event.start_time || "A definir"}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-purple-100 p-6 rounded-lg shadow-md">
              <FaClock className="text-purple-500 w-8 h-8 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Data de término</h4>
                <p className="text-gray-700">{event.end_time || "A definir"}</p>
              </div>
            </div>
          </div>

          {event.courses.length > 0 && (
            <div className="mt-12">
              <h3 className="text-3xl font-semibold mb-6">Cursos Associados</h3>
              <div className="flex gap-8">
                {event.courses.map((course, index) => (
                  <Link
                    to={`/courses/${course.id}`}
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <FaBook className="w-8 h-8 text-purple-500 mr-4" />
                      <h4 className="text-xl font-semibold">{course.title}</h4>
                    </div>
                    <p className="text-gray-700">{course.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetail;
