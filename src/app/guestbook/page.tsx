"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Heading from "@/components/reuseable/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockEntries = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "Great website! Keep up the good work.",
    date: "2023-05-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I love the design and functionality.",
    date: "2023-05-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

interface Entry {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  avatar: string;
}

const GuestBook: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>(mockEntries);
  const [newEntry, setNewEntry] = useState<
    Omit<Entry, "id" | "date" | "avatar">
  >({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.email || !newEntry.message) {
      setError("Please fill in all fields");
      return;
    }
    if (newEntry.message.toLowerCase().includes("bad")) {
      setError("Please keep your message positive");
      return;
    }
    const entry: Entry = {
      id: entries.length + 1,
      ...newEntry,
      date: new Date().toISOString().split("T")[0],
      avatar: `/placeholder.svg?height=40&width=40&text=${newEntry.name.charAt(
        0
      )}`,
    };
    setEntries([entry, ...entries]);
    setNewEntry({ name: "", email: "", message: "" });
    setError("");
  };

  return (
    <>
      <Heading
        title="GuestBook"
        description="Taaarif Na sahi, Koi Achi Baat Tou Kehhjaa"
      />
      <div className="max-w-[1010px] mx-auto  relative">
        {/* Leave a message form  */}

        <div className="w-full md:w-[640px] p-4 text-white  max-w-4xl m-auto my-4">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="flex flex-row gap-4">
                <Avatar className="border border-zinc-500">
                  <AvatarImage src="/public/vercel.svg" alt="not found" />
                  <AvatarFallback>user</AvatarFallback>
                </Avatar>
                <Textarea
                  className="border font-semibold border-zinc-400 py-2 px-4  min-h-24  dark:border-zinc-700 rounded-xl text-xl  "
                  placeholder="Your Message"
                  name="message"
                  onChange={handleInputChange}
                  value={newEntry.message}
                />
              </div>
              {error && (
                <Alert variant="destructive" className="max-w-lg m-auto h-14">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
                  <div className="flex justify-end gap-4 font-semibold px-3">
              <Button size="lg"  className="bg-black text-white hover:bg-zinc-900 border">Logout</Button>
              <Button size="lg"  className="bg-zinc-200 ring-1 dark:ring-0 ring-slate-400 dark:bg-white text-zinc-900 font-semibold hover:bg-zinc-300">Submit</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="absolute bottom-4 right-8 transform -translate-r-1/2 h-[230px] w-[690px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-20  -z-10"></div>
        <div className="absolute top-24 left-2 transform -translate-r-1/2 h-[130px] w-[390px] bg-gradient-to-b from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-15  -z-10"></div>

        <div className="max-w-3xl m-auto text-black dark:text-white">
          {/* Messages cards  */}
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 dark:bg-zinc-950 shadow-lg hover:bg-white/80 dark:hover:bg-black shadow-zinc-300 dark:shadow-zinc-950 bg-white  px-8 py-4 border rounded-2xl"
            >
              <div className="flex items-center justify-between space-x-6 mb-2">
                <div className="flex items-center gap-x-2 ">
                  <Avatar>
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{entry.name}</h3>
                </div>
                <span className="ml-auto px-4 -mt-6 text-sm text-gray-500">
                  {entry.date}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-gray-200">{entry.message}</p>
              <div className="mt-2 flex justify-end space-x-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Dislike
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuestBook;
