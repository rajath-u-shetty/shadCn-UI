"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import GoogleSignIn from "../GoogleSignIn"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast, useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email: z.string().min(1, "Email is Required").email(),
    password: z.string().min(1, "Password is Required").min(8, "Password must have 8 characters"),
  })

const SignInForm = () => {
    const router = useRouter();
    toast({
      title: "Error",
      description: "something went wrong",
      variant: "destructive",
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        const signInData = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (signInData?.error) {
          console.log(signInData.error);
        }else{
          router.refresh()
          router.push("/admin")
        }

        if(signInData?.error){
          toast({
            title: "Error",
            description: "Ohaa something lag"
          })
        }
    }

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
        </div>
        <Button className="w-full mt-6" type="submit">Sign In</Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignIn >Sign In With Google</GoogleSignIn>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp; 
        <Link className="text-blue-500 hover:underline" href="/sign-up">Sign Up</Link>
      </p>
    </Form>
    </div>
  )
}

export default SignInForm
