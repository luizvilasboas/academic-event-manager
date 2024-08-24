import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBook,
} from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const { events, listEvents } = useEvent();
  const [event, setEvent] = useState(null);
  const [associatedCourses, setAssociatedCourses] = useState([]);

  useEffect(() => {
    listEvents();
  }, [listEvents]);

  useEffect(() => {
    const selectedEvent = events.find((event) => event.id === parseInt(id));
    setEvent(selectedEvent);
  }, [events, id]);

  if (!event) {
    return <p>Carregando...</p>;
  }

  const courses = [
    {
      id: 3,
      title: "Curso de Inteligência Artificial com Python",
      description: "Explore conceitos de IA usando a linguagem Python.",
    },
    {
      id: 4,
      title: "Curso de Data Science para Iniciantes",
      description: "Entenda como aplicar ciência de dados no mundo real.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 p-10">
      <Link
        to="/events"
        className="text-blue-500 flex items-center mb-8 hover:underline text-lg"
      >
        <FaArrowLeft className="mr-2" /> Voltar para os eventos
      </Link>
      <div className="flex items-center gap-10 mb-8">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {event.name}
        </h2>
        <div className="flex justify-center">
          <Link
            to={`/events/${id}/register`}
            className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:scale-110 transform transition-transform duration-300"
          >
            Inscrever-se no Evento
          </Link>
        </div>
      </div>
      <p className="text-xl text-gray-800 mb-10 leading-relaxed">
        {event.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md">
          <FaCalendarAlt className="text-blue-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Data de Início</h4>
            <p className="text-gray-700">{event.date || "A definir"}</p>
          </div>
        </div>
        <div className="flex items-center bg-purple-100 p-6 rounded-lg shadow-md">
          <FaClock className="text-purple-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Horário</h4>
            <p className="text-gray-700">{event.time || "A definir"}</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 p-6 rounded-lg shadow-md">
          <FaMapMarkerAlt className="text-green-500 w-8 h-8 mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Local</h4>
            <p className="text-gray-700">{event.location || "A definir"}</p>
          </div>
        </div>
      </div>

      {courses.length > 0 && (
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-6">Cursos Associados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <FaBook className="w-8 h-8 text-purple-500 mr-4" />
                  <h4 className="text-xl font-semibold">{course.title}</h4>
                </div>
                <p className="text-gray-700">{course.description}</p>
                <Link
                  to={`/courses/${course.id}/register`}
                  className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-md hover:scale-105 transform transition-transform duration-300"
                >
                  Inscrever-se
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
