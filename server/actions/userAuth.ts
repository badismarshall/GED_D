'use server'

import { createAdminClient, createSessionClient } from "@/lib/appwrite/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

type signInProps =  {
    email: string
    password: string
}

async function signInWithEmail(formData : signInProps) {

    const { email, password }  = formData
    const { account } = await createAdminClient()

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('session', session.secret, {
        path: '/dashboard',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    })

    return session
}

async function signOut() {
    try {
        const { account } = await createSessionClient()
        cookies().delete('session')
        account.deleteSession('current');
        console.log('User logged out')
        redirect('/')
    } catch (error) {
        console.error('Error getting logged out user', error)
    }
}


export { signInWithEmail, signOut}