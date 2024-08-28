import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      const config = {
        headers: getAuthHeader(),
      };

      const { data: userData } = await axios.get(
        "http://localhost:8000/user/me",
        config
      );

      setUser(userData);

      const { data: coursesData } = await axios.get(
        "http://localhost:8000/user/courses",
        config
      );
      const { data: eventsData } = await axios.get(
        "http://localhost:8000/user/events",
        config
      );

      setCourses(coursesData);
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar as informações do usuário.");
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const updateUser = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: getAuthHeader(),
      };

      const response = await axios.patch(
        `http://localhost:8000/user/${updatedData.id}`,
        updatedData,
        config
      );

      if (response.status === 200) {
        setUser(response.data);
        setRefresh((prev) => !prev);
        return { status: true, text: "Perfil atualizado com sucesso." };
      }
    } catch (err) {
      setError("Erro ao atualizar as informações do usuário.");
      return {
        status: false,
        text: "Erro ao atualizar as informações do usuário.",
      };
    } finally {
      setLoading(false);
    }
  };

  const registerCourse = useCallback(
    async (courseId) => {
      setLoading(true);
      try {
        await axios.post(
          `http://localhost:8000/course/${courseId}/register`,
          {},
          {
            headers: getAuthHeader(),
          }
        );
        setError(null);
        setRefresh((prev) => !prev);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          // Captura a mensagem específica do backend
          setError(err.response.data.message);
        } else {
          setError("Erro ao registrar no curso.");
        }
        throw err; // Propaga o erro para ser tratado no componente
      } finally {
        setLoading(false);
      }
    },
    [getAuthHeader]
  );

  const unregisterCourse = useCallback(
    async (courseId) => {
      setLoading(true);
      try {
        await axios.delete(
          `http://localhost:8000/course/${courseId}/unregister`,
          {
            headers: getAuthHeader(),
          }
        );
        setError(null);
        setRefresh((prev) => !prev);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Erro ao desregistrar do curso.");
        }
      } finally {
        setLoading(false);
      }
    },
    [getAuthHeader]
  );

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, refresh]);

  return {
    user,
    courses,
    events,
    loading,
    error,
    updateUser,
    registerCourse,
    unregisterCourse,
  };
};

export default useUser;
