import { createClient } from "./server";

export async function countFilesInBucket({ bucketName, folderPath } : {bucketName: string, folderPath: string}) {
    
    // console.log('bucketName: ', bucketName)
    // console.log('folderPath: ', folderPath)
    const supabase = createClient()
    const { data, error } = await supabase.rpc('count_folder', {
        bucket_name: 'employeefiles',
        folder_path: 'private/201716001482',
      })
    // const { data, error } = await supabase.rpc('hello')

    if (error) {
    console.error('Error counting files:', error);
    return;
    }

    console.log('Number of files in folder', data);
    return data;
}