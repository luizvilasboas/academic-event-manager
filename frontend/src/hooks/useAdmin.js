import { useState, useCallback } from "react";

// Mock de dados
const mockUsers = [
  { id: 1, name: "João Silva", email: "joao.silva@example.com" },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@example.com" },
];

const mockCourses = [
  { id: 1, title: "Curso de React", description: "Aprenda React do zero", eventId: 1, date: "2024-08-30", time: "14:00" },
  { id: 2, title: "Curso de Node.js", description: "Desenvolvimento backend com Node.js", eventId: 2, date: "2024-09-05", time: "10:00" },
];

const mockEvents = [
  { id: 1, title: "Hackathon 2024", description: "Participe do maior hackathon da região", date: "2024-08-25", time: "09:00" },
  { id: 2, title: "Semana da Tecnologia", description: "Palestras e workshops sobre tecnologia", date: "2024-09-10", time: "09:00" },
];

const mockRegistrations = [
  {
    studentId: 1,
    studentName: "João Silva",
    enrollments: [
      { id: 1, title: "Curso de React", type: "Curso" },
      { id: 1, title: "Hackathon 2024", type: "Evento" },
    ],
  },
  {
    studentId: 2,
    studentName: "Maria Oliveira",
    enrollments: [
      { id: 2, title: "Curso de Node.js", type: "Curso" },
      { id: 2, title: "Semana da Tecnologia", type: "Evento" },
    ],
  },
];

const useAdmin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [courses, setCourses] = useState(mockCourses);
  const [events, setEvents] = useState(mockEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);

  const getUsers = useCallback(() => users, [users]);
  const getCourses = useCallback(() => courses, [courses]);
  const getEvents = useCallback(() => events, [events]);
  const getRegistrations = useCallback(() => registrations, [registrations]);

  const deleteUser = useCallback(
    (id) => setUsers((prev) => prev.filter((user) => user.id !== id)),
    []
  );

  const deleteCourse = useCallback(
    (id) => setCourses((prev) => prev.filter((course) => course.id !== id)),
    []
  );

  const deleteEvent = useCallback(
    (id) => setEvents((prev) => prev.filter((event) => event.id !== id)),
    []
  );

  const addEvent = useCallback(
    (newEvent) => {
      const nextId = events.length ? Math.max(...events.map((event) => event.id)) + 1 : 1;
      const eventToAdd = { id: nextId, ...newEvent };
      setEvents((prev) => [...prev, eventToAdd]);
    },
    [events]
  );

  const addCourse = useCallback(
    (newCourse) => {
      const nextId = courses.length ? Math.max(...courses.map((course) => course.id)) + 1 : 1;
      const courseToAdd = { id: nextId, ...newCourse };
      setCourses((prev) => [...prev, courseToAdd]);
    },
    [courses]
  );

  const updateEvent = useCallback(
    (updatedEvent) => {
      setEvents((prev) =>
        prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
      );
    },
    []
  );

  const updateCourse = useCallback(
    (updatedCourse) => {
      setCourses((prev) =>
        prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
      );
    },
    []
  );
  

  return {
    getUsers,
    getCourses,
    getEvents,
    getRegistrations,
    deleteUser,
    deleteCourse,
    deleteEvent,
    addEvent,
    addCourse,
    updateEvent,
    updateCourse,
  };
};

export default useAdmin;
