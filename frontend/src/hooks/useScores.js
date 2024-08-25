import { useState, useEffect } from "react";
import axios from "axios";

const useScores = () => {
  const [scores, setScores] = useState([]);
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
    const fetchScores = async () => {
      try {
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
  }, []);

  return { scores, loading, error };
};

export default useScores;
