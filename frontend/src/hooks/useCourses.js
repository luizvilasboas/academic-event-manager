import { useState } from 'react';
import axios from 'axios';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedCourses, setFetchedCourses] = useState(false);
  const [fetchedCourseById, setFetchedCourseById] = useState({});

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const listCourses = async () => {
    if (fetchedCourses) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/course/list', {
        headers: getAuthHeader(),
      });
      setCourses(response.data);
      setFetchedCourses(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCourse = async (id) => {
    if (fetchedCourseById[id]) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/course/${id}`, {
        headers: getAuthHeader(),
      });
      setCourse(response.data);
      setFetchedCourseById((prev) => ({ ...prev, [id]: true }));
      setError(null);
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
  };
};

export default useCourses;
