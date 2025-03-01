"use client";

import { JSX, useEffect, useState } from "react";
import {
  Code,
  Code2,
  Command,
  Github,
  Globe,
  LinkedinIcon,
  LogIn,
  LogOut,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoginDialog } from "../LoginDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


import { useSession, signOut } from "next-auth/react";

// Define command groups with items in an object listing
interface CommandItem {
  label: string;
  icon: JSX.Element;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandMenu() {


  // logOut issue  hai 
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  // Handle keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    console.log("session" ,session)
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  const socialLinks = {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    website: "https://yourwebsite.com",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const commandGroups: { heading: string; commands: CommandItem[] }[] = [
    {
      heading: "Source",
      commands: [
        {
          label: "Copy URL",
          icon: <Code2 className="mr-2 h-4 w-4" />,
          shortcut: "⌘C",
          onSelect: () => copyToClipboard(window.location.href),
        },
        {
          label: "Source Code",
          icon: <Code className="mr-2 h-4 w-4" />,
          shortcut: "⌘G",
          onSelect: () => copyToClipboard(window.location.href),
        },
      ],
    },
    {
      heading: "Links",
      commands: [
        {
          label: "GitHub",
          icon: <Github className="mr-2 h-4 w-4" />,
          onSelect: () => window.open(socialLinks.github, "_blank"),
        },
        {
          label: "Twitter",
          icon: <Twitter className="mr-2 h-4 w-4" />,
          onSelect: () => window.open(socialLinks.twitter, "_blank"),
        },
        {
          label: "LinkedIn",
          icon: <LinkedinIcon className="mr-2 h-4 w-4" />,
          onSelect: () => window.open(socialLinks.linkedin, "_blank"),
        },
        {
          label: "Website",
          icon: <Globe className="mr-2 h-4 w-4" />,
          onSelect: () => window.open(socialLinks.website, "_blank"),
        },
      ],
    },
  ];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <Command className="h-5 w-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className=" text-zinc-800 dark:text-zinc-200"
        />
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <CommandList className="bg-white dark:bg-black/80 text-gray-900 dark:text-zinc-200">
          <CommandEmpty>No results found.</CommandEmpty>
          <div>
            <CommandGroup
              className="dark:text-zinc-200 border-b text-zinc-900"
              heading={"Account"}
            >
              {session?.user && (
                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt="User Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium dark:text-zinc-200 text-zinc-800">
                    {session.user.name}
                  </span>
                </div>
              )}

              {session ? (
                // <CommandItem onClick={() => signOut()} className="mt-1">
                <CommandItem onSelect={() => signOut()} className="mt-1">
                  <LogOut className=" h-4 w-4" />
                  <span>Log out</span>
                </CommandItem>
              ) : (
                <CommandItem>
                  <LogIn className=" h-4 w-4" />
                  <LoginDialog isDialog={false} />
                </CommandItem>
              )}
            </CommandGroup>
          </div>
          {commandGroups.map((group) => (
            <div key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.commands.map((command) => (
                  <CommandItem
                    className="dark:text-zinc-200 text-zinc-900"
                    key={command.label}
                    onSelect={command.onSelect}
                  >
                    {command.icon}
                    <span>{command.label}</span>
                    {command.shortcut && (
                      <CommandShortcut>{command.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
