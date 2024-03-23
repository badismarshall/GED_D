import DocumentForm from '@/components/forms/DocumentForm'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const CreateMessage = () => {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Ajouter</h3>
        <p className="text-sm text-muted-foreground">
          Ajouter un nouveau Document (Message, Arreter, ...).
        </p>
      </div>
      <Separator />
      <DocumentForm />
    </div>
  )
}

export default CreateMessage