import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const getAuthHeader = useCallback(() => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getAuthToken]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/user/list", {
        headers: getAuthHeader(),
      });
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/course/list", {
        headers: getAuthHeader(),
      });
      setCourses(response.data);
    } catch (err) {
      setError("Erro ao buscar cursos.");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/event/list", {
        headers: getAuthHeader(),
      });
      setEvents(response.data);
    } catch (err) {
      setError("Erro ao buscar eventos.");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/registration", {
        headers: getAuthHeader(),
      });
      setRegistrations(response.data);
    } catch (err) {
      setError("Erro ao buscar inscrições.");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const deleteUser = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`, {
          headers: getAuthHeader(),
        });
      } catch (err) {
        setError("Erro ao deletar usuário.");
      }
    },
    [getAuthHeader]
  );

  const deleteCourse = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:8000/course/delete/${id}`, {
          headers: getAuthHeader(),
        });
      } catch (err) {
        setError("Erro ao deletar curso.");
      }
    },
    [getAuthHeader]
  );

  const deleteEvent = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:8000/event/delete/${id}`, {
          headers: getAuthHeader(),
        });
      } catch (err) {
        setError("Erro ao deletar evento.");
      }
    },
    [getAuthHeader]
  );

  const addEvent = useCallback(
    async (newEvent) => {
      try {
        await axios.post("http://localhost:8000/event/create", newEvent, {
          headers: getAuthHeader(),
        });
      } catch (err) {
        setError("Erro ao adicionar evento.");
      }
    },
    [getAuthHeader]
  );

  const addCourse = useCallback(
    async (newCourse) => {
      try {
        await axios.post("http://localhost:8000/course/create", newCourse, {
          headers: getAuthHeader(),
        });
      } catch (err) {
        setError("Erro ao adicionar curso.");
      }
    },
    [getAuthHeader]
  );

  const updateEvent = useCallback(
    async (updatedEvent) => {
      try {
        await axios.patch(
          `http://localhost:8000/event/update/${updatedEvent.id}`,
          updatedEvent,
          {
            headers: getAuthHeader(),
          }
        );
      } catch (err) {
        setError("Erro ao atualizar evento.");
      }
    },
    [getAuthHeader]
  );

  const updateCourse = useCallback(
    async (updatedCourse) => {
      try {
        await axios.patch(
          `http://localhost:8000/course/update/${updatedCourse.id}`,
          updatedCourse,
          {
            headers: getAuthHeader(),
          }
        );
      } catch (err) {
        setError("Erro ao atualizar curso.");
      }
    },
    [getAuthHeader]
  );

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchEvents();
    fetchRegistrations();
  }, [fetchUsers, fetchCourses, fetchEvents, fetchRegistrations]);

  return {
    users,
    courses,
    events,
    registrations,
    loading,
    error,
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
