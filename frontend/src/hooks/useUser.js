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

  const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
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
    };

    fetchUserInfo();
  }, []);

  return {
    user,
    courses,
    events,
    loading,
    error,
  };
};

export default useUser;
