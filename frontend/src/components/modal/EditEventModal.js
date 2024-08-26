import React from "react";
import Modal from "../Modal";

const EditEventModal = ({
  isOpen,
  editingEvent,
  setEditingEvent,
  handleEventUpdate,
  closeModal,
}) => (
  <Modal isOpen={isOpen} onClose={closeModal}>
    <h3 className="text-3xl font-semibold mb-6 text-center">Editar Evento</h3>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Nome:</label>
      <input
        type="text"
        value={editingEvent?.name}
        onChange={(e) =>
          setEditingEvent({ ...editingEvent, name: e.target.value })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <div className="mb-6">
      <label className="block text-lg font-semibold">Descrição:</label>
      <input
        type="text"
        value={editingEvent?.description}
        onChange={(e) =>
          setEditingEvent({
            ...editingEvent,
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
        value={editingEvent?.start_time}
        onChange={(e) =>
          setEditingEvent({
            ...editingEvent,
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
        value={editingEvent?.end_time}
        onChange={(e) =>
          setEditingEvent({
            ...editingEvent,
            end_time: e.target.value,
          })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
      />
    </div>
    <button
      onClick={handleEventUpdate}
      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg hover:scale-105 transform transition-transform duration-300"
    >
      Salvar Alterações
    </button>
  </Modal>
);

export default EditEventModal;
