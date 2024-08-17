"use server";
import { SignUpSchema } from "@/components/Signup";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "@/components/Signin";
import { redirect } from "next/navigation";
export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        hashedPassword: hashedPassword,
        name: values.username,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: user.id };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });
  if (!user || !user.hashedPassword) {
    return { success: false, error: "Invalid Credentials!" };
  }
  const passwordMatch = await new Argon2id().verify(
    user.hashedPassword,
    values.password
  );
  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials!" };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: true, id: user.id };
};

export const logout=async(id:string )=>{
   try {
      const sessionCookie = await lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      
      const deleteSession=await prisma.session.deleteMany({
         where:{
            userId:id,
         }
      })
      redirect('/authenticate')
   } catch (error) {
   }

}