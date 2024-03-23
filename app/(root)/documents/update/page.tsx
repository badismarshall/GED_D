import { Separator } from '@/components/ui/separator'
import React from 'react'

const UpdateMessage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Modifer</h3>
        <p className="text-sm text-muted-foreground">
          Modifer un Documents (Message, Arreter, ...).
        </p>
      </div>
      <Separator />
    </div>
  )
}

export default UpdateMessage