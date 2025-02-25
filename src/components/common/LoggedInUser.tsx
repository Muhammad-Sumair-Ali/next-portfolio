
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoggedInUser() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex items-center space-x-4 z-50 my-36">
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  ) : (
    <div className="px-4 flex flex-col gap-4 my-28">
    <button onClick={() => signIn("google")}>Sign in with Google</button>
    <button onClick={() => signIn("github")}>Sign in with Github</button>
    </div>
  );
}
