import { createClient } from "../supabase/client";
import { useUpload } from "@supabase-cache-helpers/storage-react-query";


export async function useUploadEmployeeFile(file: File, employeeRegistrationNumber?: string) {
    const supabase = createClient()
    const { mutateAsync: upload, error } = useUpload(
        supabase.storage.from('employeefiles'),
        { buildFileName: () => `private/${employeeRegistrationNumber}/${Date.now()}_${file.name}` }
    )
    return { upload, error }
}