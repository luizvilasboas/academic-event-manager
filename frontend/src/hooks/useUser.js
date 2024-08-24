import { useState, useCallback } from "react";

// Simulação de dados para cursos e eventos do usuário
const mockUser = {
  name: "João Silva",
  email: "joao.silva@example.com",
};

const mockCourses = [
  {
    id: 1,
    title: "Introdução à Programação",
    description: "Aprenda os conceitos básicos de programação.",
  },
  {
    id: 2,
    title: "Algoritmos Avançados",
    description: "Um curso para desenvolver habilidades em algoritmos e estruturas de dados.",
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Semana da Tecnologia",
    description: "Um evento com palestras e workshops sobre tecnologia.",
  },
  {
    id: 2,
    title: "Hackathon 2024",
    description: "Participe do maior hackathon da região.",
  },
];

const useUser = () => {
  const [user, setUser] = useState(mockUser);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  const listUserCourses = useCallback(async () => {
    // Aqui você poderia fazer uma chamada para uma API para buscar os cursos do usuário
    // const response = await api.get('/user/courses');
    // setCourses(response.data);
    setCourses(mockCourses); // Usando mock para simular a resposta da API
    return mockCourses;
  }, []);

  const listUserEvents = useCallback(async () => {
    // Aqui você poderia fazer uma chamada para uma API para buscar os eventos do usuário
    // const response = await api.get('/user/events');
    // setEvents(response.data);
    setEvents(mockEvents); // Usando mock para simular a resposta da API
    return mockEvents;
  }, []);

  return {
    user,
    listUserCourses,
    listUserEvents,
  };
};

export default useUser;
