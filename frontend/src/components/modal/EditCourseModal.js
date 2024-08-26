import React from "react";
import Modal from "../Modal";

const EditCourseModal = ({
  isOpen,
  editingCourse,
  setEditingCourse,
  handleCourseUpdate,
  closeModal,
}) => (
  <Modal isOpen={isOpen} onClose={closeModal}>
    <h3 className="text-3xl font-semibold mb-6 text-center">Editar Curso</h3>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Título:</label>
      <input
        type="text"
        value={editingCourse?.title}
        onChange={(e) =>
          setEditingCourse({ ...editingCourse, title: e.target.value })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Descrição:</label>
      <input
        type="text"
        value={editingCourse?.description}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            description: e.target.value,
          })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Data de Início:</label>
      <input
        type="datetime-local"
        value={editingCourse?.start_time}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            start_time: e.target.value,
          })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Data de Término:</label>
      <input
        type="datetime-local"
        value={editingCourse?.end_time}
        onChange={(e) =>
          setEditingCourse({
            ...editingCourse,
            end_time: e.target.value,
          })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <button
      onClick={handleCourseUpdate}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:scale-105 transform transition-transform duration-300"
    >
      Salvar Alterações
    </button>
  </Modal>
);

export default EditCourseModal;
