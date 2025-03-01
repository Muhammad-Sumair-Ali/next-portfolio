import NextAuth, { Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { database } from "@/lib/mongodbClient"; // Import database connection
import connectDB from "@/db";

interface AdditionalUserData {
  username?: string;
  profileUrl?: string;
  providerId?: string | number;
  bio?: string;
  location?: string;
  locale?: string;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "user:email read:user" },
      },
    }),
  ],
  callbacks: {
    async signIn(params: { user: User, account: Account | null, profile?: Profile }) {
      const { user, account, profile } = params;
      if (!account || !profile) return false;
      
      await connectDB();
      const db = await database;
      const usersCollection = db.collection("users");
      
      let additionalData: AdditionalUserData = {};
      
      if (account.provider === "google") {
        // Use non-null assertion and handle nullable values
        const googleProfile = profile as any;
        additionalData = {
          // Convert null to undefined with the nullish coalescing operator
          username: googleProfile.given_name ?? user.name ?? undefined,
          profileUrl: googleProfile.picture ?? user.image ?? undefined,
          providerId: googleProfile.sub ?? "",
          locale: googleProfile.locale ?? "",
        };
      }
      
      if (account.provider === "github") {
        const githubData = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        }).then((res) => res.json());
        
        additionalData = {
          username: githubData.login ?? undefined,
          profileUrl: githubData.avatar_url ?? undefined,
          providerId: githubData.id,
          bio: githubData.bio || "No bio available",
          location: githubData.location || "Unknown",
        };
      }
      
      const existingUser = await usersCollection.findOne({ email: user.email });
      
      if (!existingUser) {
        await usersCollection.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          providerId: additionalData.providerId,
          username: additionalData.username,
          profileUrl: additionalData.profileUrl,
          bio: additionalData.bio || "",
          location: additionalData.location || "",
          locale: additionalData.locale || "",
          createdAt: new Date(),
        });
      }
      
      return true;
    },
    async session({ session }: { session: any }) {
      await connectDB();
      const db = await database;
      const usersCollection = db.collection("users");
      
      const dbUser = await usersCollection.findOne({ email: session.user.email });
      
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.username = dbUser.username;
        session.user.profileUrl = dbUser.profileUrl;
        session.user.bio = dbUser.bio;
        session.user.location = dbUser.location;
      }
      
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);