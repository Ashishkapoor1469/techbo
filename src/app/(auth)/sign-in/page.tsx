"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";

import { redirect,useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios";
import { signInSchema } from "@/schemas/signInSchema";
// import { ApiResponse } from "@/types/ApiRespones";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

const Page = () => {
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      
      identifier: "",
      password: "",
    },
  });

  
// Form Submit
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
  try {
      const result = await signIn('credentials',{
    redirect: false,
    identifier: data.identifier,
    password: data.password,
   })
   if(result?.error){
    if(result.error === "CredentialsSignin"){
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }else{
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
  }

  if(result?.url){
    router.push('/profile')
  }
toast({
  title:"Login successful",
  variant:"default"
})
  } catch (error) {
     toast({
      title:"failed login",
      description:`${error}`,
      variant:"destructive",
     })
  }
  
  
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-background border rounded-lg shadow-md mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Sign In</h2>
        <p className="mt-2 text-sm text-gray-600">
          SignIn to get started with your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
        

          {/* Email */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email/Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Please wait
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>
      </Form>

      {/* Link to Sign In */}
      <div className="text-center text-xs mt-4">
        <p className="inline">Don't have Account</p>{" "}
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
