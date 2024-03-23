import Navigatedocument from '@/components/shared/Navigatedocument'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const NavigateMessage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Rechercher</h3>
        <p className="text-sm text-muted-foreground">
          Rechercher des Documents avec des parameters.
        </p>
      </div>
      <Separator />
      <Navigatedocument/>
    </div>
  )
}

export default NavigateMessage