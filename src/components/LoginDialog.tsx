"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Github } from "lucide-react";

// import { signIn, signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  // const { data: session } = useSession();
  return (
    <>
      <span onClick={() => setOpen(true)} className="w-full max-w-sm ">
        Sign In
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden">
          <div className="relative flex flex-col p-8">
            <DialogTitle className="text-zinc-800  dark:text-zinc-200">
              Login
            </DialogTitle>

            <div className="my-4 text-left text-zinc-800  dark:text-zinc-200">
              <p className="text-sm text-muted-foreground mt-1">
                Choose your sign in method
              </p>
            </div>

            <div className="grid gap-4 text-zinc-800  dark:text-zinc-200">
              <Button
                variant="outline"
                onClick={() => signIn("github")}
                className="bg-background hover:bg-accent transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>

              <Button
                variant="outline"
                className="bg-background hover:bg-accent transition-colors"
                onClick={() => signIn("google")}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
