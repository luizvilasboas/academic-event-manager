import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const getAuthHeader = useCallback(() => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:8000/scores", {
          headers: getAuthHeader(),
        });
        setScores(response.data);
      } catch (err) {
        setError("Erro ao buscar os rankings.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [getAuthHeader]); // Agora, getAuthHeader é incluída nas dependências de useEffect.

  return { scores, loading, error };
};

export default useScores;
