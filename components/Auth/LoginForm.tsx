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

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const [messages, setMessages] = React.useState([]);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" focus-within:shadow-sm"
        >
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">Username:</FormLabel>
                <FormControl className="m-0 p-0">
                  <Input
                    className="p-4"
                    disabled={isLoading}
                    placeholder="Username..."
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
