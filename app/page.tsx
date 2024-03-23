import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { UserAuthForm } from "@/components/forms/user-auth-form"
import { getLoggedInUser } from "@/lib/appwrite/api"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "DCNSI - Authentification",
  description: "Creéz un compte pour accéder à votre espace personnel.",
}

export default async function AuthenticationPage() {
  // const user = await getLoggedInUser();
  // if(user) redirect('/documents')

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            DCNSI
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "The only way to do great work is to love what you do."
              </p>
              <footer className="text-sm">Badis MarshalL</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Connectez-vous
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrer vos identifiants pour accéder à votre espace personnel.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
                En créant un compte, vous acceptez nos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions d'utilisation
              </Link>{" "}
              et{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}