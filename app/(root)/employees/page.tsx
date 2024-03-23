import EmployeForm from '@/components/forms/EmployeForm'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const CreateEmploye = () => {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Ajouter</h3>
        <p className="text-sm text-muted-foreground">
          Ajouter un nouveau Employé.
        </p>
      </div>
      <Separator />
      <EmployeForm/>
    </div>
  )
}

export default CreateEmploye