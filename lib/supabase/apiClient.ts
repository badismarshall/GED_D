'use client'

import { createClient } from "@/lib/supabase/client"


export async function uploadEmployeeFile({file, employeeRegistrationNumber} : {file: File, employeeRegistrationNumber?: string}) {
    
    console.log(file, employeeRegistrationNumber)
    const supabase = createClient()
    const { data, error } = await supabase.storage.from('employeefiles').upload(`private/${employeeRegistrationNumber}/${Date.now()}_${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
    })
    
    if (error) {
        console.log('Error uploading file in api: ')
    }
    return { data, error }
}
