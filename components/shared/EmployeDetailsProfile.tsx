import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeDetailsProfileGeneral from './EmployeDetailsProfileGeneral'
import EmployeDetailsProfileDocuments from './EmployeDetailsProfileDocuments'
import Loader from './Loader'
import { countFilesInFolder, getAllFilesInFolder, getDocumentsByEmployee } from '@/lib/supabase/api'
import { countFilesInBucket } from '@/lib/supabase/functionsapi'

async function EmployeDetailsProfile ({ employee }:{ employee?: any[] }) {
  /*
    accept the data from parameters 
  */
    // const documents = await getDocumentsByEmployee(employee?.at(0).registrationnumber)
    // console.log('documents: ', documents)
    
    // getAllFilesInFolder represent getDocumentsByEmployee
    const { data, error } = await getAllFilesInFolder('employeefiles', `private/${employee?.at(0).registrationnumber}`)
    console.log('documents: ', data)

    if(error) return (
      <div className='flex-center w-full h-full'>
          <Loader/>
      </div>
    )
   
    const numberOfDocuments = await countFilesInFolder('employeefiles', `private/${employee?.at(0).registrationnumber}`)
    console.log('number of documents: ', numberOfDocuments?.count)


    
  return (
      <Tabs defaultValue="general" className="w-full">
          <TabsList className='w-full flex justify-start gap-4'>
            <TabsTrigger value="general">Générale</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className='my-2 px-3'>
            <TabsContent value="general">
              <EmployeDetailsProfileGeneral
                employee={employee}
              /> 
            </TabsContent>
            <TabsContent value="documents">
              <EmployeDetailsProfileDocuments
                // pass the registration number and the documents files
                employeeRegistrationNumber= { employee?.at(0).registrationnumber }
                documents={data}
              />
            </TabsContent>
            <TabsContent value="settings">
              Change your settings here.
            </TabsContent>
          </div>
      </Tabs>
  )
}

export default EmployeDetailsProfile