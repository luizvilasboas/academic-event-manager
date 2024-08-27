import React, { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import TabNavigation from "../components/TabNavigation";
import UsersTable from "../components/table/UsersTable";
import CoursesTable from "../components/table/CoursesTable";
import EventsTable from "../components/table/EventsTable";
import EventForm from "../components/form/EventForm";
import CourseForm from "../components/form/CourseForm";
import EditEventModal from "../components/modal/EditEventModal";
import EditCourseModal from "../components/modal/EditCourseModal";
import { useMessage } from "../context/MessageContext";
import Alert from "../components/Alert";

const AdminPanel = () => {
  const {
    users,
    courses,
    events,
    registrations,
    deleteCourse,
    deleteEvent,
    updateEvent,
    updateCourse,
    addEvent,
    addCourse,
  } = useAdmin();

  const { message, setMessage } = useMessage();

  const [activeTab, setActiveTab] = useState("users");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  const openEventModal = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const openCourseModal = (course) => {
    setEditingCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleEventUpdate = () => {
    updateEvent(editingEvent)
      .then(() => setMessage("success", "Evento atualizado com sucesso!"))
      .catch(() => setMessage("error", "Erro ao atualizar o evento."));
    setIsEventModalOpen(false);
  };

  const handleCourseUpdate = () => {
    updateCourse(editingCourse)
      .then(() => setMessage("success", "Curso atualizado com sucesso!"))
      .catch(() => setMessage("error", "Erro ao atualizar o curso."));
    setIsCourseModalOpen(false);
  };

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    event_id: "",
    start_time: "",
    end_time: "",
  });

  const handleEventSubmit = (e) => {
    e.preventDefault();
    addEvent(newEvent)
      .then(() => {
        setMessage("success", "Evento cadastrado com sucesso!");
        setNewEvent({
          name: "",
          description: "",
          start_time: "",
          end_time: "",
        });
      })
      .catch(() => setMessage("error", "Erro ao cadastrar o evento."));
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    addCourse(newCourse)
      .then(() => {
        setMessage("success", "Curso cadastrado com sucesso!");
        setNewCourse({
          title: "",
          description: "",
          event_id: "",
          start_time: "",
          end_time: "",
        });
      })
      .catch(() => setMessage("error", "Erro ao cadastrar o curso."));
  };

  return (
    <div>
      <div className="mb-10">
        {message.text && <Alert type={message.type} text={message.text} />}
      </div>
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-12">
          <h3 className="text-3xl font-semibold">Cadastrar Novo Evento</h3>
          <EventForm
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleEventSubmit={handleEventSubmit}
            events={events}
          />
          <h3 className="text-3xl font-semibold">Cadastrar Novo Curso</h3>
          <CourseForm
            newCourse={newCourse}
            setNewCourse={setNewCourse}
            handleCourseSubmit={handleCourseSubmit}
            events={events}
          />
        </div>
        <div className="max-w-7xl mx-auto p-10 shadow-2xl rounded-xl border-gray-100 border-2">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "users" && (
            <UsersTable users={users} registrations={registrations} />
          )}
          {activeTab === "courses" && (
            <CoursesTable
              courses={courses}
              openCourseModal={openCourseModal}
              deleteCourse={(id) =>
                deleteCourse(id)
                  .then(() =>
                    setMessage("success", "Curso deletado com sucesso!")
                  )
                  .catch(() => setMessage("error", "Erro ao deletar o curso."))
              }
            />
          )}
          {activeTab === "events" && (
            <EventsTable
              events={events}
              openEventModal={openEventModal}
              deleteEvent={(id) =>
                deleteEvent(id)
                  .then(() =>
                    setMessage("success", "Evento deletado com sucesso!")
                  )
                  .catch(() => setMessage("error", "Erro ao deletar o evento."))
              }
            />
          )}
        </div>
        {isEventModalOpen && (
          <EditEventModal
            isOpen={isEventModalOpen}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            handleEventUpdate={handleEventUpdate}
            closeModal={() => setIsEventModalOpen(false)}
          />
        )}
        {isCourseModalOpen && (
          <EditCourseModal
            isOpen={isCourseModalOpen}
            editingCourse={editingCourse}
            setEditingCourse={setEditingCourse}
            handleCourseUpdate={handleCourseUpdate}
            closeModal={() => setIsCourseModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
