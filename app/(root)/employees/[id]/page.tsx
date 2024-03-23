import EmployeDetailsCard from '@/components/shared/EmployeDetailsCard'
import EmployeDetailsProfile from '@/components/shared/EmployeDetailsProfile'
import { Separator } from '@/components/ui/separator'
import { EmployeParam } from '@/types/typesParam'
import React from 'react'


const EmployeDetails = ({params : {id}} : EmployeParam) => {
  /*
      we need to fetch Employe data and pass them to 
      EmployeDetailsCard and EmployeDetailsCard components
      Note: we dont pass the id we pass all data
  */
  return (
    <div className="space-y-3">
    <div>
      <h3 className="text-lg font-medium">Detail d'Employé</h3>
    </div>
    <Separator />
    <div className='flex gap-6 w-full'>
        <EmployeDetailsCard 
            id ={id} /* Don't pass the id */
        />
        <EmployeDetailsProfile/> {/* we need to pass the data not the id */}
    </div>
  </div>
  )
}

export default EmployeDetails