import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import useUser from "../hooks/useUser";

const UserProfile = () => {
  const { message, setMessage } = useMessage();
  const { user, courses, events, updateUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    const result = await updateUser(formData);
    if (result.status) {
      setMessage("success", "Perfil atualizado com sucesso!");
    } else {
      setMessage("error", result.text || "Erro ao atualizar o perfil.");
    }
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mt-10">
      {message.text && <Alert type={message.type} text={message.text} />}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Perfil do Usuário
        </h2>
        <button
          onClick={openEditModal}
          className="text-blue-500 hover:underline text-lg flex items-center"
        >
          <FaEdit className="mr-2" /> Editar Perfil
        </button>
      </div>

      <div className="text-4xl font-bold mb-12 flex gap-5">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          {user?.name || formData.name || "Usuário não encontrado"}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
          {user?.email || formData.email || "Email não encontrado"}
        </span>
      </div>

      <div className="mb-12">
        <h3 className="text-3xl font-semibold mb-6">Meus Cursos</h3>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Link
                key={index}
                to={`/courses/${course.id}`}
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <FaBook className="w-8 h-8 text-white mr-4" />
                  <h4 className="text-2xl font-semibold">{course.title}</h4>
                </div>
                <p className="text-gray-100">{course.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">
            Você não está cadastrado em nenhum curso.
          </p>
        )}
      </div>

      <div className="mb-12">
        <h3 className="text-3xl font-semibold mb-6">Meus Eventos</h3>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Link
                key={index}
                to={`/events/${event.id}`}
                className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="w-8 h-8 text-white mr-4" />
                  <h4 className="text-2xl font-semibold">{event.name}</h4>
                </div>
                <p className="text-gray-100">{event.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">
            Você não está cadastrado em nenhum evento.
          </p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Editar Perfil
          </h3>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transform transition-transform duration-300"
            >
              Salvar Alterações
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
