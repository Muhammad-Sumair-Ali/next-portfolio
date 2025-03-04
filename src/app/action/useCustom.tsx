"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface FetchResponse<T> {
  data: T | {} | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

export const useFetch = <T,>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("adminToken"); 

      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set header if token exists

      const response = await axios.get<T>(url, { headers });
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error fetching data";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading, refetch: fetchData };
};


export const useFetchContact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("adminToken"); 
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set header if token exists

      const response = await axios.get("/api/contact",{ headers });
      setData(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error fetching data";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, refetch: fetchData };


}