import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchScores = useCallback(async () => {
    if (fetched) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:8000/scores", {
        headers: getAuthHeader(),
      });
      setScores(response.data);
      setFetched(true);
    } catch (err) {
      setError("Erro ao buscar os rankings.");
    } finally {
      setLoading(false);
    }
  }, [fetched, getAuthHeader]);

  useEffect(() => {
    if (!fetched) {
      fetchScores();
    }
  }, [fetchScores, refresh]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return { scores, loading, error, triggerRefresh };
};

export default useScores;
