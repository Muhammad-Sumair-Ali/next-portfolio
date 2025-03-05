"use client";
import { useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const useApiHelper = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }, []); 
};

export { api, useApiHelper };
