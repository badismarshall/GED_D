'use server'

import { createAdminClient } from "@/lib/appwrite/api"
import { cookies } from "next/headers"

type signInProps =  {
    email: string
    password: string
}

async function signInWithEmail(formData : signInProps) {

    const { email, password}  = formData
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('session', session.secret, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    })

    return session
}

async function signOut() {
    try {
        const { account } = await createAdminClient()
        const session = account.deleteSession('current');

        return session
    } catch (error) {
        console.error('Error getting logged out user', error)
    }
}


export { signInWithEmail, signOut}