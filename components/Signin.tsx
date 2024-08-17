'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "@/app/authenticate/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignInSchema = z.object({
   email: z.string().email("This is not a valid email"),
  password: z.string().min(6),
});
const Signin = () => {
   const router=useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  });
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
   const res=await signIn(values);
   const id=res.id;
   console.log(id)
   if(res.success){
      toast.success('Logged in successfully')
      router.push(`/dashboard/${id}`)
   }
   else{
      toast.error(res.error)
   }
  }
  return (
    <Card className="w-[310px] sm:w-[500px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn@gmail.com" type="email" {...field} />
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
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Signin;
