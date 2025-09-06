"use client";

import React, { useEffect } from "react";
import Heading from "@/components/reuseable/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { LoginDialog } from "@/components/LoginDialog";
import { useGuestbookActions } from "@/hooks/useGuestbook";



const GuestBook: React.FC = () => {
  const { data: session } = useSession();

  const {
    messages,
    error,
    handleAddMessage,
    handleInputChange,
    isLoading,
    fetchMessages,
    newEntry,
  } = useGuestbookActions();
  
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Heading
        title="GuestBook"
        description="Welcome to my Guestbook! We value your thoughts and feedback. Please share your message or ideas. Let us keep this space positive and respectful. Your voice matters so drop a message and connect!"
      />

      <div className="max-w-[1010px] min-h-screen mx-auto relative">
        <div className="absolute bottom-96 left-28 transform -translate-x-1/2 h-[550px] w-[410px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-orange-500 blur-3xl opacity-15 -z-10"></div>
        {/* Leave a message form */}
        <div className="w-full md:w-[560px] p-4 text-white max-w-4xl m-auto my-4">
          <div>
            {session ? (
              <form onSubmit={handleAddMessage} className="space-y-4">
                <div className="flex flex-row gap-4">
                  <Avatar className="border border-zinc-500">
                    <AvatarImage src={session.user?.image || ""} alt="user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Textarea
                    className="border text-zinc-900 dark:text-zinc-200 font-semibold border-zinc-400 py-2 px-4 min-h-24 dark:border-zinc-700 rounded-xl text-[16px] md:text-xl"
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
                  <Button
                    onClick={() => signOut()}
                    size="lg"
                    className="bg-black text-white hover:bg-zinc-900 border"
                    type="button"
                  >
                    Logout
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="bg-zinc-200 ring-1 dark:ring-0 ring-slate-400 dark:bg-white text-zinc-900 font-semibold hover:bg-zinc-300"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <LoginDialog isDialog={true} />
                <p className="text-zinc-800 dark:text-zinc-200 text-lg">
                  Login to leave a message
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-11/12 max-w-[570px]  m-auto text-black dark:text-white">
          {/* Messages cards */}
          {messages.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 my-8">
              No messages yet. Be the first to leave a message!
            </p>
          ) : (
            messages.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 dark:bg-zinc-950 shadow-md hover:bg-white/80 dark:hover:bg-black shadow-zinc-300 dark:shadow-zinc-950 bg-white px-8 py-4 border rounded-lg"
              >
                <div className="flex items-center py-2 justify-between space-x-2 mb-2">
                  <div className="flex items-center gap-2 -mt-2">
                    <Avatar>
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-auto  -my-1 text-zinc-700 dark:text-zinc-400 text-[14px]">
                      <h3 className="font-semibold text-[15px]">
                        {entry.name}
                      </h3>
                      {entry.date}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-800 text-[15px] pl-12 dark:text-gray-200">
                  {entry.message}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default GuestBook;
