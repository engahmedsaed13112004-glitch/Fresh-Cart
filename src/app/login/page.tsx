"use client";

import { Controller, FieldValues, useForm } from 'react-hook-form';
import {
  Field,
  FieldError,
  FieldLabel,
} from "../../../@/components/ui/field";


import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { loginSchema } from '../../Schema/login.schema';
import { signIn } from "next-auth/react";
import { Button } from '../../../@/components/ui/button';
import { Input } from '../../../@/components/ui/input';


export const toast = {
  add: (options: { title?: string; type?: string }) => {
    if (options.type === "success" || options.type === "sucsess") {
      alert(`✅ ${options.title || "Success" }`);
    } else {
      alert(`❌ ${options.title || "An error occurred"}`);
    }
  }
};

export default function Login() {
  const Router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  async function handleLogin(values: FieldValues) { 
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, 
      callbackUrl: "/"
    });

    console.log(res);

    if (!res?.ok) {
      toast.add({
        title: res?.error ,
        type: "error" 
      });
    } else {
      toast.add({
        title: "Logged in successfully",
        type: "sucsess"
      });

setTimeout(() => {
   Router.push("/");
}, 2000);

     
    }
  }

  return (
    <>
      <h1 className="text-3xl text-green-800 text-center my-2"> Login Now! </h1>

      <form onSubmit={handleSubmit(handleLogin)} className='w-3/4 mx-auto'>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' className="bg-green-600 text-white mt-4">login</Button>
      </form>
    </>
  );
}