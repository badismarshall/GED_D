'use server'

import { createClient } from "@/lib/supabase/server"
import { INewEmploye } from "@/types/typesParam"


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

// export async function getAllFilesInFolder(bucketName: string, folderPath: string) {
//     try {
//         const supabase = createClient()
//         let { data, error } = await supabase
//             .schema('storage')
//             .from('objects')
//             .select('*')
//             .eq('bucket_id', bucketName)
//             .like('name', `${folderPath}/%`)

//         return  { data, error }

//     } catch (error) {
//         console.log(error)
//         return { error }
//     }
   
// }

//  we use supabase functions to acces the storage.objects table
export async function getAllFilesInFolderFunc(bucketName: string, folderPath: string) {
    try {
        const supabase = createClient()
        let { data, error } = await supabase
            .rpc('getfilesbuckts', 
                { 
                    bucket_name: bucketName, 
                    folder_path: folderPath 
                }
            )
        return { data, error }
    } catch (error) {
        console.log(error)
    }
    
    
}

// export async function countFilesInFolder(bucketName: string, folderPath: string) {
//     try {
//         const supabase = createClient()
//         let { data, count, error } = await supabase
//             .schema('storage')
//             .from('objects')
//             .select('id', { count: 'exact', head: true }) // we don't need to get all the data
//             .eq('bucket_id', bucketName)
//             .like('name', `${folderPath}/%`)

//         return { data, count, error }

//     } catch (error) {
//         console.log(error)
//     }
// }

//  we use supabase functions to acces the storage.objects table
export async function countFilesInFloderFunc(bucket_name: string, folder_path: string) {
    try {
        const supabase = createClient()
        let { data, error } = await supabase
            .rpc('countfilesbuckts', 
                { 
                    bucket_name, 
                    folder_path 
                }
            )
        return { data, error }
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

export async function addEmployee(employee: INewEmploye) {
    try {
        const supabase = createClient()
        const { error } = await supabase
        .from('employee')
        .insert(
            {
                firstname: employee.firstname,
                lastname: employee.lastname,
                registrationnumber: employee.registrationNumber,
                phonenumber: employee.phoneNumber,
                dateofbridth: employee.dateOfBridth,
                address: employee.address,
                personalId: employee.personalId,
                healthInsurancenumber: employee.healthInsuranceNumber,
                sex: employee.sex,
                portrait: employee.portrait[0],
                job: employee.job,
                blood: employee.blood,
                province: employee.province,
                rank_id: employee.rank,
            }
        )

        if (error) {
            throw new Error('Error adding Employee')
        }

        return error
    } catch (error) {
        console.log(error)
    }
}


export async function getAllProvinces() {
    try {
        const supabase = createClient()
        let { data: provinces, error } = await supabase
            .from('province')
            .select('*')

        if(!provinces) {
            throw new Error('No province found')
        }

        return { provinces, error }
    } catch (error) {
        console.log(error)
        return { error }
    }
}


export async function getAllBloods() {
    try {
        const supabase = createClient()
        let {data: bloods, error } = await supabase
            .from('blood')
            .select('*')

        if(!bloods) {
            throw new Error('No blood found')
        }

        return { bloods, error }
    }
    catch(error) {
        console.log(error)
        return { error }
    }
}

export async function getAllRanks() {
    try {
        const supabase = createClient()
        let { data: ranks, error } = await supabase
            .from('rank')
            .select('*')

        if(!ranks) {
            throw new Error('No rank found')
        }

        return { ranks, error }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export async function getAllJobs() {
    try {
        const supabase = createClient()
        let { data: jobs, error } = await supabase
            .from('job')
            .select('*')

        if(!jobs) {
            throw new Error('No job found')
        }

        return { jobs, error }
    } catch (error) {
        console.log(error)
        return { error }
    }
}