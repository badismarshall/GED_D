import { Separator } from '@/components/ui/separator'
import React from 'react'

const DeleteMessage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Supprimer</h3>
        <p className="text-sm text-muted-foreground">
          Supprimer un Documents (Message, Arreter, ...).
        </p>
      </div>
      <Separator />
    </div>
  )
}

export default DeleteMessage