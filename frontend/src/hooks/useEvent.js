import { useState, useCallback } from "react";
import axios from "axios";

const useEvent = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false); // New state to track if events have been fetched

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const listEvents = useCallback(async () => {
    if (fetched) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/event/list", {
        headers: getAuthHeader(),
      });
      setEvents(response.data);
      setError(null);
      setFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetched]);

  const getEvent = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/event/${id}`, {
        headers: getAuthHeader(),
      });
      setEvent(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/event", eventData, {
        headers: getAuthHeader(),
      });
      setEvent(response.data);
      setError(null);
      await listEvents();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    event,
    loading,
    error,
    listEvents,
    getEvent,
    createEvent,
  };
};

export default useEvent;
