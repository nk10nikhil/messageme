'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/compat/router"
import { signUpSchema } from "@/schemas/signupSchema";
import axios, {AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse";
import { set } from "mongoose";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";


const page = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedUsername = useDebounceCallback(setUsername, 300)
  const { toast } = useToast()

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-unique-username?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error){
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username')
          // setUsernameMessage('Error checking username')
        } finally {
          setIsCheckingUsername(false)
        }

      }
    }
    checkUsernameUnique()

  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast({
        title: 'Success',
        description: response.data.message,
      })
        if (router) {
          router.replace(`/verify/${username}`)
        }
        setIsSubmitting(false)
    } catch (error) {
      console.error("Error signing up", error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message ?? 'Error signing up'
      toast({
        title: 'Success Error/Failure',
        description: errorMessage,
        variant: 'destructive',
      })
      setIsSubmitting(false)
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
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      debouncedUsername(e.target.value)
                    }}
                  />
                </FormControl>
                {isCheckingUsername && <Loader className="h-4 w-4 animate-spin" />}
                <p className={`text-sm ${usernameMessage === 'Username already exists' ? 'text-red-600' : 'text-green-600'}`}>
                    {usernameMessage}
                </p>
                <FormDescription>This is your public display name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input type="email" placeholder="email" {...field} />
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
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait...
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