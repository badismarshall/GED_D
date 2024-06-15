import React from 'react'
import { Separator } from '../ui/separator'
import { format } from "date-fns"
import { fr } from 'date-fns/locale';
import Image from 'next/image';

function EmployeeDetailsProfileGeneral ({ employee } : { employee?: any[] }) {
    // console.log('deff', employee)
  return (
    <div className='w-full'>
        <div className='flex justify-between items-center'>
            <h3 className="text-lg font-medium my-4">Informations personnelles</h3>
            <a href='/employeees/'>
                <Image
                    src="/assets/icons/editicon.png"
                    alt='edit'
                    width={24}
                    height={24}
                />
            </a>
        </div>
            <Separator />
        <div className='flex my-8 px-8 items-start justify-between w-full'>
            <div className='flex gap-8'>
                <div className='flex flex-col gap-5 justify-center'>
                    <h2 className='text-sm text-muted-foreground'>Nom</h2>
                    <h2 className='text-sm text-muted-foreground'>Prénom</h2>
                    <h2 className='text-sm text-muted-foreground'>Date de naissance</h2>
                    <h2 className='text-sm text-muted-foreground'>Lieu de naissance</h2>
                    <h2 className='text-sm text-muted-foreground'>Adresse</h2>
                    <h2 className='text-sm text-muted-foreground'>Groupe Sanguin</h2>
                </div>
                <div className='flex flex-col gap-5 justify-center'>
                    <h2 className='text-sm'>{employee?.at(0).lastname}</h2>
                    <h2 className='text-sm'>{employee?.at(0).firstname}</h2>
                    <h2 className='text-sm'>
                        {format(new Date(employee?.at(0).dateofbridth), "dd MMMM yyyy", { locale: fr })}
                    </h2>
                    <h2 className='text-sm'>{employee?.at(0).province.name}</h2>
                    <h2 className='text-sm'>{employee?.at(0).address}</h2>
                    <h2 className='text-sm'>{employee?.at(0).blood.lib_fr}</h2>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='flex flex-col gap-5 justify-center'>
                    <h2 className='text-sm text-muted-foreground'>Sexe</h2>
                    <h2 className='text-sm text-muted-foreground'>Matricule</h2>
                    <h2 className='text-sm text-muted-foreground'>Num d'assurence</h2>
                    <h2 className='text-sm text-muted-foreground'>Numéro de téléphone</h2>
                    <h2 className='text-sm text-muted-foreground'>Matricule Civil</h2>
                    <h2 className='text-sm text-muted-foreground'>Grade</h2>
                </div>
                <div className='flex flex-col gap-5 justify-center'>
                    <h2 className='text-sm'>
                        {
                            employee?.at(0).sex == true ? 'Homme' : 'Femme'
                        }
                    </h2>
                    <h2 className='text-sm'>{employee?.at(0).registrationnumber}</h2>
                    <h2 className='text-sm'>{employee?.at(0).healthInsurancenumber}</h2>
                    <h2 className='text-sm'>{employee?.at(0).phonenumber}</h2>
                    <h2 className='text-sm'>{employee?.at(0).personalId}</h2>
                    <h2 className='text-sm'>{employee?.at(0).rank.lib_fr}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetailsProfileGeneral