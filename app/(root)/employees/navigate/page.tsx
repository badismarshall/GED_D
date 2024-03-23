import Navigateemploye from '@/components/shared/Navigateemploye'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const NavigateEmploye = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Rechercher</h3>
        <p className="text-sm text-muted-foreground">
            Rechercher des employés avec des parameters.
        </p>
      </div>
      <Separator />
      <Navigateemploye/>
    </div>
  )
}

export default NavigateEmploye