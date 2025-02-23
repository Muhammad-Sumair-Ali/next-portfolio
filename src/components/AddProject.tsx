"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await axios.post("/api/projects", formData);
      alert("Project added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" />
      <input type="file" onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setImage(e.target.files[0]);
        }
      }} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Project</button>
    </form>
  );
}
