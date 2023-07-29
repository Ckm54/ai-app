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
import { signupFormSchema } from "./constants";

interface SignupFormProps {
  toggleForm: () => void;
}

const SignupForm = ({ toggleForm }: SignupFormProps) => {
  const [messages, setMessages] = React.useState([]);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    // todo: handle form submit
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
            name="email"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">
                  Email address:
                </FormLabel>
                <FormControl className="m-0 p-0">
                  <Input
                    className="p-4"
                    disabled={isLoading}
                    placeholder="Example@email.com"
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
          <FormField
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">
                  Confirm password:
                </FormLabel>
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
            Signup
          </Button>
        </form>
      </Form>
      <p className="text-center py-2">
        Already a member?{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={toggleForm}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
