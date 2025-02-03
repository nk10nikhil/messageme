'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import {  useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/compat/router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";


const page = () => {

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver : zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier : data.identifier,
      password: data.password
    })

    if ( result?.error ) {
      toast({
        title: "Sign In Error",
        description: result.error,
        variant: "destructive"
      })
    }
    
    if(result?.url) {
      if (router) {
        router.replace('/dashboard')
      }
    }
  }
   
return (
  <div className="flex justify-center items-center min-h-screen bg-gray-800">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Message ME
        </h1>
        <p className="mb-4">Sign in to continue your secret communication</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                <Input type="email" placeholder="email/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full' type="submit" disabled={isSubmitting}>
            {
              isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                </>
              ) : (
                'Sign Up'
              )
            }
          </Button>

        </form>
      </Form>

      <div className="text-center mt-4">
        <p>
          Already a member?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default page;