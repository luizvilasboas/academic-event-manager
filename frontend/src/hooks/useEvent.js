import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useEvent = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
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
  }, [fetched, getAuthHeader]);

  const getEvent = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/event/${id}`, {
          headers: getAuthHeader(),
        });
        setEvent(response.data);
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
      listEvents();
    }
  }, [listEvents, refresh, fetched]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return {
    events,
    event,
    loading,
    error,
    getEvent,
    triggerRefresh,
  };
};

export default useEvent;
