import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date: string;
}

export const useGuestbookActions = () => {
  const [newEntry, setNewEntry] = useState({ message: "" });
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const fetchMessages = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set header if token exists

      const response = await axios.get("/api/guestbook",{headers});
      if (response.data && Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        console.error("Expected array in response, got:", typeof response.data);
        setMessages([]);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load messages. Please try again later.");
      setMessages([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewEntry({ ...newEntry, message: e.target.value });
  };

  const handleAddMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!newEntry.message.trim()) {
      setError("Please enter a message");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/guestbook", {
        message: newEntry.message,
      });

      if (response.data && response.data.success) {
        console.log("Message added successfully:", response.data);
        setNewEntry({ message: "" });
        fetchMessages();
      } else {
        const errorMessage =
          response.data?.message || "Failed to add message. Please try again.";
        setError(errorMessage);
      }
    } catch (err: any) {
      console.error("Error submitting message:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    error,
    handleAddMessage,
    handleInputChange,
    isLoading,
    newEntry,
    fetchMessages,
  };
};
