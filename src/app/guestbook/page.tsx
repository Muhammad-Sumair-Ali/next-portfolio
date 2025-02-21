"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Heading from "@/components/reuseable/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  const [newEntry, setNewEntry] = useState<Omit<Entry, "id" | "date" | "avatar">>({
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
      avatar: `/placeholder.svg?height=40&width=40&text=${newEntry.name.charAt(0)}`,
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
        <Card className="bg-black/50 text-white shadow shadow-zinc-700 max-w-4xl m-auto my-8">
          <CardHeader>
            <h2 className="text-xl -my-2  font-bold">Leave a Message</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <Textarea
                className="border-none shadow shadow-zinc-500 "
                placeholder="Your Message"
                name="message"
                value={newEntry.message}
                onChange={handleInputChange}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
        <div className="absolute bottom-4 right-8 transform -translate-r-1/2 h-[230px] w-[690px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-20  -z-10"></div>

        <div className="max-w-2xl m-auto">
          {/* Messages cards  */}
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 bg-black/35 px-8 py-4 border rounded-xl"
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
              <p className="text-gray-200">{entry.message}</p>
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
