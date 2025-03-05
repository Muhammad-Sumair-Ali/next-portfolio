
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export interface ServiceFormData {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ComponentType;
}

export const useServiceRequest = () => {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    serviceType: "",
    message: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      serviceType: "",
      message: ""
    });
  };

  const prepareFormData = (service: Service) => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        serviceType: service.title,
        message: ""
      });
    } else {
      setFormData({
        name: "",
        email: "",
        serviceType: service.title,
        message: ""
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const submitServiceRequest = async () => {
    if (!formData.name || !formData.email || !formData.serviceType || !formData.message) {
      toast.error("All fields are required");
      return false;
    }
    
    if (status !== "authenticated") {
      toast.error("You must be logged in to request a service");
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/service', formData);
      
      toast.success("Your service request has been submitted");
      resetForm();
      return true;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        toast.error(errorMessage || "Failed to submit service request");
      } else {
        toast.error("Something went wrong");
      }
      return false;
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isAuthenticated: status === "authenticated",
    handleInputChange,
    prepareFormData,
    submitServiceRequest,
    resetForm
  };
};

export default useServiceRequest;