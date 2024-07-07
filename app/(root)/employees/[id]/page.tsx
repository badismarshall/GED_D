import EmployeDetailsCard from '@/components/shared/EmployeDetailsCard'
import EmployeDetailsProfile from '@/components/shared/EmployeDetailsProfile'
import { Separator } from '@/components/ui/separator'
import { EmployeParam } from '@/types/typesParam'
import React from 'react'
import { getEmployeeById } from '@/lib/supabase/api'
import Loader from '@/components/shared/Loader'

async function EmployeDetails ({ params : { id } } : EmployeParam) {
  /*
      we need to fetch Employe data and pass them to 
      EmployeDetailsCard and EmployeDetailsCard components
      Note: we dont pass the id we pass all data (done)
  */

    /* ------  Test List files  ------*/
          // const supabase = createClient()
          // const { data, error } = await supabase
          // .storage
          // .from('employeefiles')
          // .list('private', {
          //   limit: 100,
          //   offset: 0,
          //   // sortBy: { column: 'name', order: 'asc' },
          // }) 
          // console.log('data: ', data)
    /* ------  Test List files  ------*/

      // fetch the employee data
      const employee = await getEmployeeById(id)
      // console.log('employee detail: ', employee)

      if(!employee || employee.length == 0) return (
        <div className='flex-center w-full h-full'>
            <Loader/>
        </div>
      )

  return (
    <div className="space-y-3">
    <div>
      <h3 className="text-lg font-medium">Detail d&apos;Employé</h3>
    </div>
    <Separator />
    <div className='flex gap-6 w-full'>
        <EmployeDetailsCard 
            firstname = { employee?.at(0).firstname }
            lastname = { employee?.at(0).lastname }
            rank = { employee?.at(0).rank.lib_fr }
            phonenumber = { employee?.at(0).phonenumber }
            registrationnumber = { employee?.at(0).registrationnumber }
            province = { employee?.at(0).province.name }
            job = { employee?.at(0).job.lib_fr }
        />
        <EmployeDetailsProfile
          employee={employee}
        />
    </div>
  </div>
  )
}

export default EmployeDetails