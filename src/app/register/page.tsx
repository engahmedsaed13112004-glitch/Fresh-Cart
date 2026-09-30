"use client";

import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Toaster } from "../../../@/components/ui/Toaster";
import {
  Field,
  FieldError,
  FieldLabel,
} from "../../../@/components/ui/field"

import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { registerSchema } from '../../Schema/register.schema';

export default function Register() {
  const Router = useRouter()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  })

  async function handleRegister(values: FieldValues) { 
    fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
      console.log(res);
     
    if (!res?.ok) {
      Toaster.add({
        title: "account is created successfly",
        type: "Success" 
      });
    } else {
      Toaster.add({
        title: "Logged in successfully",
        type: "sucsess"
      });
      Router.push("/");
    }
  }





      )}

 
  return (
    <>
      <h1 className="text-3xl text-green-800 text-center my-2"> Register Now! </h1>
      
      <form onSubmit={handleSubmit(handleRegister)} className='w-3/4 mx-auto'>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password Confirmation</FieldLabel>
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

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="tel"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' className="bg-green-600 text-white">Submit</Button>
      </form>
    </>
  )
}