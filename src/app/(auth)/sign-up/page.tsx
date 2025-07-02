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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const page = () => {
  const [username, setUsername] = useState("");
  const [usernamemessage, setUsernamemessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkUsername, setCheckusername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouced = useDebounceCallback(setUsername, 900);
  const router = useRouter();
  const { toast } = useToast();
  //zod schema for form validation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkusernameunique = async () => {
      if (username) {
        setCheckusername(true);
        setUsernamemessage("");

        try {
          const responce = await axios.get(
            `/api/auth/checkusername-unique?username=${username}`
          );
          setUsernamemessage(responce.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernamemessage(
            axiosError.response?.data.message ||
              "Something went wrong, please try again later."
          );
        } finally {
          setCheckusername(false);
        }
      }
    };
    checkusernameunique();
  }, [username]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const resonce = await axios.post<ApiResponse>("/api/auth/sign-up");
      toast({
        title: "Success",
        description:
          "Account created successfully. Please check your email to verify your account.",
      });
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Something went wrong, please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-600">
            Signup to get started with your account
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          debouced(e.target.value);
                        }}
                      />
                      
                    </FormControl>
                     {checkUsername && <Loader2 className="animate-spin w-2"/>}
                     <p className={`text-[9px] ${usernamemessage === "username is unique" ?"text-green-500":"text-red-500"}`}>{usernamemessage}</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {
isSubmitting ?<><Loader2 className="h-4 w-4 animate-spin" />Please wait</>:("Signup")
                }
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs flex gap-2 mt-3 w-full justify-center">
 <p>Already a exist an account</p>
 <Link href="/sign-in" className="text-blue-600">Sign-in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
