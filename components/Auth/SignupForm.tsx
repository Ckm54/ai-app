import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { signupFormSchema } from "./constants";

interface SignupFormProps {
  toggleForm: () => void;
}

const SignupForm = ({ toggleForm }: SignupFormProps) => {
  const [error, setError] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    // todo: handle form submit
    setError(null);
    try {
      const response = await axios.post("/api/auth/signup", {
        userInfo: values,
      });

      if (response.status === 200) {
        toggleForm();
      }

      form.reset();
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(error.response.data);
        return;
      }
      console.log("Error registering", error);
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
            name="name"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="font-normal text-sm">
                  Your Name:
                </FormLabel>
                <FormControl className="m-0 p-0">
                  <Input
                    className="p-4"
                    disabled={isLoading}
                    placeholder="Jane Doe..."
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
          {error && <p className="text-red-500 text-sm py-2">{error}</p>}
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
