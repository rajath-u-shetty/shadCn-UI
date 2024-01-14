"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import GoogleSignIn from "../GoogleSignIn"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    username: z.string().min(1, "username is required").max(30),
    email: z.string().min(1, "Email is Required").email(),
    password: z.string()
        .min(1, "Password is Required")
        .min(8, "Password must have 8 characters"),
    confirmPassword: z.string()
        .min(1, "Password is Required")
        .min(8, "Password must have 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password Do not match'
  })

const SignUpForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username:"",
          email: "",
          password: "",
          confirmPassword: "",
        },
    })

    const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        const response = await fetch("/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          })
        })

        if (response.ok) {
            router.push("/sign-in");
          } else {
            const errorMessage = await response.text(); // Read the error message from the response
            console.error("Registration failed:", errorMessage);
          }
    }

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jhon_john" {...field} />
              </FormControl>
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
                <Input placeholder="mail123@gmail.com" {...field} />
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
                <Input placeholder="Enter Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        </div>
        <Button className="w-full mt-6" type="submit">Sign In</Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignIn>Sign Up With Google</GoogleSignIn>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp; 
        <Link className="text-blue-500 hover:underline" href="/sign-in">Sign Up</Link>
      </p>
    </Form>
    </div>
  )
}

export default SignUpForm
