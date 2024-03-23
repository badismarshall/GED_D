import React from 'react'
import { Separator } from '../ui/separator'
import { format } from "date-fns"
import { fr } from 'date-fns/locale';
import Image from 'next/image';

const EmployeDetailsProfileGeneral = () => {
  return (
    <div className='w-full'>
        <div className='flex justify-between items-center'>
            <h3 className="text-lg font-medium my-4">Informations personnelles</h3>
            <a href='/employees/'>
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
                    <h2 className='text-sm'>BadisMarshall</h2>
                    <h2 className='text-sm'>Oussama</h2>
                    <h2 className='text-sm'>
                        {format(new Date('1998-05-14'), "dd MMMM yyyy", { locale: fr })}
                    </h2>
                    <h2 className='text-sm'>Alger</h2>
                    <h2 className='text-sm'>Alger</h2>
                    <h2 className='text-sm'>A+</h2>
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
                    <h2 className='text-sm'>Homme</h2>
                    <h2 className='text-sm'>201716001482</h2>
                    <h2 className='text-sm'>47756622852</h2>
                    <h2 className='text-sm'>0555172014</h2>
                    <h2 className='text-sm'>2554716988855</h2>
                    <h2 className='text-sm'>Colonel</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeDetailsProfileGeneral