import React from "react";

const CourseForm = ({
  newCourse,
  setNewCourse,
  handleCourseSubmit,
  events,
}) => (
  <form
    onSubmit={handleCourseSubmit}
    className="p-8 rounded-xl shadow-xl border-gray-100 border-2 !mt-6"
  >
    <div className="mb-6">
      <label className="block text-lg font-semibold">Título do Curso</label>
      <input
        type="text"
        value={newCourse.title}
        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        placeholder="Título do Curso"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Descrição</label>
      <input
        type="text"
        value={newCourse.description}
        onChange={(e) =>
          setNewCourse({ ...newCourse, description: e.target.value })
        }
        className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        placeholder="Descrição do Curso"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Evento Associado</label>
      <select
        required
        value={newCourse.event_id}
        onChange={(e) =>
          setNewCourse({ ...newCourse, event_id: e.target.value })
        }
        className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
      >
        <option disabled>Selecione o Evento</option>
        {events.map((event, index) => (
          <option key={index} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex gap-6">
      <div className="mb-6 w-1/2">
        <label className="block text-lg font-semibold">Data de início</label>
        <input
          type="datetime-local"
          value={newCourse.start_time}
          onChange={(e) =>
            setNewCourse({ ...newCourse, start_time: e.target.value })
          }
          className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6 w-1/2">
        <label className="block text-lg font-semibold">Data de termino</label>
        <input
          type="datetime-local"
          value={newCourse.end_time}
          onChange={(e) =>
            setNewCourse({ ...newCourse, end_time: e.target.value })
          }
          className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white p-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg"
    >
      Cadastrar Curso
    </button>
  </form>
);

export default CourseForm;
