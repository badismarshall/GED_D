'use server'

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";

type signInProps =  {
    email: string
    password: string
}

async function signOut() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()
    if (error) console.error('Logout failed:', error);
}

async function login(formData : signInProps) {
    const supabase = createClient()

    const data =  { 
        email : formData.email as string,
        password :  formData.password as string}  

    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error) {
        return true
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export { signOut, login}