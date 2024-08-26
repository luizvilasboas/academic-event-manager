import React from "react";
import { FaCalendarAlt, FaEdit, FaTrashAlt } from "react-icons/fa";

const EventsTable = ({ events, openEventModal, deleteEvent }) => (
  <div className="mt-8">
    <h3 className="text-3xl font-semibold mb-6 flex items-center">
      <FaCalendarAlt className="mr-3 text-green-500" /> Gerenciar Eventos
    </h3>
    {events.length > 0 ? (
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Evento
            </th>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Descrição
            </th>
            <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-6">{event.name}</td>
              <td className="py-3 px-6">{event.description}</td>
              <td className="py-3 px-6 flex gap-4">
                <button
                  onClick={() => openEventModal(event)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-700">Nenhum evento cadastrado.</p>
    )}
  </div>
);

export default EventsTable;
