import React from "react";

const EventForm = ({ newEvent, setNewEvent, handleEventSubmit }) => (
  <form
    onSubmit={handleEventSubmit}
    className="p-8 rounded-xl shadow-xl border-gray-100 border-2 !mt-6"
  >
    <div className="mb-6">
      <label className="block text-lg font-semibold">Título do Evento</label>
      <input
        type="text"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        placeholder="Título do Evento"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold ">Descrição</label>
      <input
        type="text"
        value={newEvent.description}
        onChange={(e) =>
          setNewEvent({ ...newEvent, description: e.target.value })
        }
        className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        placeholder="Descrição do Evento"
      />
    </div>
    <div className="flex gap-6">
      <div className="mb-6 w-1/2">
        <label className="block text-lg font-semibold">Data de início</label>
        <input
          type="datetime-local"
          value={newEvent.start_time}
          onChange={(e) =>
            setNewEvent({ ...newEvent, start_time: e.target.value })
          }
          className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6 w-1/2">
        <label className="block text-lg font-semibold">Data de termino</label>
        <input
          type="datetime-local"
          value={newEvent.end_time}
          onChange={(e) =>
            setNewEvent({ ...newEvent, end_time: e.target.value })
          }
          className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white p-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg"
    >
      Cadastrar Evento
    </button>
  </form>
);

export default EventForm;
