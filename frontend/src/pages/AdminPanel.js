import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const AdminPanel = () => {
  const {
    getUsers,
    getCourses,
    getEvents,
    getRegistrations,
    deleteUser,
    deleteCourse,
    deleteEvent,
    addCourse,
    addEvent,
  } = useAdmin();

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    eventId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getUsers();
      const fetchedCourses = await getCourses();
      const fetchedEvents = await getEvents();
      const fetchedRegistrations = await getRegistrations();
      setUsers(fetchedUsers);
      setCourses(fetchedCourses);
      setEvents(fetchedEvents);
      setRegistrations(fetchedRegistrations);
    };
    fetchData();
  }, [getUsers, getCourses, getEvents, getRegistrations, setRegistrations]);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    addEvent(newEvent);
    setNewEvent({ title: "", description: "", date: "", time: "" });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    addCourse(newCourse);
    setNewCourse({
      title: "",
      description: "",
      eventId: "",
      date: "",
      time: "",
    });
  };

  const renderUsersTable = () => (
    <div className="mt-8">
      <h3 className="text-3xl font-semibold mb-6 flex items-center">
        <FaUsers className="mr-3 text-blue-500" /> Gerenciar Usuários
      </h3>
      {users.length > 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-8">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                  Nome
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 flex gap-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-3xl font-semibold mb-6 flex items-center">
            <FaUsers className="mr-3 text-blue-500" /> Curso atrelado a cada usuário
          </h3>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                  Usuário
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                  Cursos Associados
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">
                    {user.courses && user.courses.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-800">
                        {user.courses.map((course) => (
                          <li key={course.id}>{course.title}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">
                        Nenhum curso associado
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-gray-700">Nenhum usuário cadastrado.</p>
      )}
    </div>
  );

  const renderCoursesTable = () => (
    <div className="mt-8">
      <h3 className="text-3xl font-semibold mb-6 flex items-center">
        <FaBook className="mr-3 text-purple-500" /> Gerenciar Cursos
      </h3>
      {courses.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-lg font-semibold text-gray-700">
                Curso
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
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="py-3 px-6">{course.title}</td>
                <td className="py-3 px-6">{course.description}</td>
                <td className="py-3 px-6 flex gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
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
        <p className="text-gray-700">Nenhum curso cadastrado.</p>
      )}
    </div>
  );

  const renderEventsTable = () => (
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
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="py-3 px-6">{event.title}</td>
                <td className="py-3 px-6">{event.description}</td>
                <td className="py-3 px-6 flex gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
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

  return (
    <div className="max-w-7xl mx-auto mt-16 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-12">
        <div>
          <h3 className="text-3xl font-semibold mb-6">Cadastrar Novo Evento</h3>
          <form
            onSubmit={handleEventSubmit}
            className="p-8 rounded-xl shadow-xl border-gray-100 border-2"
          >
            <div className="mb-6">
              <label className="block text-lg font-semibold">
                Título do Evento
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
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
                <label className="block text-lg font-semibold">Data</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6 w-1/2">
                <label className="block text-lg font-semibold">Horário</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
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
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-6">Cadastrar Novo Curso</h3>
          <form
            onSubmit={handleCourseSubmit}
            className="p-8 rounded-xl shadow-xl border-gray-100 border-2"
          >
            <div className="mb-6">
              <label className="block text-lg font-semibold">
                Título do Curso
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
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
              <label className="block text-lg font-semibold">
                Evento Associado
              </label>
              <select
                value={newCourse.eventId}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, eventId: e.target.value })
                }
                className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione o Evento</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-6">
              <div className="mb-6 w-1/2">
                <label className="block text-lg font-semibold">Data</label>
                <input
                  type="date"
                  value={newCourse.date}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, date: e.target.value })
                  }
                  className="w-full p-3 border border-purple-300 rounded-lg mt-2 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6 w-1/2">
                <label className="block text-lg font-semibold">Horário</label>
                <input
                  type="time"
                  value={newCourse.time}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, time: e.target.value })
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
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 p-10 shadow-2xl rounded-xl border-gray-100 border-2">
        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-8 py-3 text-lg font-bold rounded-full shadow-lg transform transition-transform duration-300 ${
              activeTab === "users"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
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

        {activeTab === "users" && renderUsersTable()}
        {activeTab === "courses" && renderCoursesTable()}
        {activeTab === "events" && renderEventsTable()}
      </div>
    </div>
  );
};

export default AdminPanel;
