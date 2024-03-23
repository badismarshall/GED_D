"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { signInWithEmail } from "@/server/actions/userAuth"
import { SigninValidation } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  function onSubmit(values: z.infer<typeof SigninValidation>) {
    
    // get form data
    
    // event.preventDefault()
    // setIsLoading(true)

    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 3000)

    // const session = await signInWithEmail({
    //   email: 'dz',
    //   password: 'password'
    // })
  }

  return (
    <>
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className="" htmlFor="email">
                Nom d'utilisateur
              </FormLabel>
              <FormControl>
                <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className="">
                Mot de passe
              </FormLabel>
              <FormControl>
                <Input
                    id="password"
                    placeholder="name@example.com"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Connexion
        </Button>
      </form>
    </Form>
       <div className="relative">
         <div className="absolute inset-0 flex items-center">
           <span className="w-full border-t" />
         </div>
       </div>
    </>
  )
}