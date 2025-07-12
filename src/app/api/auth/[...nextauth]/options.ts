import { NextAuthOptions } from "next-auth";
import Credentialsprovider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";

export const authOption: NextAuthOptions = {
  providers: [
    Credentialsprovider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
         
        },
        password: {
          label: "Password",
          type: "password",
       
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("no user found");
          }

          if (!user.isVerified) {
            throw new Error("Please verfiy your account before login");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, 
};
