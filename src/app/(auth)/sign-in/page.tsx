"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiRespones";
import { Form } from "@/components/ui/form";
const page = () => {
  const [username, setUsername] = useState("");
  const [usernamemessage, setUsernamemessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkusername, setCheckusername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deboucedUsername = useDebounceValue(username, 300);
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
      if (deboucedUsername) {
        setCheckusername(true);
        setUsernamemessage("");

        try {
          const responce = await axios.get(
            `/api/auth/checkusername-unique?username=${deboucedUsername}`
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
  }, [deboucedUsername]);
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

          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
