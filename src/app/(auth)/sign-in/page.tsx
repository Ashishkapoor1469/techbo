"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import IMg from "@/photos/techbo-high-resolution-logo (1).png"
export default function Component() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-900">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl bg-white/90">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-gray-900 drop-shadow-lg text-center">
            {session ? "Welcome Back!" : "Sign In to TechBo"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-8">
            <Image
              src={IMg}
              alt="TechBo Logo"
              width={80}
              height={80}
              className="grayscale mb-4 bg-inherit rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300" 
              priority
            />
          </div>
          {session ? (
            <>
              <p className="text-lg text-gray-800 mb-4 text-center">
                Signed in as <span className="font-semibold">{session.user.email}</span>
              </p>
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-6 text-center">
                Access exclusive features by signing in.
              </p>
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                onClick={() => signIn()}
              >
                Sign in with your account
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}