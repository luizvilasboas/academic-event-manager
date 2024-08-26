import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import useEvent from "../hooks/useEvent";
import usePagination from "../hooks/usePagination";

const Events = () => {
  const { events } = useEvent();

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
        {currentEvents.map((event, index) => (
          <Link
            key={index}
            to={`/events/${event.id}`}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
              <FaInfoCircle className="mr-2" />
              {event.name}
            </h3>
            <p className="text-white mb-4">{event.description}</p>
            <p className="text-lg font-bold text-white flex items-center">
              <FaCalendarAlt className="mr-2" />
              Data: <span className="ml-2">{event.start_date}</span>
            </p>
          </Link>
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
