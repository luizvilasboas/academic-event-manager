import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const getAuthHeader = useCallback(() => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const listCourses = useCallback(async () => {
    if (fetched) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/course/list", {
        headers: getAuthHeader(),
      });
      setCourses(response.data);
      setError(null);
      setFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetched, getAuthHeader]);

  const getCourse = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/course/${id}`, {
          headers: getAuthHeader(),
        });
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [getAuthHeader]
  );

  useEffect(() => {
    if (!fetched) {
      listCourses();
    }
  }, [listCourses, refresh]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return {
    courses,
    course,
    loading,
    error,
    getCourse,
    triggerRefresh,
  };
};

export default useCourses;
