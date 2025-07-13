"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiRespones";
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

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernamemessage, setUsernamemessage] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
    

      setLoadingUsername(true);
      setUsernamemessage("");

      try {
        const response = await axios.get(
          `/api/checkusername-unique?username=${username}`
        );
        setUsernamemessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernamemessage(
          axiosError.response?.data.message ||
            "Something went wrong. Try again."
        );
      } finally {
        setLoadingUsername(false);
      }
    };

   checkUsernameUnique();
  }, [username]);

  // Form Submit
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up",data);
   ///////////////////////
      console.log(response);
   ///////////////////////
      toast({
        title: "Success",
        description:
          "Account created successfully. Please check your email to verify your account.",
      });

      router.replace(`/verify/${username}`);
      setIsSubmitting(false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Something went wrong, please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="mt-2 text-sm text-gray-600">
          Signup to get started with your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. Rohan, Rahul"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                </FormControl>
                {loadingUsername && (
                  <Loader2 className="animate-spin w-3 h-3 text-gray-500" />
                )}
                <p
                  className={`text-xs ${
                    usernamemessage.toLowerCase().includes("available") ||
                    usernamemessage.toLowerCase().includes("unique")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {usernamemessage}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. Kapoorashish3254@gmail.com"
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
        <p className="inline">Already have an account?</p>{" "}
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Page;
