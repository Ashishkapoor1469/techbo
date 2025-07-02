import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";

// Define the structure of credentials
// interface Credentials {
//   identifier: string;
//   password: string;
// }

// Define the structure of the user returned from DB
interface CustomUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages?: boolean;
}

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "Enter your email or username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<CustomUser | null> {
        if (!credentials) throw new Error("Missing credentials");

        await dbconnect();

        try {
          const user = (await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          })) as CustomUser | null;

          if (!user) throw new Error("No user found");

          if (!user.isVerified)
            throw new Error("Please verify your account before login");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) throw new Error("Incorrect password");

          return user;
        } catch (error) {
          // Forward only the message if it's an Error instance
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Something went wrong");
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        const u = user as CustomUser;
        token._id = u._id;
        token.isVerified = u.isVerified;
        token.isAcceptingMessages = u.isAcceptingMessages;
        token.username = u.username;
      }
      return token;
    },
  },
};
