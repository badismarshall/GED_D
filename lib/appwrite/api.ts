'use server'

import { NextRequest } from 'next/server';
import {Client, Account} from 'node-appwrite';
import { appwriteConfig } from './config';
import { cookies } from "next/headers";


const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.url as string) // Your API Endpoint
        .setProject(appwriteConfig.projectId as string) // Your project ID
        .setKey('YOUR_API_KEY'); // Your secret API key

    return {
        get account() {
            return new Account(client)
        }
    };
}

const createSessionClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.url as string) // Your API Endpoint
    .setProject(appwriteConfig.projectId as string) // Your project ID

    // const session = request.cookies.get('session')
    const session = cookies().get('session')

    if(!session || !session.value) {
        throw new Error('No session found')
    }
    
    client.setSession(session.value)

    return {
        get account(){
            return new Account(client)
        }
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient()
        return account.get()

    } catch (error) {
        console.error('Error getting logged in user', error)
        return null
    }
}

export {createAdminClient, createSessionClient}