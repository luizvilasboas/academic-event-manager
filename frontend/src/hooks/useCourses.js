import { useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const listCourses = useCallback(async () => {
    if (fetched) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/course/list', {
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
  }, [fetched]);

  const getCourse = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/courses/${id}`, {
        headers: getAuthHeader(),
      });
      setCourse(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/courses', courseData, {
        headers: getAuthHeader(),
      });
      setCourse(response.data);
      setError(null);
      await listCourses();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    course,
    loading,
    error,
    listCourses,
    getCourse,
    createCourse,
  };
};

export default useCourses;
