"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { loginFormSchema } from "./constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setError(false);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (res?.error) {
      setError(!!res.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" focus-within:shadow-sm"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">
                  Email address:
                </FormLabel>
                <FormControl className="m-0 p-0">
                  <Input
                    className="p-4"
                    type="email"
                    disabled={isLoading}
                    placeholder="User@mail.com..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">Password:</FormLabel>
                <FormControl className="m-0 p-0">
                  <Input
                    type="password"
                    className="p-4"
                    disabled={isLoading}
                    placeholder="Password...**"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <p className="text-sm text-red-500 py-1">
              Invalid username and / or password
            </p>
          )}
          <Button className="w-full my-2" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
      <p className="text-center py-2">
        Not a member?{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={toggleForm}
        >
          Create account
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
