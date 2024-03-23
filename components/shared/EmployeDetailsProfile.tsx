import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeDetailsProfileGeneral from './EmployeDetailsProfileGeneral'
import EmployeDetailsProfileDocuments from './EmployeDetailsProfileDocuments'

const EmployeDetailsProfile = () => {
  /*
    accept the data from parameters 
  */
  return (
      <Tabs defaultValue="general" className="w-full">
          <TabsList className='w-full flex justify-start gap-4'>
            <TabsTrigger value="general">Générale</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className='my-2 px-3'>
            <TabsContent value="general">
            {/* Pass only the data to fetch document of the id selected */}
              <EmployeDetailsProfileGeneral/> 
            </TabsContent>
            <TabsContent value="documents">
              <EmployeDetailsProfileDocuments/> {/* Pass only the ID to fetch document of the personalId selected */}
            </TabsContent>
            <TabsContent value="settings">
              Change your settings here.
            </TabsContent>
          </div>
      </Tabs>
  )
}

export default EmployeDetailsProfile