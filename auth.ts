import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { database } from "@/lib/mongodbClient"; // Import database connection

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const db = await database;
      const usersCollection = db.collection("users");

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        // Save new user manually
        await usersCollection.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account?.provider ?? "unknown", // e.g., "google" or "github"
          createdAt: new Date(),
        });
      }

      return true; // Allow sign-in
    },
  },
});
