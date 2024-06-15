import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import Image from 'next/image'
  
function EmployeDetailsCard ({ 
        firstname, lastname, rank, phonenumber, registrationnumber, province, job}: 
        { 
            firstname: string, 
            lastname: string, 
            rank: string, 
            phonenumber: string, 
            registrationnumber: string, 
            province: string,
            job: string
        }) {
    return (
        <div className='min-w-[250px] max-lg:hidden block'>
            <Card className='w-full px-4'>
                <CardHeader className='flex items-center flex-col '>
                        <div className='w-[100px] h-[100px] rounded-full'>
                            <Image
                                priority={false}
                                src="/assets/images/OussamaIA.webp"
                                alt="employe"
                                width={100}
                                height={100}
                                className='rounded-full'
                            />
                        </div>
                        <div className='text-lg font-medium'>
                            {firstname} {lastname}
                        </div>
                    <CardDescription>
                        {rank}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col items-start gap-2'>
                        <div className='flex gap-2 justify-center items-center'>
                            <Image
                                src="/assets/icons/phoneicon.png"
                                alt="phone"
                                width={20}
                                height={20}
                            />
                            <h2>
                                {phonenumber}
                            </h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src="/assets/icons/registrationnumbericon.png"
                                alt="registrationnumber"
                                width={20}
                                height={20}
                                className='opacity-50'
                            />
                            <h2>
                                {registrationnumber}
                            </h2>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src="/assets/icons/provinceicon.png"
                                alt="province"
                                width={20}
                                height={20}
                                className='opacity-40' 
                            />
                            <h2>
                                {province}
                            </h2>
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-sm text-muted-foreground'>
                            Fonction
                        </h2>
                        <h2>{job}</h2>
                    </div>  
                </CardFooter>
            </Card>

        </div>
    )
}

export default EmployeDetailsCard