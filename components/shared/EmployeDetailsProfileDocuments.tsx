'use client'

import React, {  useState } from 'react'
import { Separator } from '../ui/separator'
import { PaginationState } from '@tanstack/react-table'
import { EmployeeDocumentsTablecolumns } from '@/types/personaldocumentClolumnTypes'
import { DataTable } from '../table/data-tables'
import { Upload } from 'lucide-react'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Icons } from "@/components/ui/icons"

// import  uploadEmployeeFile  from '@/lib/supabase/api'
import { UploadEmployeeFilesValidation } from '@/lib/validation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from "@/components/ui/use-toast"
import { getDocumentsByEmployee } from '@/lib/supabase/api'
import Loader from './Loader'
import { useUploadEmployeeFile } from '@/lib/react-query/quriesAndmutations'
import EmployeeDocumentUploader from './EmployeeDocumentUploader'


 function EmployeDetailsProfileDocuments(
    { employeeRegistrationNumber, documents } : { employeeRegistrationNumber?: string, documents?: any[] }) 
  {

    const form = useForm<z.infer<typeof UploadEmployeeFilesValidation>>({
      resolver: zodResolver(UploadEmployeeFilesValidation),
      defaultValues: {
        file: [],
      },
    })
      const [files, setFiles] = useState<any[]>([])
      const [isLoading, setIsLoading] = React.useState<boolean>(false)
      const { toast } = useToast()


      //  we will use cleint side pagination (for the moment)
      // so we fech all the data and we will paginate them
      // const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
      //     pageIndex: 0,
      //     pageSize: 1, // we display 10 documents per page
      // }
      // )
      // const fetchDataOptions = {
      //     pageIndex,
      //     pageSize,
      // }

      // const pagination = useMemo(
      //     () => ({
      //       pageIndex,
      //       pageSize,
      //     }),
      //     [pageIndex, pageSize]
      //   )

        // const pages = useMemo(() => {
        //   console.log(documents?.length ? Math.ceil(documents.length / pageSize) : 0)
        //   return documents?.length ? Math.ceil(documents.length / pageSize) : 0;
        // }, [documents?.length, pageSize]);
        // const supabase = createClient()
        // const session =  await supabase.auth.getSession()
        // if (session.data.session?.access_token) {
        //   const tokenString = session.data.session.access_token.toString();
        //   setAccessToken(tokenString);
        // }

    return (
      <div className='flex flex-col justify-center'>
          <h3 className="text-lg font-medium my-2">Ajouter Documents personnelles</h3>
          <Separator className='mb-3'/>
              <EmployeeDocumentUploader 
                files={files} 
                setFiles={setFiles}
                bucketPath={`private/${employeeRegistrationNumber}`}
              />
          {/* <Button className='py-5' disabled={isLoading} >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
              Télécharger
            <div className='m-3 '>
              <Upload className="h-8 w-8 p-2 opacity-100 rounded-full bg-green-500"/>
            </div>
          </Button> */}

          <div>
              <h3 className="text-lg font-medium my-4">Documents Recents</h3>
              <Separator className='mb-3'/>
              <DataTable
                  columns={EmployeeDocumentsTablecolumns}
                  data={documents || []	}
                  // pagination={pagination}
                  // PaginationChange={setPagination}
                  // pages={pages}
          />
          </div>
      </div>
    )
}

export default EmployeDetailsProfileDocuments