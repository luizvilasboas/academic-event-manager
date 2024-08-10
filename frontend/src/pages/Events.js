import React from "react";
import Pagination from "../components/Pagination";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import usePagination from "../hooks/usePagination";

const events = [
  {
    id: 1,
    name: "Seminário de Algoritmos",
    description: "Um seminário sobre as últimas novidades em algoritmos.",
    date: "2024-08-15",
  },
  {
    id: 2,
    name: "Workshop de Matemática Discreta",
    description:
      "Um workshop para aprofundar o conhecimento em matemática discreta.",
    date: "2024-09-10",
  },
  {
    id: 3,
    name: "Conferência de Sistemas Operacionais",
    description: "Uma conferência sobre sistemas operacionais modernos.",
    date: "2024-10-05",
  },
  {
    id: 4,
    name: "Simpósio de Bancos de Dados",
    description: "Um simpósio sobre os avanços em bancos de dados.",
    date: "2024-11-20",
  },
  {
    id: 5,
    name: "Webinar de Redes de Computadores",
    description:
      "Um webinar sobre as novas tendências em redes de computadores.",
    date: "2024-12-02",
  },
];

const Events = () => {
  const eventsPerPage = 3;

  const {
    currentPage,
    currentItems: currentEvents,
    totalPages,
    paginate,
  } = usePagination(events, eventsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Eventos Disponíveis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
              <FaInfoCircle className="mr-2" />
              {event.name}
            </h3>
            <p className="text-white mb-4">{event.description}</p>
            <p className="text-lg font-bold text-white flex items-center">
              <FaCalendarAlt className="mr-2" />
              Data: <span className="ml-2">{event.date}</span>
            </p>
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

export default Events;
