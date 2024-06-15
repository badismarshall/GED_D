'use server'

import { createClient } from "@/lib/supabase/server"
import { tr } from "date-fns/locale"

export async function uploadEmployeeFile(file: File) {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.storage.from('employeefiles').upload(`public/${Date.now()}_${file.name}`, file, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) {
            console.log('Error uploading file in api: ')
            return error
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getEmployeeById(id: string) {
    try {
        const supabase = createClient()
        let { data: employee, error } = await supabase
            .from('employee')
            .select(`
                *, 
                rank:rank_id (lib_fr), 
                job:job(lib_fr), 
                blood:blood(lib_fr), 
                province:province(name)
                `)
            .eq('id', id)
            
        if(!employee) {
            throw new Error('Employee not found')
        }

        return employee
    } catch (error) {
        console.log(error)
    }
}

export async function getDocumentsByEmployee(employeeRegistrationNumber? : string) {
    try {
        const supabase = createClient()
        let {data: documents, error} = await supabase
        .storage
        .from('employeefiles')
        .list(`private/${employeeRegistrationNumber}`,{
            limit: 100, // for the moment we will assume that the user will not have more than 100 files
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })

        if(!documents) {
            throw new Error('No documents found')
        }
        return documents

    } catch (error) {
        console.log(error)
    }

}

export async function getAllFilesInFolder(bucketName: string, folderPath: string) {
    try {
        const supabase = createClient()
        let { data, error } = await supabase
            .schema('storage')
            .from('objects')
            .select('*')
            .eq('bucket_id', bucketName)
            .like('name', `${folderPath}/%`)

            if(!data) {
                throw new Error('Folder not found')
            }

        return  { data, error }

    } catch (error) {
        console.log(error)
        return { error }
    }
   
}

export async function countFilesInFolder(bucketName: string, folderPath: string) {
    try {
        const supabase = createClient()
        let { data, count, error } = await supabase
            .schema('storage')
            .from('objects')
            .select('id', { count: 'exact', head: true }) // we don't need to get all the data
            .eq('bucket_id', bucketName)
            .like('name', `${folderPath}/%`)

        return { data, count, error }

    } catch (error) {
        console.log(error)
    }
}


export async function downloadFileOfEmployee(filepath: string) {
    try {
        const supabase = createClient()
        const { data } = await supabase
        .storage
        .from('employeefiles')
        .getPublicUrl(filepath)

        if(!data) {
            throw new Error('File not found')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFileOfEmployee(filepath: string) {
    try {
        const supabase = createClient()
        const { data, error } = await supabase
        .storage
        .from('employeefiles')
        .remove([filepath])

        if(error) {
            throw new Error('Error deleting file')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}