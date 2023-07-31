import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter username" })
    .email("This is not a valid email."),
  password: z.string().min(6, {
    message: "Password too short (Should be at least 6 characters long)",
  }),
});

export const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    // .refine(async (e) => {
    //   // TODO:::
    //   // Where checkIfEmailIsValid makes a request to the backend
    //   // to see if the email is valid.
    //   // return await checkIfEmailIsValid(e);
    // }, "This email is not in our database")
    password: z.string().min(6, {
      message: "Password too short (Should be at least 6 characters long)",
    }),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
