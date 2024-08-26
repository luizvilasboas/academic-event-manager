import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const getAuthHeader = useCallback(() => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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
        "http://localhost:8000/user/me/edit",
        updatedData,
        config
      );

      if (response.status === 200) {
        setUser(response.data);
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

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return {
    user,
    courses,
    events,
    loading,
    error,
    updateUser,
  };
};

export default useUser;
