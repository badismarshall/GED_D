'use client'

import React, { useState } from 'react'
import { Separator } from '../ui/separator'
import { PaginationState } from '@tanstack/react-table'
import { EmployeeDocumentsTablecolumns } from '@/types/personaldocumentClolumnTypes'
import { DataTable } from '../table/data-tables'
import FileUploader from './FileUploader'
import { Upload } from 'lucide-react'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

// import  uploadEmployeeFile  from '@/lib/supabase/api'
import { UploadEmployeeFilesValidation } from '@/lib/validation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from "@/components/ui/use-toast"
import { getDocumentsByEmployee } from '@/lib/supabase/api'
import { uploadEmployeeFile } from '@/lib/supabase/api'
import Loader from './Loader'


function EmployeDetailsProfileDocuments(
    { employeeRegistrationNumber, documents } : { employeeRegistrationNumber?: string, documents?: any[] }) 
  {
    console.log('documents: ', documents) 
    const form = useForm<z.infer<typeof UploadEmployeeFilesValidation>>({
      resolver: zodResolver(UploadEmployeeFilesValidation),
      defaultValues: {
        file: [],
      },
    })
      const [file, setFile] = useState<File[]>([]);
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
        
      async function onSubmit(values: z.infer<typeof UploadEmployeeFilesValidation>) {
        // I don't Know why this is not working when using the api function (server action) 
        setIsLoading(true)
        try {
          const supabase = createClient()
          const { data, error } = await supabase.storage
              .from('employeefiles')
              .upload(`private/${employeeRegistrationNumber}/${Date.now()}_${values.file[0].name}`, values.file[0], {
                      cacheControl: '3600',
                      upsert: false
              })

          // I will test the apiClient why it is not working
          // const { data, error } = await uploadEmployeeFile(values.file[0], employeeRegistrationNumber)

          if (error) {
              console.log('Error uploading file in api: ')
              toast({
                title: "échec du téléchargement",
                variant: "destructive",
              })
              return error
          }
        } catch (error) {
          toast({
            title: "échec du téléchargement",
            variant: "destructive",
          })
          console.log("Error uploading file: ", error)
        }
        toast({
          title: "Téléchargement réussi",
        })
        setIsLoading(false)
      }

    return (
      <div className='flex flex-col justify-center'>
          <h3 className="text-lg font-medium my-2">Ajouter Documents personnelles</h3>
          <Separator className='mb-3'/>
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("grid gap-6")}
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='py-5' disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
              Télécharger
            <div className='m-3 '>
              <Upload className="h-8 w-8 p-2 opacity-100 rounded-full bg-green-500"/>
            </div>
          </Button>
        </form>
      </Form>
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