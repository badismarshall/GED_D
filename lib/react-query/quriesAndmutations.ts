import { config } from "process";
import { createClient } from "../supabase/client";
import { useUpload } from "@supabase-cache-helpers/storage-react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { uploadEmployeeFile } from "../supabase/api";


// export async function useUploadEmployeeFile(file: File, employeeRegistrationNumber?: string) {
//     const supabase = createClient()
//     const { mutateAsync: uploadFile, error } = useUpload( 
//          supabase.storage.from('employeefiles'),
//         { buildFileName: () => `private/${employeeRegistrationNumber}/${Date.now()}_${file.name}` }
//     )
//     return { uploadFile, error }
// }

export async function useUploadEmployeeFile() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (file: File, employeeRegistrationNumber?: string) => uploadEmployeeFile(file, employeeRegistrationNumber),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
}


